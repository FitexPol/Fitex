import { type Unit } from '@vars';

import { Product, type ProductDoc } from '../models/product';

export async function getProductsById(
  productsBody: { productId: string; quantity: number, unit: Unit }[],
): Promise<{ product: ProductDoc; quantity: number, unit: Unit }[]> {
  const productDocs = await Product.find({ _id: { $in: productsBody.map(({ productId }) => productId) } });

  return productsBody.reduce(
    (acc, productBody) => {
      const productDoc = productDocs.find(({ id }) => id === productBody.productId);

      if (!productDoc) return acc;

      acc.push({
        product: productDoc,
        quantity: Number(productBody.quantity),
        unit: productBody.unit
      });

      return acc;
    },
    [] as { product: ProductDoc; quantity: number, unit: Unit }[],
  );;
}
