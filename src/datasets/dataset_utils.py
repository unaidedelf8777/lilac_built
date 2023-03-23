"""Utilities for working with datasets."""

from typing import Iterable, Optional, Sequence, Union

from ..schema import (
    PATH_WILDCARD,
    UUID_COLUMN,
    Item,
    Path,
    normalize_path,
)


def replace_repeated_wildcards(path: Path, path_repeated_idxs: Optional[list[int]]) -> Path:
  """Replace the repeated wildcards in a path with the repeated indexes."""
  if path_repeated_idxs is None:
    # No repeated indexes, so just return the path.
    return path

  replaced_path: list[Union[str, int]] = []
  path_repeated_idx_i = 0
  for path_part in path:
    # Replace wildcards with the actual index.
    if path_part == PATH_WILDCARD:
      replaced_path.append(path_repeated_idxs[path_repeated_idx_i])
      path_repeated_idx_i += 1
    else:
      replaced_path.append(path_part)

  return tuple(replaced_path)


def make_enriched_items(source_path: Path, row_ids: Sequence[bytes],
                        signal_items: Iterable[Optional[Item]],
                        repeated_idxs: Iterable[Optional[list[int]]]) -> Iterable[Item]:
  """Make enriched items from signal outputs.

  NOTE: The iterables that are passed in are not 1:1 with row_ids. The logic of this method will
  merge the same UUIDs as long as they are contiguous.
  """
  working_enriched_signal_item: Item = {}
  num_signal_outputs = 0
  signal_outputs_per_key = 0

  last_row_id: Optional[bytes] = None

  for row_id, signal_output, path_repeated_idxs in zip(row_ids, signal_items, repeated_idxs):
    num_signal_outputs += 1

    # Duckdb currently just returns a single int as that's all we support. The rest of the code
    # supports arrays, so we make it an array for the future when duckdb gives us a list of indices.
    if isinstance(path_repeated_idxs, int):
      path_repeated_idxs = [path_repeated_idxs]

    if last_row_id is None:
      last_row_id = row_id
      working_enriched_signal_item = {UUID_COLUMN: row_id}

    # When we're at a new row_id, yield the last working item.
    if last_row_id != row_id:
      if signal_outputs_per_key > 0:
        yield working_enriched_signal_item
      last_row_id = row_id
      working_enriched_signal_item = {UUID_COLUMN: row_id}
      signal_outputs_per_key = 0

    if not signal_output:
      continue

    # Tracking signal outputs per key allows us to know if we have a sparse signal so it will not be
    # yielded at all.
    signal_outputs_per_key += 1

    # Apply the list of path indices to the path to replace wildcards.
    resolved_path = replace_repeated_wildcards(path=source_path,
                                               path_repeated_idxs=path_repeated_idxs)

    # Now that we have resolves indices, we can modify the enriched item.
    enrich_item_from_signal_item(enriched_item=working_enriched_signal_item,
                                 path=resolved_path,
                                 signal_item=signal_output)

  if num_signal_outputs != len(row_ids):
    raise ValueError('The signal output and the input data do not have the same length. '
                     'This means the signal either didnt generate a "None" for a sparse signal, '
                     'or generated too many items.')

  if signal_outputs_per_key > 0:
    yield working_enriched_signal_item


def enrich_item_from_signal_item(enriched_item: Item, path: Path, signal_item: Item) -> None:
  """Create an enriched item that holds the output of a signal."""
  path = normalize_path(path)

  signal_subitem = enriched_item
  for i in range(len(path) - 1):
    path_component = path[i]
    next_path_component = path[i + 1]
    if isinstance(path_component, str):
      if path_component not in signal_subitem:
        if isinstance(next_path_component, str):
          signal_subitem[path_component] = {}
        else:
          # This needs to be filled to the length of the index. Since this is the first time we've
          # seen path_component, we can fill it exactly to the index we're going to inject.
          signal_subitem[path_component] = [None] * (next_path_component + 1)
      else:
        if isinstance(next_path_component, int):
          # We may need to extend the length so we can write the new index.
          cur_len = len(signal_subitem[path_component])  # type: ignore
          if cur_len <= next_path_component:
            signal_subitem[path_component].extend(  # type: ignore
                [None] * (next_path_component - cur_len + 1))
    elif isinstance(path_component, int):
      # The nested list of nones above will fill in integer indices.
      if isinstance(next_path_component, str):
        signal_subitem[path_component] = {}  # type: ignore
      elif isinstance(next_path_component, int):
        signal_subitem[path_component] = []  # type: ignore
    else:
      raise ValueError(f'Unknown type {type(path_component)} in path {path}.')
    signal_subitem = signal_subitem[path_component]  # type: ignore

  signal_subitem[path[-1]] = signal_item  # type: ignore
