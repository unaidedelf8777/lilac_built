"""Utils for signals."""

from typing import Optional, cast

from ..schema import (
    PATH_WILDCARD,
    UUID_COLUMN,
    DataType,
    Field,
    Path,
    Schema,
    column_paths_match,
    normalize_path,
)


def create_signal_schema(source_schema: Schema, signal_enrich_fields: list[Path],
                         signal_fields: dict[str, Field]) -> Schema:
  """Create a schema describing the enriched fields added by the signal."""
  signal_schema = Schema(fields={UUID_COLUMN: Field(dtype=DataType.BINARY)})
  return _add_signal_fields_to_schema(source_schema, signal_schema, signal_fields,
                                      signal_enrich_fields)


def _add_signal_fields_to_schema(source_schema: Schema, signal_schema: Schema,
                                 signal_fields: dict[str,
                                                     Field], enrich_fields: list[Path]) -> Schema:
  enrich_fields = [normalize_path(field) for field in enrich_fields]
  source_leafs = source_schema.leafs
  # Validate that the enrich fields are actually a valid leaf path.
  for signal_enrich_field in enrich_fields:
    if signal_enrich_field not in source_leafs:
      raise ValueError(f'Field for enrichment {signal_enrich_field} is not a valid leaf path. '
                       f'Leaf paths: {source_leafs.keys()}')

  for leaf_path, _ in source_leafs.items():
    field_is_enriched = False
    for signal_enrich_field in enrich_fields:
      if column_paths_match(signal_enrich_field, leaf_path):
        field_is_enriched = True
    if not field_is_enriched:
      continue

    # Find the inner most repeated subpath as we will put the signal schema next to its parent.
    inner_struct_path_idx = len(leaf_path) - 1
    for i, path_part in reversed(list(enumerate(leaf_path))):
      if path_part == PATH_WILDCARD:
        inner_struct_path_idx = i - 1
      else:
        break

    repeated_depth = len(leaf_path) - 1 - inner_struct_path_idx

    inner_field = Field(fields=signal_fields, enriched=True)

    # Wrap in a list to mirror the input structure.
    for i in range(repeated_depth):
      inner_field = Field(repeated_field=inner_field, enriched=True)

    signal_path: Path = leaf_path[0:inner_struct_path_idx + 1]

    # Merge the source schema into the signal schema up until inner struct parent.
    for i in reversed(range(inner_struct_path_idx + 1)):
      path_component = cast(str, signal_path[i])

      if path_component == PATH_WILDCARD:
        inner_field = Field(repeated_field=inner_field)
      else:
        field = get_field_if_exists(signal_schema, signal_path[0:i])
        if field and field.fields:
          field.fields[path_component] = inner_field
          break
        else:
          inner_field = Field(fields={path_component: inner_field})

  return signal_schema


def get_field_if_exists(schema: Schema, path: Path) -> Optional[Field]:
  """Return a field from a path if it exists in the schema."""
  # Wrap in a field for convenience.
  field = cast(Field, schema)
  for path_part in path:
    if isinstance(path_part, int) or path_part == PATH_WILDCARD:
      if not field.repeated_field:
        return None
      field = field.repeated_field
    elif isinstance(path_part, str):
      if not field.fields:
        return None
      if path_part not in cast(dict, field.fields):
        return None
      field = field.fields[path_part]
  return field
