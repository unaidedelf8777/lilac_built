/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A metadata search query on a column.
 */
export type MetadataSearch = {
    path: (Array<string> | string);
    op: ('equals' | 'not_equal' | 'greater' | 'greater_equal' | 'less' | 'less_equal' | 'length_longer' | 'length_shorter' | 'ilike' | 'regex_matches' | 'not_regex_matches' | 'exists' | 'not_exists' | 'in');
    value?: (boolean | number | string | Blob | Array<string> | null);
    type: 'metadata';
};

