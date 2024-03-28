export function getQueryParamSecure(query: unknown): string {
  if (query === undefined) return '';
  if (Array.isArray(query)) return query.length > 0 ? `${query[0]}` : '';
  return `${query}`;
}
