import { type Product } from '@types';

export function getGroupedProducts(items: Product[]): typeof items {
  if (items.length === 0) return [];

  const groupedProducts = items.reduce(
    (acc, { name, quantity, unit }) => {
      const nameCopy = name;
      nameCopy.toLocaleLowerCase().trim();

      const key = `${nameCopy}.${unit}`;

      acc[key] ? (acc[key].quantity += quantity) : (acc[key] = { name, quantity, unit });

      return acc;
    },
    {} as Record<string, Product>,
  );

  return Object.values(groupedProducts);
}
