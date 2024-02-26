import { type Unit } from '@vars';

type GroupedProduct = {
  productId: string;
  quantity: number;
  unit: Unit;
};

export function getGroupedProducts(items: GroupedProduct[]): typeof items {
  if (items.length === 0) return [];

  const groupedProducts = items.reduce(
    (acc, { productId, quantity, unit }) => {
      const key = `${productId}.${unit}`;

      acc[key] ? (acc[key].quantity += quantity) : (acc[key] = { productId, quantity, unit });

      return acc;
    },
    {} as Record<string, GroupedProduct>,
  );

  return Object.entries(groupedProducts).map((entry) => entry[1]);
}
