"""The DuckDB implementation of the dataset database."""
import functools
import glob
import math
import os
import pathlib
import re
import shutil
import threading
from typing import Any, Iterable, Iterator, Optional, Sequence, Type, Union, cast

import duckdb
import numpy as np
import pandas as pd
from pandas.api.types import is_object_dtype
from pydantic import BaseModel, validator
from typing_extensions import override

from ..auth import UserInfo
from ..concepts.concept import ConceptColumnInfo
from ..config import data_path, env
from ..embeddings.vector_store import VectorStore
from ..embeddings.vector_store_numpy import NumpyVectorStore
from ..schema import (
  MANIFEST_FILENAME,
  PATH_WILDCARD,
  TEXT_SPAN_END_FEATURE,
  TEXT_SPAN_START_FEATURE,
  UUID_COLUMN,
  VALUE_KEY,
  Bin,
  DataType,
  Field,
  Item,
  Path,
  PathTuple,
  RichData,
  Schema,
  SignalInputType,
  SourceManifest,
  VectorKey,
  column_paths_match,
  is_float,
  is_integer,
  is_ordinal,
  is_temporal,
  normalize_path,
  signal_compute_type_supports_dtype,
)
from ..signals.concept_labels import ConceptLabelsSignal
from ..signals.concept_scorer import ConceptScoreSignal
from ..signals.semantic_similarity import SemanticSimilaritySignal
from ..signals.signal import (
  EMBEDDING_KEY,
  Signal,
  TextEmbeddingModelSignal,
  TextEmbeddingSignal,
  resolve_signal,
)
from ..signals.substring_search import SubstringSignal
from ..tasks import TaskStepId, TaskStepInfo, progress, set_worker_steps
from ..utils import DebugTimer, get_dataset_output_dir, log, open_file
from . import dataset
from .dataset import (
  BinaryOp,
  Column,
  ColumnId,
  Dataset,
  DatasetManifest,
  DatasetSettings,
  FeatureListValue,
  FeatureValue,
  Filter,
  FilterLike,
  GroupsSortBy,
  ListOp,
  MediaResult,
  Search,
  SearchResultInfo,
  SelectGroupsResult,
  SelectRowsResult,
  SelectRowsSchemaResult,
  SelectRowsSchemaUDF,
  SortOrder,
  SortResult,
  StatsResult,
  UnaryOp,
  column_from_identifier,
  default_settings,
  make_parquet_id,
)
from .dataset_utils import (
  count_primitives,
  create_signal_schema,
  flatten,
  flatten_keys,
  merge_schemas,
  read_embedding_index,
  replace_embeddings_with_none,
  schema_contains_path,
  sparse_to_dense_compute,
  unflatten,
  wrap_in_dicts,
  write_item_embeddings_to_disk,
  write_items_to_parquet,
)

UUID_INDEX_FILENAME = 'uuids.npy'

SIGNAL_MANIFEST_FILENAME = 'signal_manifest.json'
DATASET_SETTINGS_FILENAME = 'settings.json'
SOURCE_VIEW_NAME = 'source'

# Sample size for approximating the distinct count of a column.
SAMPLE_SIZE_DISTINCT_COUNT = 100_000
NUM_AUTO_BINS = 15

BINARY_OP_TO_SQL: dict[BinaryOp, str] = {
  BinaryOp.EQUALS: '=',
  BinaryOp.NOT_EQUAL: '!=',
  BinaryOp.GREATER: '>',
  BinaryOp.GREATER_EQUAL: '>=',
  BinaryOp.LESS: '<',
  BinaryOp.LESS_EQUAL: '<='
}


class DuckDBSearchUDF(BaseModel):
  """The transformation of searches to column UDFs."""
  udf: Column
  search_path: PathTuple
  output_path: PathTuple
  sort: Optional[tuple[PathTuple, SortOrder]] = None


class DuckDBSearchUDFs(BaseModel):
  """The transformation of searches to column UDFs with sorts."""
  udfs: list[Column]
  output_paths: list[PathTuple]
  sorts: list[tuple[PathTuple, SortOrder]]


class DatasetDuckDB(Dataset):
  """The DuckDB implementation of the dataset database."""

  def __init__(self,
               namespace: str,
               dataset_name: str,
               vector_store_cls: Type[VectorStore] = NumpyVectorStore):
    super().__init__(namespace, dataset_name)

    self.dataset_path = get_dataset_output_dir(data_path(), namespace, dataset_name)

    # TODO: Infer the manifest from the parquet files so this is lighter weight.
    self._source_manifest = read_source_manifest(self.dataset_path)
    self._signal_manifests: list[SignalManifest] = []
    self.con = duckdb.connect(database=':memory:')

    # Maps a column path and embedding to the vector store. This is lazily generated as needed.
    self._col_vector_stores: dict[PathTuple, VectorStore] = {}
    self.vector_store_cls = vector_store_cls
    self._manifest_lock = threading.Lock()

    # Calling settings creates the default settings JSON file if it doesn't exist.
    self.settings()

  @override
  def delete(self) -> None:
    """Deletes the dataset."""
    self.con.close()
    shutil.rmtree(self.dataset_path, ignore_errors=True)

  def _create_view(self, view_name: str, files: list[str]) -> None:
    self.con.execute(f"""
      CREATE OR REPLACE VIEW {_escape_col_name(view_name)} AS (SELECT * FROM read_parquet({files}));
    """)

  # NOTE: This is cached, but when the latest mtime of any file in the dataset directory changes
  # the results are invalidated.
  @functools.cache
  def _recompute_joint_table(self, latest_mtime_micro_sec: int) -> DatasetManifest:
    del latest_mtime_micro_sec  # This is used as the cache key.
    merged_schema = self._source_manifest.data_schema.copy(deep=True)
    self._signal_manifests = []
    # Make a joined view of all the column groups.
    self._create_view(SOURCE_VIEW_NAME,
                      [os.path.join(self.dataset_path, f) for f in self._source_manifest.files])

    # Add the signal column groups.
    for root, _, files in os.walk(self.dataset_path):
      for file in files:
        if not file.endswith(SIGNAL_MANIFEST_FILENAME):
          continue

        with open_file(os.path.join(root, file)) as f:
          signal_manifest = SignalManifest.parse_raw(f.read())
        self._signal_manifests.append(signal_manifest)
        signal_files = [os.path.join(root, f) for f in signal_manifest.files]
        self._create_view(signal_manifest.parquet_id, signal_files)

    merged_schema = merge_schemas([self._source_manifest.data_schema] +
                                  [m.data_schema for m in self._signal_manifests])

    # The logic below generates the following example query:
    # CREATE OR REPLACE VIEW t AS (
    #   SELECT
    #     source.*,
    #     "parquet_id1"."root_column" AS "parquet_id1",
    #     "parquet_id2"."root_column" AS "parquet_id2"
    #   FROM source JOIN "parquet_id1" USING (uuid,) JOIN "parquet_id2" USING (uuid,)
    # );
    # NOTE: "root_column" for each signal is defined as the top-level column.
    select_sql = ', '.join([f'{SOURCE_VIEW_NAME}.*'] + [(
      f'{_escape_col_name(manifest.parquet_id)}.{_escape_col_name(_root_column(manifest))} '
      f'AS {_escape_col_name(manifest.parquet_id)}') for manifest in self._signal_manifests])
    join_sql = ' '.join([SOURCE_VIEW_NAME] + [
      f'join {_escape_col_name(manifest.parquet_id)} using ({UUID_COLUMN},)'
      for manifest in self._signal_manifests
    ])
    view_or_table = 'TABLE'
    use_views = env('DUCKDB_USE_VIEWS', 0) or 0
    if int(use_views):
      view_or_table = 'VIEW'
    sql_cmd = f"""CREATE OR REPLACE {view_or_table} t AS (SELECT {select_sql} FROM {join_sql})"""
    self.con.execute(sql_cmd)

    # Get the total size of the table.
    size_query = 'SELECT COUNT() as count FROM t'
    size_query_result = cast(Any, self._query(size_query)[0])
    num_items = cast(int, size_query_result[0])

    return DatasetManifest(
      namespace=self.namespace,
      dataset_name=self.dataset_name,
      data_schema=merged_schema,
      num_items=num_items)

  @override
  def manifest(self) -> DatasetManifest:
    # Use the latest modification time of all files under the dataset path as the cache key for
    # re-computing the manifest and the joined view.
    with self._manifest_lock:
      all_dataset_files = glob.iglob(os.path.join(self.dataset_path, '**'), recursive=True)
      latest_mtime = max(map(os.path.getmtime, all_dataset_files))
      latest_mtime_micro_sec = int(latest_mtime * 1e6)
      return self._recompute_joint_table(latest_mtime_micro_sec)

  @override
  def settings(self) -> DatasetSettings:
    # Read the settings file from disk.
    settings_filepath = _settings_filepath(self.namespace, self.dataset_name)
    if not os.path.exists(settings_filepath):
      self.update_settings(default_settings(self))

    with open(settings_filepath) as f:
      return DatasetSettings.parse_raw(f.read())

  @override
  def update_settings(self, settings: DatasetSettings) -> None:
    # Write the settings file from disk.
    settings_filepath = _settings_filepath(self.namespace, self.dataset_name)
    with open(settings_filepath, 'w') as f:
      f.write(settings.json())

  def count(self, filters: Optional[list[FilterLike]] = None) -> int:
    """Count the number of rows."""
    raise NotImplementedError('count is not yet implemented for DuckDB.')

  @override
  def get_vector_store(self, embedding: str, path: PathTuple) -> VectorStore:
    # Refresh the manifest to make sure we have the latest signal manifests.
    self.manifest()

    if path[-1] != EMBEDDING_KEY:
      path = (*path, embedding, PATH_WILDCARD, EMBEDDING_KEY)

    if path not in self._col_vector_stores:
      manifests = [
        m for m in self._signal_manifests
        if schema_contains_path(m.data_schema, path) and m.embedding_filename_prefix
      ]
      if not manifests:
        raise ValueError(f'No embedding found for path {path}.')
      if len(manifests) > 1:
        raise ValueError(f'Multiple embeddings found for path {path}. Got: {manifests}')
      manifest = manifests[0]
      if not manifest.embedding_filename_prefix:
        raise ValueError(f'Signal manifest for path {path} is not an embedding. '
                         f'Got signal manifest: {manifest}')

      signal_name = cast(str, manifest.signal.signal_name)
      filepath_prefix = os.path.join(self.dataset_path, _signal_dir(manifest.enriched_path),
                                     signal_name, manifest.embedding_filename_prefix)
      keys, embeddings = read_embedding_index(filepath_prefix)
      # Get all the embeddings and pass it to the vector store.
      vector_store = self.vector_store_cls()
      vector_store.add(keys, embeddings)
      # Cache the vector store.
      self._col_vector_stores[path] = vector_store

    return self._col_vector_stores[path]

  def _prepare_signal(
      self,
      signal: Signal,
      source_path: PathTuple,
      manifest: DatasetManifest,
      compute_dependencies: Optional[bool] = False,
      task_step_id: Optional[TaskStepId] = None) -> tuple[PathTuple, Optional[TaskStepId]]:
    """Run all the signals dependencies required to run this signal.

    Args:
      signal: The signal to prepare.
      source_path: The source path the signal is running over.
      compute_dependencies: If True, signals will get computed for the whole column. If False,
        throw if the required inputs are not computed yet.
      task_step_id: The TaskStepId used to run the signal.

    Returns
      The final path the signal will be run over and the new step id for the final signal.
    """
    is_value_path = False
    if source_path[-1] == VALUE_KEY:
      is_value_path = True
      source_path = source_path[:-1]

    new_path = source_path

    signals_to_compute: list[tuple[PathTuple, Signal]] = []
    if isinstance(signal, TextEmbeddingModelSignal):
      embedding_signal = signal.get_embedding_signal()
      new_path = (*new_path, embedding_signal.key(), PATH_WILDCARD, EMBEDDING_KEY)
      if new_path not in manifest.data_schema.leafs:
        if not compute_dependencies:
          raise ValueError(f'Embedding signal "{embedding_signal.key()}" is not computed over '
                           f'{source_path}. Please run `dataset.compute_signal` over '
                           f'{source_path} first.')
        signals_to_compute.append((new_path, embedding_signal))

    new_steps = len(signals_to_compute)
    # Setup the task steps so the task progress indicator knows the number of steps before they are
    # computed.
    task_id: Optional[str] = None
    step_id: Optional[int] = None
    if task_step_id:
      (task_id, step_id) = task_step_id
      if task_id != '' and new_steps:
        # Make a step for the parent.
        set_worker_steps(task_id, [TaskStepInfo()] * (new_steps + 1))

    for i, (new_path, signal) in enumerate(signals_to_compute):
      if new_path not in manifest.data_schema.leafs:
        self.compute_signal(
          signal, source_path, task_step_id=(task_id, i) if task_id is not None else None)

    if is_value_path:
      new_path = (*new_path, VALUE_KEY)

    new_task_id: Optional[TaskStepId] = None
    if task_id is not None and step_id is not None:
      new_task_id = (task_id, step_id + new_steps)
    return (new_path, new_task_id)

  @override
  def compute_signal(self,
                     signal: Signal,
                     leaf_path: Path,
                     task_step_id: Optional[TaskStepId] = None) -> None:
    source_path = normalize_path(leaf_path)
    manifest = self.manifest()

    if task_step_id is None:
      # Make a dummy task step so we report progress via tqdm.
      task_step_id = ('', 0)

    # Prepare the dependencies of this signal.
    signal_source_path, task_step_id = self._prepare_signal(
      signal, source_path, manifest, compute_dependencies=True, task_step_id=task_step_id)

    # The manifest may have changed after computing the dependencies.
    manifest = self.manifest()

    if isinstance(signal, ConceptScoreSignal):
      # Set dataset information on the signal.
      signal.set_column_info(
        ConceptColumnInfo(namespace=self.namespace, name=self.dataset_name, path=source_path))

    signal_col = Column(path=source_path, alias='value', signal_udf=signal)
    select_rows_result = self.select_rows([signal_col],
                                          task_step_id=task_step_id,
                                          resolve_span=True)
    df = select_rows_result.df()
    values = df['value']

    source_path = signal_source_path
    signal_col.path = source_path

    enriched_path = _col_destination_path(signal_col, is_computed_signal=True)
    spec = _split_path_into_subpaths_of_lists(enriched_path)
    output_dir = os.path.join(self.dataset_path, _signal_dir(enriched_path))
    signal_schema = create_signal_schema(signal, source_path, manifest.data_schema)
    enriched_signal_items = cast(Iterable[Item], wrap_in_dicts(values, spec))
    for uuid, item in zip(df[UUID_COLUMN], enriched_signal_items):
      item[UUID_COLUMN] = uuid

    is_embedding = isinstance(signal, TextEmbeddingSignal)
    embedding_filename_prefix = None
    if is_embedding:
      embedding_filename_prefix = os.path.basename(
        write_item_embeddings_to_disk(
          keys=df[UUID_COLUMN],
          embeddings=values,
          output_dir=output_dir,
          shard_index=0,
          num_shards=1))

      # Replace the embeddings with None so they are not serialized in the parquet file.
      enriched_signal_items = (replace_embeddings_with_none(item) for item in enriched_signal_items)

    enriched_signal_items = list(enriched_signal_items)
    parquet_filename, _ = write_items_to_parquet(
      items=enriched_signal_items,
      output_dir=output_dir,
      schema=signal_schema,
      filename_prefix='data',
      shard_index=0,
      num_shards=1)

    signal_manifest = SignalManifest(
      files=[parquet_filename],
      data_schema=signal_schema,
      signal=signal,
      enriched_path=source_path,
      parquet_id=make_parquet_id(signal, source_path, is_computed_signal=True),
      embedding_filename_prefix=embedding_filename_prefix)
    signal_manifest_filepath = os.path.join(output_dir, SIGNAL_MANIFEST_FILENAME)
    with open_file(signal_manifest_filepath, 'w') as f:
      f.write(signal_manifest.json(exclude_none=True, indent=2))
    log(f'Wrote signal output to {output_dir}')

  @override
  def delete_signal(self, signal_path: Path) -> None:
    signal_path = normalize_path(signal_path)
    manifest = self.manifest()
    if not manifest.data_schema.has_field(signal_path):
      raise ValueError(f'Unknown signal path: {signal_path}')

    output_dir = os.path.join(self.dataset_path, _signal_dir(signal_path))
    shutil.rmtree(output_dir, ignore_errors=True)

  def _validate_filters(self, filters: Sequence[Filter], col_aliases: dict[str, PathTuple],
                        manifest: DatasetManifest) -> None:
    for filter in filters:
      if filter.path[0] in col_aliases:
        # This is a filter on a column alias, which is always allowed.
        continue

      current_field = Field(fields=manifest.data_schema.fields)
      for path_part in filter.path:
        if path_part == VALUE_KEY:
          if not current_field.dtype:
            raise ValueError(f'Unable to filter on path {filter.path}. The field has no value.')
          continue
        if current_field.fields:
          if path_part not in current_field.fields:
            raise ValueError(f'Unable to filter on path {filter.path}. '
                             f'Path part "{path_part}" not found in the dataset.')
          current_field = current_field.fields[str(path_part)]
          continue
        elif current_field.repeated_field:
          current_field = current_field.repeated_field
          continue
        else:
          raise ValueError(f'Unable to filter on path {filter.path}. '
                           f'Path part "{path_part}" is not defined on a primitive value.')

      while current_field.repeated_field:
        current_field = current_field.repeated_field
        filter.path = (*filter.path, PATH_WILDCARD)

      if not current_field.dtype:
        raise ValueError(f'Unable to filter on path {filter.path}. The field has no value.')

  def _validate_udfs(self, udf_cols: Sequence[Column], source_schema: Schema) -> None:
    for col in udf_cols:
      path = col.path

      # Signal transforms must operate on a leaf field.
      leaf = source_schema.leafs.get(path)
      if not leaf or not leaf.dtype:
        raise ValueError(f'Leaf "{path}" not found in dataset. '
                         'Signal transforms must operate on a leaf field.')

      # Signal transforms must have the same dtype as the leaf field.
      signal = cast(Signal, col.signal_udf)
      compute_type = signal.compute_type
      if not signal_compute_type_supports_dtype(compute_type, leaf.dtype):
        raise ValueError(f'Leaf "{path}" has dtype "{leaf.dtype}" which is not supported '
                         f'by "{signal.key()}" with signal input type "{compute_type}".')

  def _validate_selection(self, columns: Sequence[Column], select_schema: Schema) -> None:
    # Validate all the columns and make sure they exist in the `select_schema`.
    for column in columns:
      current_field = Field(fields=select_schema.fields)
      path = column.path
      for path_part in path:
        if path_part == VALUE_KEY:
          if not current_field.dtype:
            raise ValueError(f'Unable to select path {path}. The field that has no value.')
          continue
        if current_field.fields:
          if path_part not in current_field.fields:
            raise ValueError(f'Unable to select path {path}. '
                             f'Path part "{path_part}" not found in the dataset.')
          current_field = current_field.fields[path_part]
          continue
        elif current_field.repeated_field:
          if path_part.isdigit():
            raise ValueError(f'Unable to select path {path}. Selecting a specific index of '
                             'a repeated field is currently not supported.')
          if path_part != PATH_WILDCARD:
            raise ValueError(f'Unable to select path {path}. '
                             f'Path part "{path_part}" should be a wildcard.')
          current_field = current_field.repeated_field
        elif not current_field.dtype:
          raise ValueError(f'Unable to select path {path}. '
                           f'Path part "{path_part}" is not defined on a primitive value.')

  def _validate_columns(self, columns: Sequence[Column], source_schema: Schema,
                        select_schema: Schema) -> None:
    udf_cols = [col for col in columns if col.signal_udf]
    self._validate_udfs(udf_cols, source_schema)
    self._validate_selection(columns, select_schema)

  def _validate_sort_path(self, path: PathTuple, schema: Schema) -> None:
    current_field = Field(fields=schema.fields)
    for path_part in path:
      if path_part == VALUE_KEY:
        if not current_field.dtype:
          raise ValueError(f'Unable to sort by path {path}. The field that has no value.')
        continue
      if current_field.fields:
        if path_part not in current_field.fields:
          raise ValueError(f'Unable to sort by path {path}. '
                           f'Path part "{path_part}" not found in the dataset.')
        current_field = current_field.fields[path_part]
        continue
      elif current_field.repeated_field:
        if path_part.isdigit():
          raise ValueError(f'Unable to sort by path {path}. Selecting a specific index of '
                           'a repeated field is currently not supported.')
        if path_part != PATH_WILDCARD:
          raise ValueError(f'Unable to sort by path {path}. '
                           f'Path part "{path_part}" should be a wildcard.')
        current_field = current_field.repeated_field
      elif not current_field.dtype:
        raise ValueError(f'Unable to sort by path {path}. '
                         f'Path part "{path_part}" is not defined on a primitive value.')
    if not current_field.dtype:
      raise ValueError(f'Unable to sort by path {path}. The field has no value.')

  @override
  def stats(self, leaf_path: Path) -> StatsResult:
    if not leaf_path:
      raise ValueError('leaf_path must be provided')
    path = normalize_path(leaf_path)
    manifest = self.manifest()
    leaf = manifest.data_schema.get_field(path)
    # Find the inner-most leaf in case this field is repeated.
    while leaf.repeated_field:
      leaf = leaf.repeated_field
      path = (*path, PATH_WILDCARD)

    if not leaf.dtype:
      raise ValueError(f'Leaf "{path}" not found in dataset')

    duckdb_path = self._leaf_path_to_duckdb_path(path, manifest.data_schema)
    inner_select = _select_sql(
      duckdb_path, flatten=True, unnest=True, span_from=self._get_span_from(path, manifest))

    # Compute approximate count by sampling the data to avoid OOM.
    sample_size = SAMPLE_SIZE_DISTINCT_COUNT
    avg_length_query = ''
    if leaf.dtype == DataType.STRING:
      avg_length_query = ', avg(length(val)) as avgTextLength'

    row: Optional[tuple[int, ...]] = None
    if leaf.dtype == DataType.BOOLEAN:
      approx_count_distinct = 2
    else:
      approx_count_query = f"""
        SELECT approx_count_distinct(val) as approxCountDistinct {avg_length_query}
        FROM (SELECT {inner_select} AS val FROM t LIMIT {sample_size});
      """
      row = self._query(approx_count_query)[0]
      approx_count_distinct = row[0]

    total_count_query = f'SELECT count(val) FROM (SELECT {inner_select} as val FROM t)'
    total_count = self._query(total_count_query)[0][0]

    if leaf.dtype != DataType.BOOLEAN:
      # Adjust the counts for the sample size.
      factor = max(1, total_count / sample_size)
      approx_count_distinct = round(approx_count_distinct * factor)

    result = StatsResult(
      path=path, total_count=total_count, approx_count_distinct=approx_count_distinct)

    if leaf.dtype == DataType.STRING and row:
      result.avg_text_length = row[1]

    # Compute min/max values for ordinal leafs, without sampling the data.
    if is_ordinal(leaf.dtype):
      min_max_query = f"""
        SELECT MIN(val) AS minVal, MAX(val) AS maxVal
        FROM (SELECT {inner_select} as val FROM t)
        {'WHERE NOT isnan(val)' if is_float(leaf.dtype) else ''}
      """
      row = self._query(min_max_query)[0]
      result.min_val, result.max_val = row

    return result

  @override
  def select_groups(
      self,
      leaf_path: Path,
      filters: Optional[Sequence[FilterLike]] = None,
      sort_by: Optional[GroupsSortBy] = GroupsSortBy.COUNT,
      sort_order: Optional[SortOrder] = SortOrder.DESC,
      limit: Optional[int] = None,
      bins: Optional[Union[Sequence[Bin], Sequence[float]]] = None) -> SelectGroupsResult:
    if not leaf_path:
      raise ValueError('leaf_path must be provided')
    path = normalize_path(leaf_path)
    manifest = self.manifest()
    leaf = manifest.data_schema.get_field(path)
    # Find the inner-most leaf in case this field is repeated.
    while leaf.repeated_field:
      leaf = leaf.repeated_field
      path = (*path, PATH_WILDCARD)

    if not leaf.dtype:
      raise ValueError(f'Leaf "{path}" not found in dataset')

    inner_val = 'inner_val'
    outer_select = inner_val
    # Normalize the bins to be `list[Bin]`.
    named_bins = _normalize_bins(bins or leaf.bins)
    stats = self.stats(leaf_path)

    leaf_is_float = is_float(leaf.dtype)
    leaf_is_integer = is_integer(leaf.dtype)
    if not leaf.categorical and (leaf_is_float or leaf_is_integer):
      if named_bins is None:
        # Auto-bin.
        named_bins = _auto_bins(stats, NUM_AUTO_BINS)

      sql_bounds = []
      for label, start, end in named_bins:
        if start is None:
          start = cast(float, "'-Infinity'")
        if end is None:
          end = cast(float, "'Infinity'")
        sql_bounds.append(f"('{label}', {start}, {end})")

      bin_index_col = 'col0'
      bin_min_col = 'col1'
      bin_max_col = 'col2'
      is_nan_filter = f'NOT isnan({inner_val}) AND' if leaf_is_float else ''

      # We cast the field to `double` so binning works for both `float` and `int` fields.
      outer_select = f"""(
        SELECT {bin_index_col} FROM (
          VALUES {', '.join(sql_bounds)}
        ) WHERE {is_nan_filter}
           {inner_val}::DOUBLE >= {bin_min_col} AND {inner_val}::DOUBLE < {bin_max_col}
      )"""
    else:
      if stats.approx_count_distinct >= dataset.TOO_MANY_DISTINCT:
        return SelectGroupsResult(too_many_distinct=True, counts=[], bins=named_bins)

    count_column = 'count'
    value_column = 'value'

    limit_query = f'LIMIT {limit}' if limit else ''
    duckdb_path = self._leaf_path_to_duckdb_path(path, manifest.data_schema)
    inner_select = _select_sql(
      duckdb_path, flatten=True, unnest=True, span_from=self._get_span_from(path, manifest))

    filters, _ = self._normalize_filters(filters, col_aliases={}, udf_aliases={}, manifest=manifest)
    filter_queries = self._create_where(manifest, filters, searches=[])

    where_query = ''
    if filter_queries:
      where_query = f"WHERE {' AND '.join(filter_queries)}"

    query = f"""
      SELECT {outer_select} AS {value_column}, COUNT() AS {count_column}
      FROM (SELECT {inner_select} AS {inner_val} FROM t {where_query})
      GROUP BY {value_column}
      ORDER BY {sort_by} {sort_order}
      {limit_query}
    """
    df = self._query_df(query)
    counts = list(df.itertuples(index=False, name=None))
    if is_temporal(leaf.dtype):
      # Replace any NaT with None and pd.Timestamp to native datetime objects.
      counts = [(None if pd.isnull(val) else val.to_pydatetime(), count) for val, count in counts]
    return SelectGroupsResult(too_many_distinct=False, counts=counts, bins=named_bins)

  def _topk_udf_to_sort_by(
    self,
    udf_columns: list[Column],
    sort_by: list[PathTuple],
    limit: Optional[int],
    sort_order: Optional[SortOrder],
  ) -> Optional[Column]:
    if (sort_order != SortOrder.DESC) or (not limit) or (not sort_by):
      return None
    if len(sort_by) < 1:
      return None
    primary_sort_by = sort_by[0]
    udf_cols_to_sort_by = [
      col for col in udf_columns
      if col.alias == primary_sort_by[0] or _col_destination_path(col) == primary_sort_by
    ]
    if not udf_cols_to_sort_by:
      return None
    udf_col = udf_cols_to_sort_by[0]
    if udf_col.signal_udf and (udf_col.signal_udf.compute_type
                               not in [SignalInputType.TEXT_EMBEDDING]):
      return None
    return udf_col

  def _normalize_columns(self, columns: Optional[Sequence[ColumnId]],
                         schema: Schema) -> list[Column]:
    """Normalizes the columns to a list of `Column` objects."""
    cols = [column_from_identifier(col) for col in columns or []]
    star_in_cols = any(col.path == ('*',) for col in cols)
    if not cols or star_in_cols:
      # Select all columns.
      cols.extend([Column((name,)) for name in schema.fields.keys()])
      if star_in_cols:
        cols = [col for col in cols if col.path != ('*',)]
    return cols

  def _merge_sorts(self, search_udfs: list[DuckDBSearchUDF], sort_by: Optional[Sequence[Path]],
                   sort_order: Optional[SortOrder]) -> list[SortResult]:
    # True when the user has explicitly sorted by the alias of a search UDF (e.g. in ASC order).
    is_explicit_search_sort = False
    for sort_by_path in sort_by or []:
      for search_udf in search_udfs:
        if column_paths_match(sort_by_path, search_udf.output_path):
          is_explicit_search_sort = True
          break

    sort_results: list[SortResult] = []
    if sort_by and not is_explicit_search_sort:
      if not sort_order:
        raise ValueError('`sort_order` is required when `sort_by` is specified.')
      # If the user has explicitly set a sort by, and it's not a search UDF alias, override.
      sort_results = [
        SortResult(path=normalize_path(sort_by), order=sort_order) for sort_by in sort_by if sort_by
      ]
    else:
      search_udfs_with_sort = [search_udf for search_udf in search_udfs if search_udf.sort]
      if search_udfs_with_sort:
        # Override the sort by by the last search sort order when the user hasn't provided an
        # explicit sort order.
        last_search_udf = search_udfs_with_sort[-1]
        if sort_order is None:
          _, sort_order = cast(tuple[PathTuple, SortOrder], last_search_udf.sort)
        sort_results = [
          SortResult(
            path=last_search_udf.output_path,
            order=sort_order,
            search_index=len(search_udfs_with_sort) - 1)
        ]

    return sort_results

  @override
  def select_rows(self,
                  columns: Optional[Sequence[ColumnId]] = None,
                  searches: Optional[Sequence[Search]] = None,
                  filters: Optional[Sequence[FilterLike]] = None,
                  sort_by: Optional[Sequence[Path]] = None,
                  sort_order: Optional[SortOrder] = SortOrder.DESC,
                  limit: Optional[int] = None,
                  offset: Optional[int] = 0,
                  task_step_id: Optional[TaskStepId] = None,
                  resolve_span: bool = False,
                  combine_columns: bool = False,
                  user: Optional[UserInfo] = None) -> SelectRowsResult:
    manifest = self.manifest()
    cols = self._normalize_columns(columns, manifest.data_schema)

    # Always return the UUID column.
    col_paths = [col.path for col in cols]
    if (UUID_COLUMN,) not in col_paths:
      cols.append(column_from_identifier(UUID_COLUMN))

    # Prepare UDF columns. Throw an error if they are not computed. Update the paths of the UDFs so
    # they match the paths of the columns defined by splits and embeddings.
    for col in cols:
      if col.signal_udf:
        # Do not auto-compute dependencies, throw an error if they are not computed.
        col.path, _ = self._prepare_signal(
          col.signal_udf, col.path, manifest, compute_dependencies=False)

    schema = manifest.data_schema

    if combine_columns:
      schema = self.select_rows_schema(
        columns, sort_by, sort_order, searches, combine_columns=True).data_schema

    self._validate_columns(cols, manifest.data_schema, schema)
    self._normalize_searches(searches, manifest)
    search_udfs = self._search_udfs(searches, manifest)
    cols.extend([search_udf.udf for search_udf in search_udfs])
    udf_columns = [col for col in cols if col.signal_udf]

    # Set dataset information on any concept signals.
    for udf_col in udf_columns:
      if isinstance(udf_col.signal_udf, ConceptScoreSignal):
        # Set dataset information on the signal.
        source_path = udf_col.path if udf_col.path[-1] != EMBEDDING_KEY else udf_col.path[:-3]
        udf_col.signal_udf.set_column_info(
          ConceptColumnInfo(namespace=self.namespace, name=self.dataset_name, path=source_path))

      if isinstance(udf_col.signal_udf, (ConceptScoreSignal, ConceptLabelsSignal)):
        # Concept are access controlled so we tell it about the user.
        udf_col.signal_udf.set_user(user)

    # Decide on the exact sorting order.
    sort_results = self._merge_sorts(search_udfs, sort_by, sort_order)
    sort_by = cast(list[PathTuple],
                   [(sort.alias,) if sort.alias else sort.path for sort in sort_results])
    # Choose the first sort order as we only support a single sort order for now.
    sort_order = sort_results[0].order if sort_results else None

    col_aliases: dict[str, PathTuple] = {col.alias: col.path for col in cols if col.alias}
    udf_aliases: dict[str, PathTuple] = {
      col.alias: col.path for col in cols if col.signal_udf and col.alias
    }
    path_to_udf_col_name: dict[PathTuple, str] = {}
    for col in cols:
      if col.signal_udf:
        alias = col.alias or _unique_alias(col)
        dest_path = _col_destination_path(col)
        path_to_udf_col_name[dest_path] = alias

    # Filtering and searching.
    where_query = ''
    filters, udf_filters = self._normalize_filters(filters, col_aliases, udf_aliases, manifest)
    filter_queries = self._create_where(manifest, filters, searches)
    if filter_queries:
      where_query = f"WHERE {' AND '.join(filter_queries)}"

    total_num_rows = manifest.num_items
    con = self.con.cursor()

    topk_udf_col = self._topk_udf_to_sort_by(udf_columns, sort_by, limit, sort_order)
    if topk_udf_col:
      key_prefixes: Optional[Iterable[VectorKey]] = None
      if where_query:
        # If there are filters, we need to send UUIDs to the top k query.
        df = con.execute(f'SELECT {UUID_COLUMN} FROM t {where_query}').df()
        total_num_rows = len(df)
        key_prefixes = df[UUID_COLUMN]

      topk_signal = cast(TextEmbeddingModelSignal, topk_udf_col.signal_udf)
      # The input is an embedding.
      vector_store = self.get_vector_store(topk_signal.embedding, topk_udf_col.path)
      k = (limit or 0) + (offset or 0)
      topk = topk_signal.vector_compute_topk(k, vector_store, key_prefixes)
      topk_uuids = list(dict.fromkeys([cast(str, key[0]) for key, _ in topk]))

      # Ignore all the other filters and filter DuckDB results only by the top k UUIDs.
      uuid_filter = Filter(path=(UUID_COLUMN,), op=ListOp.IN, value=topk_uuids)
      filter_query = self._create_where(manifest, [uuid_filter])[0]
      where_query = f'WHERE {filter_query}'

    # Map a final column name to a list of temporary namespaced column names that need to be merged.
    columns_to_merge: dict[str, dict[str, Column]] = {}
    temp_column_to_offset_column: dict[str, tuple[str, Field]] = {}
    select_queries: list[str] = []

    for column in cols:
      path = column.path
      # If the signal is vector-based, we don't need to select the actual data, just the uuids
      # plus an arbitrarily nested array of `None`s`.
      empty = bool(column.signal_udf and schema.get_field(path).dtype == DataType.EMBEDDING)

      select_sqls: list[str] = []
      final_col_name = column.alias or _unique_alias(column)
      if final_col_name not in columns_to_merge:
        columns_to_merge[final_col_name] = {}

      duckdb_paths = self._column_to_duckdb_paths(column, schema, combine_columns)
      span_from = self._get_span_from(path, manifest) if resolve_span or column.signal_udf else None

      for parquet_id, duckdb_path in duckdb_paths:
        sql = _select_sql(
          duckdb_path, flatten=False, unnest=False, empty=empty, span_from=span_from)
        temp_column_name = (
          final_col_name if len(duckdb_paths) == 1 else f'{final_col_name}/{parquet_id}')
        select_sqls.append(f'{sql} AS {_escape_string_literal(temp_column_name)}')
        columns_to_merge[final_col_name][temp_column_name] = column

        if column.signal_udf and span_from and _schema_has_spans(column.signal_udf.fields()):
          sql = _select_sql(duckdb_path, flatten=False, unnest=False, empty=empty, span_from=None)
          temp_offset_column_name = f'{temp_column_name}/offset'
          temp_offset_column_name = temp_offset_column_name.replace("'", "\\'")
          select_sqls.append(f'{sql} AS {_escape_string_literal(temp_offset_column_name)}')
          temp_column_to_offset_column[temp_column_name] = (temp_offset_column_name,
                                                            column.signal_udf.fields())

      # `select_sqls` can be empty if this column points to a path that will be created by a UDF.
      if select_sqls:
        select_queries.append(', '.join(select_sqls))

    sort_sql_before_udf: list[str] = []
    sort_sql_after_udf: list[str] = []

    for path in sort_by:
      # We only allow sorting by nodes with a value.
      first_subpath = str(path[0])
      rest_of_path = path[1:]
      signal_alias = '.'.join(map(str, path))

      udf_path = _path_to_udf_duckdb_path(path, path_to_udf_col_name)
      if not udf_path:
        # Re-route the path if it starts with an alias by pointing it to the actual path.
        if first_subpath in col_aliases:
          path = (*col_aliases[first_subpath], *rest_of_path)
        self._validate_sort_path(path, schema)
        path = self._leaf_path_to_duckdb_path(path, schema)
      else:
        path = udf_path

      sort_sql = _select_sql(path, flatten=True, unnest=False)
      has_repeated_field = any(subpath == PATH_WILDCARD for subpath in path)
      if has_repeated_field:
        sort_sql = (f'list_min({sort_sql})'
                    if sort_order == SortOrder.ASC else f'list_max({sort_sql})')

      # Separate sort columns into two groups: those that need to be sorted before and after UDFs.
      if udf_path:
        sort_sql_after_udf.append(sort_sql)
      else:
        sort_sql_before_udf.append(sort_sql)

    order_query = ''
    if sort_sql_before_udf:
      order_query = (f'ORDER BY {", ".join(sort_sql_before_udf)} '
                     f'{cast(SortOrder, sort_order).value}')

    limit_query = ''
    if limit:
      if topk_udf_col:
        limit_query = f'LIMIT {limit + (offset or 0)}'
      elif sort_sql_after_udf:
        limit_query = ''
      else:
        limit_query = f'LIMIT {limit} OFFSET {offset or 0}'

    if not topk_udf_col and where_query:
      total_num_rows = cast(tuple,
                            con.execute(f'SELECT COUNT(*) FROM t {where_query}').fetchone())[0]

    # Fetch the data from DuckDB.
    df = con.execute(f"""
      SELECT {', '.join(select_queries)} FROM t
      {where_query}
      {order_query}
      {limit_query}
    """).df()
    df = _replace_nan_with_none(df)

    # Run UDFs on the transformed columns.
    for udf_col in udf_columns:
      signal = cast(Signal, udf_col.signal_udf)
      signal_alias = udf_col.alias or _unique_alias(udf_col)
      temp_signal_cols = columns_to_merge[signal_alias]
      if len(temp_signal_cols) != 1:
        raise ValueError(
          f'Unable to compute signal {signal.name}. Signal UDFs only operate on leafs, but got '
          f'{len(temp_signal_cols)} underlying columns that contain data related to {udf_col.path}.'
        )
      signal_column = list(temp_signal_cols.keys())[0]
      input = df[signal_column]

      with DebugTimer(f'Computing signal "{signal.signal_name}"'):
        signal.setup()

        if signal.compute_type in [SignalInputType.TEXT_EMBEDDING]:
          # The input is an embedding.
          embedding_signal = cast(TextEmbeddingModelSignal, signal)
          vector_store = self.get_vector_store(embedding_signal.embedding, udf_col.path)
          flat_keys = list(flatten_keys(df[UUID_COLUMN], input))
          signal_out = sparse_to_dense_compute(
            iter(flat_keys), lambda keys: signal.vector_compute(keys, vector_store))
          # Add progress.
          if task_step_id is not None:
            signal_out = progress(
              signal_out,
              task_step_id=task_step_id,
              estimated_len=len(flat_keys),
              step_description=f'Computing {signal.key()}')
          df[signal_column] = unflatten(signal_out, input)
        else:
          num_rich_data = count_primitives(input)
          flat_input = cast(Iterator[Optional[RichData]], flatten(input))
          signal_out = sparse_to_dense_compute(
            flat_input, lambda x: signal.compute(cast(Iterable[RichData], x)))
          # Add progress.
          if task_step_id is not None:
            signal_out = progress(
              signal_out,
              task_step_id=task_step_id,
              estimated_len=num_rich_data,
              step_description=f'Computing {signal.key()}')
          signal_out_list = list(signal_out)
          if signal_column in temp_column_to_offset_column:
            offset_column_name, field = temp_column_to_offset_column[signal_column]
            nested_spans: Iterable[Item] = df[offset_column_name]
            flat_spans = flatten(nested_spans)
            for span, item in zip(flat_spans, signal_out_list):
              _offset_any_span(cast(int, span[VALUE_KEY][TEXT_SPAN_START_FEATURE]), item, field)

          if len(signal_out_list) != num_rich_data:
            raise ValueError(
              f'The signal generated {len(signal_out_list)} values but the input data had '
              f"{num_rich_data} values. This means the signal either didn't generate a "
              '"None" for a sparse output, or generated too many items.')

          df[signal_column] = unflatten(signal_out_list, input)

        signal.teardown()

    if udf_filters or sort_sql_after_udf:
      # Re-upload the udf outputs to duckdb so we can filter/sort on them.
      rel = con.from_df(df)

      if udf_filters:
        udf_filter_queries = self._create_where(manifest, udf_filters)
        if udf_filter_queries:
          rel = rel.filter(' AND '.join(udf_filter_queries))
          total_num_rows = cast(tuple, rel.count('*').fetchone())[0]

      if sort_sql_after_udf:
        if not sort_order:
          raise ValueError('`sort_order` is required when `sort_by` is specified.')
        rel = rel.order(f'{", ".join(sort_sql_after_udf)} {sort_order.value}')

      if limit:
        rel = rel.limit(limit, offset or 0)

      df = _replace_nan_with_none(rel.df())

    if combine_columns:
      all_columns: dict[str, Column] = {}
      for col_dict in columns_to_merge.values():
        all_columns.update(col_dict)
      columns_to_merge = {'*': all_columns}

    for offset_column, _ in temp_column_to_offset_column.values():
      del df[offset_column]

    for final_col_name, temp_columns in columns_to_merge.items():
      for temp_col_name, column in temp_columns.items():
        if combine_columns:
          dest_path = _col_destination_path(column)
          spec = _split_path_into_subpaths_of_lists(dest_path)
          df[temp_col_name] = wrap_in_dicts(df[temp_col_name], spec)

        # If the temp col name is the same as the final name, we can skip merging. This happens when
        # we select a source leaf column.
        if temp_col_name == final_col_name:
          continue

        if final_col_name not in df:
          df[final_col_name] = df[temp_col_name]
        else:
          df[final_col_name] = merge_series(df[final_col_name], df[temp_col_name])
        del df[temp_col_name]

    con.close()

    if combine_columns:
      # Since we aliased every column to `*`, the object with have only '*' as the key. We need to
      # elevate the all the columns under '*'.
      df = pd.DataFrame.from_records(df['*'])

    return SelectRowsResult(df, total_num_rows)

  @override
  def select_rows_schema(self,
                         columns: Optional[Sequence[ColumnId]] = None,
                         sort_by: Optional[Sequence[Path]] = None,
                         sort_order: Optional[SortOrder] = None,
                         searches: Optional[Sequence[Search]] = None,
                         combine_columns: bool = False) -> SelectRowsSchemaResult:
    """Returns the schema of the result of `select_rows` above with the same arguments."""
    if not combine_columns:
      raise NotImplementedError(
        'select_rows_schema with combine_columns=False is not yet supported.')
    manifest = self.manifest()
    cols = self._normalize_columns(columns, manifest.data_schema)

    # Always return the UUID column.
    col_paths = [col.path for col in cols]
    if (UUID_COLUMN,) not in col_paths:
      cols.append(column_from_identifier(UUID_COLUMN))

    # Prepare UDF columns. Throw an error if they are not computed. Update the paths of the UDFs so
    # they match the paths of the columns defined by splits and embeddings.
    for col in cols:
      if col.signal_udf:
        # Do not auto-compute dependencies, throw an error if they are not computed.
        col.path, _ = self._prepare_signal(
          col.signal_udf, col.path, manifest, compute_dependencies=False)

    self._normalize_searches(searches, manifest)
    search_udfs = self._search_udfs(searches, manifest)
    cols.extend([search_udf.udf for search_udf in search_udfs])

    udfs: list[SelectRowsSchemaUDF] = []
    col_schemas: list[Schema] = []
    for col in cols:
      dest_path = _col_destination_path(col)
      if col.signal_udf:
        udfs.append(SelectRowsSchemaUDF(path=dest_path, alias=col.alias))
        field = col.signal_udf.fields()
        field.signal = col.signal_udf.dict()
      elif manifest.data_schema.has_field(dest_path):
        field = manifest.data_schema.get_field(dest_path)
      else:
        # This column might refer to an output of a udf. We postpone validation to later.
        continue
      col_schemas.append(_make_schema_from_path(dest_path, field))

    sort_results = self._merge_sorts(search_udfs, sort_by, sort_order)

    search_results = [
      SearchResultInfo(search_path=search_udf.search_path, result_path=search_udf.output_path)
      for search_udf in search_udfs
    ]

    new_schema = merge_schemas(col_schemas)

    # Now that we have the new schema, we can validate all the column selections.
    self._validate_columns(cols, manifest.data_schema, new_schema)

    return SelectRowsSchemaResult(
      data_schema=new_schema, udfs=udfs, search_results=search_results, sorts=sort_results or None)

  @override
  def media(self, item_id: str, leaf_path: Path) -> MediaResult:
    raise NotImplementedError('Media is not yet supported for the DuckDB implementation.')

  def _get_span_from(self, path: PathTuple, manifest: DatasetManifest) -> Optional[PathTuple]:
    leafs = manifest.data_schema.leafs
    # Remove the value key so we can check the dtype from leafs.
    span_path = path[:-1] if path[-1] == VALUE_KEY else path
    is_span = (span_path in leafs and leafs[span_path].dtype == DataType.STRING_SPAN)
    return _derived_from_path(path, manifest.data_schema) if is_span else None

  def _leaf_path_to_duckdb_path(self, leaf_path: PathTuple, schema: Schema) -> PathTuple:
    ((_, duckdb_path),) = self._column_to_duckdb_paths(
      Column(leaf_path), schema, combine_columns=False, select_leaf=True)
    return duckdb_path

  def _column_to_duckdb_paths(self,
                              column: Column,
                              schema: Schema,
                              combine_columns: bool,
                              select_leaf: bool = False) -> list[tuple[str, PathTuple]]:
    path = column.path
    parquet_manifests: list[Union[SourceManifest, SignalManifest]] = [
      self._source_manifest, *self._signal_manifests
    ]
    duckdb_paths: list[tuple[str, PathTuple]] = []
    source_has_path = False

    select_leaf = select_leaf or column.signal_udf is not None

    for m in parquet_manifests:
      # Skip this parquet file if it doesn't contain the path.
      if not schema_contains_path(m.data_schema, path):
        continue

      if isinstance(m, SourceManifest):
        source_has_path = True

      if isinstance(m, SignalManifest) and source_has_path and not combine_columns:
        # Skip this signal if the source already has the path and we are not combining columns.
        continue

      # Skip this parquet file if the path doesn't have a dtype.
      if select_leaf and not m.data_schema.get_field(path).dtype:
        continue

      if isinstance(m, SignalManifest) and path == (UUID_COLUMN,):
        # Do not select UUID from the signal because it's already in the source.
        continue

      duckdb_path = path
      parquet_id = 'source'

      if isinstance(m, SignalManifest):
        duckdb_path = (m.parquet_id, *path[1:])
        parquet_id = m.parquet_id

      duckdb_paths.append((parquet_id, duckdb_path))

    if not duckdb_paths:
      # This path is probably a result of a udf. Make sure the result schema contains it.
      if not schema.has_field(path):
        raise ValueError(f'Invalid path "{path}": No manifest contains path. Valid paths: '
                         f'{list(schema.leafs.keys())}')

    return duckdb_paths

  def _normalize_filters(self, filter_likes: Optional[Sequence[FilterLike]],
                         col_aliases: dict[str, PathTuple], udf_aliases: dict[str, PathTuple],
                         manifest: DatasetManifest) -> tuple[list[Filter], list[Filter]]:
    """Normalize `FilterLike` to `Filter` and split into filters on source and filters on UDFs."""
    filter_likes = filter_likes or []
    filters: list[Filter] = []
    udf_filters: list[Filter] = []

    for filter in filter_likes:
      # Normalize `FilterLike` to `Filter`.
      if not isinstance(filter, Filter):
        if len(filter) == 3:
          path, op, value = filter  # type: ignore
        elif len(filter) == 2:
          path, op = filter  # type: ignore
          value = None
        else:
          raise ValueError(f'Invalid filter: {filter}. Must be a tuple with 2 or 3 elements.')
        filter = Filter(path=normalize_path(path), op=op, value=value)

      if str(filter.path[0]) in udf_aliases:
        udf_filters.append(filter)
      else:
        filters.append(filter)

    self._validate_filters(filters, col_aliases, manifest)
    return filters, udf_filters

  def _normalize_searches(self, searches: Optional[Sequence[Search]],
                          manifest: DatasetManifest) -> None:
    """Validate searches."""
    if not searches:
      return

    for search in searches:
      search.path = normalize_path(search.path)
      field = manifest.data_schema.get_field(search.path)
      if field.dtype != DataType.STRING:
        raise ValueError(f'Invalid search path: {search.path}. '
                         f'Must be a string field, got dtype {field.dtype}')

  def _search_udfs(self, searches: Optional[Sequence[Search]],
                   manifest: DatasetManifest) -> list[DuckDBSearchUDF]:
    searches = searches or []
    """Create a UDF for each search for finding the location of the text with spans."""
    search_udfs: list[DuckDBSearchUDF] = []
    for search in searches:
      search_path = normalize_path(search.path)
      if search.query.type == 'keyword':
        udf = Column(path=search_path, signal_udf=SubstringSignal(query=search.query.search))
        search_udfs.append(
          DuckDBSearchUDF(
            udf=udf,
            search_path=search_path,
            output_path=(*_col_destination_path(udf), PATH_WILDCARD)))
      elif search.query.type == 'semantic' or search.query.type == 'concept':
        embedding = search.query.embedding
        if not embedding:
          raise ValueError(f'Please provide an embedding for semantic search. Got search: {search}')

        embedding_path = (*search_path, embedding, PATH_WILDCARD, EMBEDDING_KEY)
        try:
          manifest.data_schema.get_field(embedding_path)
        except Exception as e:
          raise ValueError(
            f'Embedding {embedding} has not been computed. '
            f'Please compute the embedding index before issuing a {search.query.type} query.'
          ) from e

        search_signal: Optional[Signal] = None
        if search.query.type == 'semantic':
          search_signal = SemanticSimilaritySignal(
            query=search.query.search, embedding=search.query.embedding)
        elif search.query.type == 'concept':
          search_signal = ConceptScoreSignal(
            namespace=search.query.concept_namespace,
            concept_name=search.query.concept_name,
            embedding=search.query.embedding)

          # Add the label UDF.
          concept_labels_signal = ConceptLabelsSignal(
            namespace=search.query.concept_namespace, concept_name=search.query.concept_name)
          concept_labels_udf = Column(path=search_path, signal_udf=concept_labels_signal)
          search_udfs.append(
            DuckDBSearchUDF(
              udf=concept_labels_udf,
              search_path=search_path,
              output_path=_col_destination_path(concept_labels_udf),
              sort=None))

        udf = Column(path=embedding_path, signal_udf=search_signal)

        output_path = _col_destination_path(udf)
        search_udfs.append(
          DuckDBSearchUDF(
            udf=udf,
            search_path=search_path,
            output_path=_col_destination_path(udf),
            sort=(output_path, SortOrder.DESC)))
      else:
        raise ValueError(f'Unknown search operator {search.query.type}.')

    return search_udfs

  def _create_where(self,
                    manifest: DatasetManifest,
                    filters: list[Filter],
                    searches: Optional[Sequence[Search]] = []) -> list[str]:
    if not filters and not searches:
      return []
    searches = searches or []
    sql_filter_queries: list[str] = []

    # Add search where queries.
    for search in searches:
      duckdb_path = self._leaf_path_to_duckdb_path(
        normalize_path(search.path), manifest.data_schema)
      select_str = _select_sql(duckdb_path, flatten=False, unnest=False)
      if search.query.type == 'keyword':
        sql_op = 'ILIKE'
        query_val = _escape_like_value(search.query.search)
      elif search.query.type == 'semantic' or search.query.type == 'concept':
        # Semantic search and concepts don't yet filter.
        continue
      else:
        raise ValueError(f'Unknown search operator {search.query.type}.')

      filter_query = f'{select_str} {sql_op} {query_val}'

      sql_filter_queries.append(filter_query)

    # Add filter where queries.
    binary_ops = set(BinaryOp)
    unary_ops = set(UnaryOp)
    list_ops = set(ListOp)
    for f in filters:
      duckdb_path = self._leaf_path_to_duckdb_path(f.path, manifest.data_schema)
      select_str = _select_sql(
        duckdb_path, flatten=True, unnest=False, span_from=self._get_span_from(f.path, manifest))
      is_array = any(subpath == PATH_WILDCARD for subpath in f.path)

      nan_filter = ''
      field = manifest.data_schema.get_field(f.path)
      filter_nans = field.dtype and is_float(field.dtype)

      if f.op in binary_ops:
        sql_op = BINARY_OP_TO_SQL[cast(BinaryOp, f.op)]
        filter_val = cast(FeatureValue, f.value)
        if isinstance(filter_val, str):
          filter_val = f"'{filter_val}'"
        elif isinstance(filter_val, bytes):
          filter_val = _bytes_to_blob_literal(filter_val)
        else:
          filter_val = str(filter_val)
        if is_array:
          nan_filter = 'NOT isnan(x) AND' if filter_nans else ''
          filter_query = (f'len(list_filter({select_str}, '
                          f'x -> {nan_filter} x {sql_op} {filter_val})) > 0')
        else:
          nan_filter = f'NOT isnan({select_str}) AND' if filter_nans else ''
          filter_query = f'{nan_filter} {select_str} {sql_op} {filter_val}'
      elif f.op in unary_ops:
        if f.op == UnaryOp.EXISTS:
          filter_query = f'len({select_str}) > 0' if is_array else f'{select_str} IS NOT NULL'
        else:
          raise ValueError(f'Unary op: {f.op} is not yet supported')
      elif f.op in list_ops:
        if f.op == ListOp.IN:
          filter_list_val = cast(FeatureListValue, f.value)
          if not isinstance(filter_list_val, list):
            raise ValueError('filter with array value can only use the IN comparison')
          wrapped_filter_val = [f"'{part}'" for part in filter_list_val]
          filter_val = f'({", ".join(wrapped_filter_val)})'
          filter_query = f'{select_str} IN {filter_val}'
        else:
          raise ValueError(f'List op: {f.op} is not yet supported')
      else:
        raise ValueError(f'Invalid filter op: {f.op}')
      sql_filter_queries.append(filter_query)
    return sql_filter_queries

  def _execute(self, query: str) -> duckdb.DuckDBPyConnection:
    """Execute a query in duckdb."""
    # FastAPI is multi-threaded so we have to create a thread-specific connection cursor to allow
    # these queries to be thread-safe.
    local_con = self.con.cursor()
    if not env('DEBUG', False):
      return local_con.execute(query)

    # Debug mode.
    log('Executing:')
    log(query)
    with DebugTimer('Query'):
      return local_con.execute(query)

  def _query(self, query: str) -> list[tuple]:
    result = self._execute(query)
    rows = result.fetchall()
    result.close()
    return rows

  def _query_df(self, query: str) -> pd.DataFrame:
    """Execute a query that returns a data frame."""
    result = self._execute(query)
    df = _replace_nan_with_none(result.df())
    result.close()
    return df

  def _path_to_col(self, path: Path, quote_each_part: bool = True) -> str:
    """Convert a path to a column name."""
    if isinstance(path, str):
      path = (path,)
    return '.'.join([
      f'{_escape_col_name(path_comp)}' if quote_each_part else str(path_comp) for path_comp in path
    ])

  @override
  def to_json(self, filepath: Union[str, pathlib.Path], jsonl: bool = True) -> None:
    self._execute(f"COPY t TO '{filepath}' (FORMAT JSON, ARRAY {'FALSE' if jsonl else 'TRUE'})")
    log(f'Dataset exported to {filepath}')

  @override
  def to_pandas(self) -> pd.DataFrame:
    return self._query_df('SELECT * FROM t')

  @override
  def to_csv(self, filepath: Union[str, pathlib.Path]) -> None:
    self._execute(f"COPY t TO '{filepath}' (FORMAT CSV, HEADER)")
    log(f'Dataset exported to {filepath}')

  @override
  def to_parquet(self, filepath: Union[str, pathlib.Path]) -> None:
    self._execute(f"COPY t TO '{filepath}' (FORMAT PARQUET)")
    log(f'Dataset exported to {filepath}')


def _escape_string_literal(string: str) -> str:
  string = string.replace("'", "''")
  return f"'{string}'"


def _escape_col_name(col_name: str) -> str:
  col_name = col_name.replace('"', '""')
  return f'"{col_name}"'


def _escape_like_value(value: str) -> str:
  value = value.replace('%', '\\%').replace('_', '\\_')
  return f"'%{value}%' ESCAPE '\\'"


def _inner_select(sub_paths: list[PathTuple],
                  inner_var: Optional[str] = None,
                  empty: bool = False,
                  span_from: Optional[PathTuple] = None) -> str:
  """Recursively generate the inner select statement for a list of sub paths."""
  current_sub_path = sub_paths[0]
  lambda_var = inner_var + 'x' if inner_var else 'x'
  if not inner_var:
    lambda_var = 'x'
    inner_var = _escape_col_name(current_sub_path[0])
    current_sub_path = current_sub_path[1:]
  # Select the path inside structs. E.g. x['a']['b']['c'] given current_sub_path = [a, b, c].
  path_key = inner_var + ''.join([f'[{_escape_string_literal(p)}]' for p in current_sub_path])
  if len(sub_paths) == 1:
    if span_from:
      derived_col = _select_sql(span_from, flatten=False, unnest=False)
      path_key = (f'{derived_col}[{path_key}.{VALUE_KEY}.{TEXT_SPAN_START_FEATURE}+1:'
                  f'{path_key}.{VALUE_KEY}.{TEXT_SPAN_END_FEATURE}]')
    return 'NULL' if empty else path_key
  return (f'list_transform({path_key}, {lambda_var} -> '
          f'{_inner_select(sub_paths[1:], lambda_var, empty, span_from)})')


def _split_path_into_subpaths_of_lists(leaf_path: PathTuple) -> list[PathTuple]:
  """Split a path into a subpath of lists.

  E.g. [a, b, c, *, d, *, *] gets splits [[a, b, c], [d], [], []].
  """
  sub_paths: list[PathTuple] = []
  offset = 0
  while offset <= len(leaf_path):
    new_offset = leaf_path.index(PATH_WILDCARD,
                                 offset) if PATH_WILDCARD in leaf_path[offset:] else len(leaf_path)
    sub_path = leaf_path[offset:new_offset]
    sub_paths.append(sub_path)
    offset = new_offset + 1
  return sub_paths


def _select_sql(path: PathTuple,
                flatten: bool,
                unnest: bool,
                empty: bool = False,
                span_from: Optional[PathTuple] = None) -> str:
  """Create a select column for a path.

  Args:
    path: A path to a feature. E.g. ['a', 'b', 'c'].
    flatten: Whether to flatten the result.
    unnest: Whether to unnest the result.
    empty: Whether to return an empty list (used for embedding signals that don't need the data).
    span_from: The path this span is derived from. If specified, the span will be resolved
      to a substring of the original string.
  """
  sub_paths = _split_path_into_subpaths_of_lists(path)
  selection = _inner_select(sub_paths, None, empty, span_from)
  # We only flatten when the result of a nested list to avoid segfault.
  is_result_nested_list = len(sub_paths) >= 3  # E.g. subPaths = [[a, b, c], *, *].
  if flatten and is_result_nested_list:
    selection = f'flatten({selection})'
  # We only unnest when the result is a list. // E.g. subPaths = [[a, b, c], *].
  is_result_a_list = len(sub_paths) >= 2
  if unnest and is_result_a_list:
    selection = f'unnest({selection})'
  return selection


def read_source_manifest(dataset_path: str) -> SourceManifest:
  """Read the manifest file."""
  with open_file(os.path.join(dataset_path, MANIFEST_FILENAME), 'r') as f:
    return SourceManifest.parse_raw(f.read())


def _signal_dir(enriched_path: PathTuple) -> str:
  """Get the filename prefix for a signal parquet file."""
  path_without_wildcards = (p for p in enriched_path if p != PATH_WILDCARD)
  return os.path.join(*path_without_wildcards)


def split_column_name(column: str, split_name: str) -> str:
  """Get the name of a split column."""
  return f'{column}.{split_name}'


def split_parquet_prefix(column_name: str, splitter_name: str) -> str:
  """Get the filename prefix for a split parquet file."""
  return f'{column_name}.{splitter_name}'


def _bytes_to_blob_literal(bytes: bytes) -> str:
  """Convert bytes to a blob literal."""
  escaped_hex = re.sub(r'(.{2})', r'\\x\1', bytes.hex())
  return f"'{escaped_hex}'::BLOB"


class SignalManifest(BaseModel):
  """The manifest that describes a signal computation including schema and parquet files."""
  # List of a parquet filepaths storing the data. The paths are relative to the manifest.
  files: list[str]

  # An identifier for this parquet table. Will be used as the view name in SQL.
  parquet_id: str

  data_schema: Schema
  signal: Signal

  # The column path that this signal is derived from.
  enriched_path: PathTuple

  # The filename prefix for the embedding. Present when the signal is an embedding.
  embedding_filename_prefix: Optional[str] = None

  @validator('signal', pre=True)
  def parse_signal(cls, signal: dict) -> Signal:
    """Parse a signal to its specific subclass instance."""
    return resolve_signal(signal)


def _merge_cells(dest_cell: Item, source_cell: Item) -> Item:
  if source_cell is None or isinstance(source_cell, float) and math.isnan(source_cell):
    # Nothing to merge here (missing value).
    return dest_cell
  if isinstance(dest_cell, dict):
    if isinstance(source_cell, list):
      raise ValueError(f'Failed to merge cells. Destination is a dict ({dest_cell!r}), '
                       f'but source is a list ({source_cell!r}).')
    if isinstance(source_cell, dict):
      res = {**dest_cell}
      for key, value in source_cell.items():
        res[key] = (value if key not in dest_cell else _merge_cells(dest_cell[key], value))
      return res
    else:
      return {VALUE_KEY: source_cell, **dest_cell}
  elif isinstance(dest_cell, list):
    if not isinstance(source_cell, list):
      raise ValueError('Failed to merge cells. Destination is a list, but source is not.')
    return [
      _merge_cells(dest_subcell, source_subcell)
      for dest_subcell, source_subcell in zip(dest_cell, source_cell)
    ]
  else:
    # The destination is a primitive.
    if isinstance(source_cell, list):
      raise ValueError(f'Failed to merge cells. Destination is a primitive ({dest_cell!r}), '
                       f'but source is a list ({source_cell!r}).')
    if isinstance(source_cell, dict):
      return {VALUE_KEY: dest_cell, **source_cell}
    else:
      # Primitives can be merged together if they are equal. This can happen if a user selects a
      # column that is the child of another.
      # NOTE: This can be removed if we fix https://github.com/lilacai/lilac/issues/166.
      if source_cell != dest_cell:
        raise ValueError(f'Cannot merge source "{source_cell!r}" into destination "{dest_cell!r}"')
      return dest_cell


def merge_series(destination: pd.Series, source: pd.Series) -> list[Item]:
  """Merge two series of values recursively."""
  return _merge_cells(destination.tolist(), source.tolist())


def _unique_alias(column: Column) -> str:
  """Get a unique alias for a selection column."""
  if column.signal_udf:
    return make_parquet_id(column.signal_udf, column.path)
  return '.'.join(map(str, column.path))


def _path_contains(parent_path: PathTuple, child_path: PathTuple) -> bool:
  """Check if a path contains another path."""
  if len(parent_path) > len(child_path):
    return False
  return all(parent_path[i] == child_path[i] for i in range(len(parent_path)))


def _path_to_udf_duckdb_path(path: PathTuple,
                             path_to_udf_col_name: dict[PathTuple, str]) -> Optional[PathTuple]:
  first_subpath, *rest_of_path = path
  for parent_path, udf_col_name in path_to_udf_col_name.items():
    # If the user selected udf(document.*.text) as "udf" and wanted to sort by "udf.len", we need to
    # sort by "udf.*.len" where the "*" came from the fact that the udf was applied to a list of
    # "text" fields.
    wildcards = [x for x in parent_path if x == PATH_WILDCARD]
    if _path_contains(parent_path, path):
      return (udf_col_name, *wildcards, *path[len(parent_path):])
    elif first_subpath == udf_col_name:
      return (udf_col_name, *wildcards, *rest_of_path)

  return None


def _col_destination_path(column: Column, is_computed_signal: Optional[bool] = False) -> PathTuple:
  """Get the destination path where the output of this selection column will be stored."""
  source_path = column.path

  if not column.signal_udf:
    return source_path

  signal_key = column.signal_udf.key(is_computed_signal=is_computed_signal)
  # If we are enriching a value we should store the signal data in the value's parent.
  if source_path[-1] == VALUE_KEY:
    dest_path = (*source_path[:-1], signal_key)
  else:
    dest_path = (*source_path, signal_key)

  return dest_path


def _root_column(manifest: SignalManifest) -> str:
  """Returns the root column of a signal manifest."""
  field_keys = manifest.data_schema.fields.keys()
  if len(field_keys) != 2:
    raise ValueError('Expected exactly two fields in signal manifest, '
                     f'the row UUID and root this signal is enriching. Got {field_keys}.')
  return next(filter(lambda field: field != UUID_COLUMN, manifest.data_schema.fields.keys()))


def _derived_from_path(path: PathTuple, schema: Schema) -> PathTuple:
  # Find the closest parent of `path` that is a signal root.
  for i in reversed(range(len(path))):
    sub_path = path[:i]
    if schema.get_field(sub_path).signal is not None:
      # Skip the signal name at the end to get the source path that was enriched.
      return sub_path[:-1]
  raise ValueError('Cannot find the source path for the enriched path: {path}')


def _make_schema_from_path(path: PathTuple, field: Field) -> Schema:
  """Returns a schema that contains only the given path."""
  for sub_path in reversed(path):
    if sub_path == PATH_WILDCARD:
      field = Field(repeated_field=field)
    else:
      field = Field(fields={sub_path: field})
  if not field.fields:
    raise ValueError(f'Invalid path: {path}. Must contain at least one field name.')
  return Schema(fields=field.fields)


def _replace_nan_with_none(df: pd.DataFrame) -> pd.DataFrame:
  """DuckDB returns np.nan for missing field in string column, replace with None for correctness."""
  # TODO(https://github.com/duckdb/duckdb/issues/4066): Remove this once duckdb fixes upstream.
  for col in df.columns:
    if is_object_dtype(df[col]):
      df[col].replace(np.nan, None, inplace=True)
  return df


def _offset_any_span(offset: int, item: Item, schema: Field) -> None:
  """Offsets any spans inplace by the given parent offset."""
  if schema.dtype == DataType.STRING_SPAN:
    item = cast(dict, item)
    item[VALUE_KEY][TEXT_SPAN_START_FEATURE] += offset
    item[VALUE_KEY][TEXT_SPAN_END_FEATURE] += offset
  if schema.fields:
    item = cast(dict, item)
    for key, sub_schema in schema.fields.items():
      _offset_any_span(offset, item[key], sub_schema)
  if schema.repeated_field:
    item = cast(list, item)
    for sub_item in item:
      _offset_any_span(offset, sub_item, schema.repeated_field)


def _schema_has_spans(field: Field) -> bool:
  if field.dtype and field.dtype == DataType.STRING_SPAN:
    return True
  if field.fields:
    children_have_spans = any(_schema_has_spans(sub_field) for sub_field in field.fields.values())
    if children_have_spans:
      return True
  if field.repeated_field:
    return _schema_has_spans(field.repeated_field)
  return False


def _normalize_bins(bins: Optional[Union[Sequence[Bin], Sequence[float]]]) -> Optional[list[Bin]]:
  if bins is None:
    return None
  if not isinstance(bins[0], (float, int)):
    return cast(list[Bin], bins)
  named_bins: list[Bin] = []
  for i in range(len(bins) + 1):
    start = cast(float, bins[i - 1]) if i > 0 else None
    end = cast(float, bins[i]) if i < len(bins) else None
    named_bins.append((str(i), start, end))
  return named_bins


def _auto_bins(stats: StatsResult, num_bins: int) -> list[Bin]:
  min_val = cast(float, stats.min_val)
  max_val = cast(float, stats.max_val)
  bin_width = (max_val - min_val) / num_bins
  bins: list[Bin] = []
  for i in range(num_bins):
    start = None if i == 0 else min_val + i * bin_width
    end = None if i == num_bins - 1 else min_val + (i + 1) * bin_width
    bins.append((str(i), start, end))
  return bins


def _settings_filepath(namespace: str, dataset_name: str) -> str:
  return os.path.join(
    get_dataset_output_dir(data_path(), namespace, dataset_name), DATASET_SETTINGS_FILENAME)