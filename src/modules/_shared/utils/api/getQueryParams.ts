export function getQueryParams(url: string | null): Record<string, string | undefined> {
  if (!url) return {};

  const queryString = url.split('?')[1];

  if (!queryString) return {};

  const params = queryString.split('&');

  if (params.length === 0) return {};

  return params.reduce(
    (acc, current) => {
      const [key, value] = current.split('=');

      if (acc[key]) return acc;

      return {
        ...acc,
        [key]: value,
      };
    },
    {} as Record<string, string>,
  );
}
