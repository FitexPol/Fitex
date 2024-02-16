export function getQueryParamSecure(query: unknown): string {
  if (!query) return '';
  if (Array.isArray(query)) return `${query[0]}`;
  return `${query}`;
}
