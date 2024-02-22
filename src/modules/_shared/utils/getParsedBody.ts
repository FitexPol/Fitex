export function getParsedBody<T>(body: Record<string, string | number | boolean>): T {
  const entries = Object.entries(body).map(([key, value]) => {
    if (typeof value !== 'string' || value === '') return [key, value];

    const valueAsNumber = Number(value);

    if (!isNaN(valueAsNumber)) return [key, valueAsNumber];

    let parsedValue: string | Record<string, string | number>[] = value;

    try {
      parsedValue = JSON.parse(value);
    } catch {
      parsedValue = value;
    }

    if (!Array.isArray(parsedValue)) return [key, parsedValue];

    parsedValue = parsedValue.map((item) => {
      const entries = Object.entries(item).map(([itemKey, itemValue]) => {
        if (typeof itemValue !== 'string' || itemValue === '') return [itemKey, itemValue];

        const itemValueAsNumber = Number(itemValue);

        return !isNaN(itemValueAsNumber) ? [itemKey, itemValueAsNumber] : [itemKey, itemValue];
      });

      return Object.fromEntries(entries);
    });

    return [key, parsedValue];
  });

  return Object.fromEntries(entries);
}
