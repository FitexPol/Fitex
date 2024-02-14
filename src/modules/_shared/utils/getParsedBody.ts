export function getParsedBody<T>(body: Record<string, string | number | boolean>): T {
  const entries = Object.entries(body).map(([key, value]) => {
    if (typeof value !== 'string') return [key, value];

    let parsedValue = value;

    try {
      parsedValue = JSON.parse(value);
    } catch {
      parsedValue = value;
    }

    return [key, parsedValue];
  });

  return Object.fromEntries(entries);
}
