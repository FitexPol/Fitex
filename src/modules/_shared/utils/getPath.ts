export function getPath(path: string, query?: Record<string, string | undefined>): string {
  if (!query) return path;

  const filteredQuery = Object.entries(query).reduce(
    (acc, [key, value]) => {
      if (value) {
        acc[key] = value;
      }

      return acc;
    },
    {} as Record<string, string>,
  );

  const queryStr = new URLSearchParams(filteredQuery).toString();

  return queryStr ? `${path}?${queryStr}` : path;
}
