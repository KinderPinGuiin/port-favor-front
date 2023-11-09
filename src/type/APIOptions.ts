/**
 * Custom options that can be used inside of the API hooks (useApi, useApiMutation).
 */
type APIOptions = {
  /**
   * The query key associated to the sent request (used for caching, invalidating...).
   */
  queryKey?: string | any[],

  /**
   * Custom headers to send with the request.
   */
  headers?: Record<string, any>,

  /**
   * The queries to invalidate after a mutation (only used by useApiMutation).
   */
  invalidateQueries?: string[],
}

export default APIOptions;
