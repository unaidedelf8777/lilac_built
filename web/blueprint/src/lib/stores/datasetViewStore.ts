import {
  ROWID,
  isColumn,
  pathIncludes,
  pathIsEqual,
  serializePath,
  type Column,
  type Filter,
  type LeafValue,
  type LilacSelectRowsSchema,
  type MetadataSearch,
  type Path,
  type Search,
  type SelectRowsOptions,
  type SelectRowsSchemaOptions,
  type SortOrder
} from '$lilac';
import deepEqual from 'deep-equal';
import {getContext, hasContext, setContext} from 'svelte';
import {writable} from 'svelte/store';

const DATASET_VIEW_CONTEXT = 'DATASET_VIEW_CONTEXT';

export interface GroupByState {
  path: Path;
  value: LeafValue;
}

export interface ColumnComparisonState {
  column: Path;
  compareToColumn: Path;
  // True when the diff direction is swapped.
  swapDirection: boolean;
}

export interface TextSelection {
  startLine: number;
  endLine: number;
  startCol: number;
  endCol: number;
}

export interface DatasetViewState {
  namespace: string;
  datasetName: string;

  // Maps a path to whether the stats are expanded.
  expandedStats: {[path: string]: boolean};
  query: SelectRowsOptions;

  // Whether the group by view is active.
  groupBy?: GroupByState;

  // View.
  schemaCollapsed: boolean;
  insightsOpen: boolean;

  // Currently selected rowid. null is a temp state of loading the next page of row ids to find
  // the next row id.
  rowId?: string | null;
  // The currently selected line number and column selection for a given path. Only a single path
  // can be selected at a time.
  selection?: [Path, TextSelection];

  compareColumns: ColumnComparisonState[];
  // TODO: make this better
  showMetadataPanel: boolean;
}

export type DatasetViewStore = ReturnType<typeof createDatasetViewStore>;

export const datasetViewStores: {[key: string]: DatasetViewStore} = {};

export function datasetKey(namespace: string, datasetName: string) {
  return `${namespace}/${datasetName}`;
}

export function defaultDatasetViewState(namespace: string, datasetName: string): DatasetViewState {
  return {
    namespace,
    datasetName,
    expandedStats: {},
    query: {
      // Add * as default field when supported here
      columns: [],
      combine_columns: true
    },
    schemaCollapsed: true,
    insightsOpen: false,
    compareColumns: [],
    showMetadataPanel: false
  };
}

export function createDatasetViewStore(
  namespace: string,
  datasetName: string,
  // Whether the store gets saved to the global dictionary.
  saveGlobally = true
) {
  const defaultState = defaultDatasetViewState(namespace, datasetName);

  const {subscribe, set, update} = writable<DatasetViewState>(
    // Deep copy the initial state so we don't have to worry about mucking the initial state.
    JSON.parse(JSON.stringify(defaultState))
  );

  const store = {
    subscribe,
    set,
    update,
    reset: () => {
      set(JSON.parse(JSON.stringify(defaultState)));
    },
    addExpandedColumn(path: Path) {
      update(state => {
        state.expandedStats[serializePath(path)] = true;
        return state;
      });
    },
    removeExpandedColumn(path: Path) {
      update(state => {
        delete state.expandedStats[serializePath(path)];
        return state;
      });
    },
    addUdfColumn: (column: Column) =>
      update(state => {
        state.query.columns?.push(column);
        return state;
      }),
    removeUdfColumn: (column: Column) =>
      update(state => {
        state.query.columns = state.query.columns?.filter(c => c !== column);
        return state;
      }),
    editUdfColumn: (column: Column) => {
      return update(state => {
        state.query.columns = state.query.columns?.map(c => {
          if (isColumn(c) && pathIsEqual(c.path, column.path)) return column;
          return c;
        });
        return state;
      });
    },
    addSearch: (search: Search) =>
      update(state => {
        state.query.searches = state.query.searches || [];

        // Dedupe searches.
        for (const existingSearch of state.query.searches) {
          if (deepEqual(existingSearch, search)) return state;
        }

        // Remove any sorts if the search is semantic or conceptual.
        if (search.type === 'semantic' || search.type === 'concept') {
          state.query.sort_by = undefined;
          state.query.sort_order = undefined;
        }

        state.query.searches.push(search);
        state.rowId = undefined;
        state.selection = undefined;
        return state;
      }),
    removeSearch: (search: Search, selectRowsSchema?: LilacSelectRowsSchema | null) =>
      update(state => {
        state.query.searches = state.query.searches?.filter(s => !deepEqual(s, search));
        if ((state.query.searches || []).length === 0) {
          state.query.searches = undefined;
        }
        // Clear any explicit sorts by this alias as it will be an invalid sort.
        if (selectRowsSchema?.sorts != null) {
          state.query.sort_by = state.query.sort_by?.filter(sortBy => {
            return !(selectRowsSchema?.sorts || []).some(s => pathIsEqual(s.path, sortBy));
          });
        }
        state.rowId = undefined;
        return state;
      }),
    setSortBy: (column: Path | null) =>
      update(state => {
        if (column == null) {
          state.query.sort_by = undefined;
        } else {
          state.query.sort_by = [column];
        }
        state.rowId = undefined;
        state.selection = undefined;
        return state;
      }),
    setGroupBy(path: Path | null, value: LeafValue) {
      update(state => {
        if (path == null) {
          state.groupBy = undefined;
        } else {
          state.groupBy = {path, value};
        }
        state.rowId = undefined;
        state.selection = undefined;
        return state;
      });
    },
    addSortBy: (column: Path) =>
      update(state => {
        state.query.sort_by = [...(state.query.sort_by || []), column];
        state.rowId = undefined;
        state.selection = undefined;
        return state;
      }),
    removeSortBy: (column: Path) =>
      update(state => {
        state.query.sort_by = state.query.sort_by?.filter(c => !pathIsEqual(c, column));
        state.rowId = undefined;
        state.selection = undefined;
        return state;
      }),
    clearSorts: () =>
      update(state => {
        state.query.sort_by = undefined;
        state.query.sort_order = undefined;
        state.rowId = undefined;
        return state;
      }),
    setSortOrder: (sortOrder: SortOrder | null) =>
      update(state => {
        state.query.sort_order = sortOrder || undefined;
        state.rowId = undefined;
        state.selection = undefined;
        return state;
      }),
    removeFilter: (removedFilter: Filter) =>
      update(state => {
        state.query.filters = state.query.filters?.filter(f => !deepEqual(f, removedFilter));
        if ((state.query.filters || []).length === 0) {
          state.query.filters = undefined;
        }
        state.rowId = undefined;
        state.selection = undefined;
        return state;
      }),
    addFilter: (filter: Filter) =>
      update(state => {
        const filterExists = state.query.filters?.some(f => filterEquals(f, filter));
        if (filterExists) return state;
        state.query.filters = [...(state.query.filters || []), filter];
        state.rowId = undefined;
        state.selection = undefined;
        return state;
      }),
    deleteSignal: (signalPath: Path) =>
      update(state => {
        state.query.filters = state.query.filters?.filter(f => !pathIncludes(signalPath, f.path));
        state.query.sort_by = state.query.sort_by?.filter(p => !pathIncludes(signalPath, p));
        state.rowId = undefined;
        state.selection = undefined;
        return state;
      }),
    deleteConcept(
      namespace: string,
      name: string,
      selectRowsSchema?: LilacSelectRowsSchema | null
    ) {
      function matchesConcept(query: Search) {
        return (
          query.type === 'concept' &&
          query.concept_namespace === namespace &&
          query.concept_name === name
        );
      }
      update(state => {
        const resultPathsToRemove: string[][] = [];
        state.query.searches = state.query.searches?.filter(s => {
          const keep = !matchesConcept(s);
          if (!keep && selectRowsSchema != null && selectRowsSchema.search_results != null) {
            const resultPaths = selectRowsSchema.search_results
              .filter(r => pathIsEqual(r.search_path, s.path))
              .map(r => r.result_path);
            resultPathsToRemove.push(...resultPaths);
          }
          return keep;
        });
        state.query.sort_by = state.query.sort_by?.filter(
          p => !resultPathsToRemove.some(r => pathIsEqual(r, p))
        );
        state.query.filters = state.query.filters?.filter(
          f => !resultPathsToRemove.some(r => pathIsEqual(r, f.path))
        );
        state.rowId = undefined;
        state.selection = undefined;
        return state;
      });
    },
    setInsightsOpen(open: boolean) {
      update(state => {
        state.insightsOpen = open;
        return state;
      });
    },
    setRowId(rowId: string | undefined | null) {
      update(state => {
        state.rowId = rowId;
        state.selection = undefined;
        return state;
      });
    },
    setTextSelection(path: Path, selection: TextSelection) {
      update(state => {
        state.selection = [path, selection];

        return state;
      });
    },
    addCompareColumn(diffCols: [Path, Path]) {
      update(state => {
        const [column, compareToColumn] = diffCols;
        state.compareColumns.push({column, compareToColumn, swapDirection: false});
        return state;
      });
    },
    swapCompareColumn(path: Path) {
      update(state => {
        const compareColumn = state.compareColumns.find(c => pathIsEqual(c.column, path));
        if (compareColumn == null) return state;
        compareColumn.swapDirection = !compareColumn.swapDirection;
        return state;
      });
    },
    removeCompareColumn(path: Path) {
      update(state => {
        state.compareColumns = state.compareColumns.filter(c => !pathIsEqual(c.column, path));
        return state;
      });
    }
  };

  if (saveGlobally) {
    datasetViewStores[datasetKey(namespace, datasetName)] = store;
  }
  return store;
}

export function setDatasetViewContext(store: DatasetViewStore) {
  setContext(DATASET_VIEW_CONTEXT, store);
}

export function getDatasetViewContext() {
  if (!hasContext(DATASET_VIEW_CONTEXT)) throw new Error('DatasetViewContext not found');
  return getContext<DatasetViewStore>(DATASET_VIEW_CONTEXT);
}

/**
 * Get the options to pass to the selectRows API call
 * based on the current state of the dataset view store
 */
export function getSelectRowsOptions(
  viewState: DatasetViewState,
  implicitSortByRowId?: boolean
): SelectRowsOptions {
  const columns = ['*', ROWID, ...(viewState.query.columns ?? [])];
  // Deep clone the query so we don't mutate the original.
  const options: SelectRowsOptions = JSON.parse(JSON.stringify(viewState.query));
  // If we are not sorting explicitly, and not searching for a concept or semantic, sort by rowid
  // to get stable results.
  if (implicitSortByRowId) {
    if (
      options.sort_by == null &&
      !options.searches?.find(v => v.type == 'concept' || v.type == 'semantic')
    ) {
      options.sort_by = [ROWID];
    }
  }
  if (viewState.groupBy?.value != null) {
    options.searches = options.searches || [];
    options.searches.push({
      path: viewState.groupBy.path,
      op: 'equals',
      value: viewState.groupBy.value,
      type: 'metadata'
    } as MetadataSearch);
  }
  return {
    ...options,
    columns
  };
}

export function getSelectRowsSchemaOptions(
  datasetViewStore: DatasetViewState
): SelectRowsSchemaOptions {
  const options = getSelectRowsOptions(datasetViewStore, true /* implicitSortByRowId */);
  return {
    columns: options.columns,
    searches: options.searches,
    combine_columns: options.combine_columns,
    sort_by: options.sort_by,
    sort_order: options.sort_order
  };
}

/** Returns if two filters are equall. */
function filterEquals(f1: Filter, f2: Filter): boolean {
  return f1.op == f2.op && f1.value == f2.value && pathIsEqual(f1.path, f2.path);
}
