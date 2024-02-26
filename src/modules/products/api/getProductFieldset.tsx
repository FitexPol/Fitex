import { Elysia } from 'elysia';

import { ProductFieldset } from '../components/ProductFieldset';
import { getProductOptions } from '../utils/getProductOptions';

export const getProductFieldset = new Elysia().get('/fieldset', async () => {
  const productOptions = await getProductOptions();

  return (
    <li>
      <ProductFieldset productOptions={productOptions} />
    </li>
  );
});
