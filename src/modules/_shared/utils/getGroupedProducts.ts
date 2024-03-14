import { type ProductDoc } from '../models/product';

export function getGroupedProducts(items: ProductDoc[]): typeof items {
  if (items.length === 0) return [];

  const groupedProducts = items.reduce(
    (acc, productDoc) => {
      const nameCopy = productDoc.name;
      nameCopy.toLocaleLowerCase().trim();

      const key = `${nameCopy}.${productDoc.unit}`;

      acc[key] ? (acc[key].quantity += productDoc.quantity) : (acc[key] = productDoc);

      return acc;
    },
    {} as Record<string, ProductDoc>,
  );

  return Object.values(groupedProducts);
}
