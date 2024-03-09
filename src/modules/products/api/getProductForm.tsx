import { Elysia } from 'elysia';

import { context } from '@/context';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';

import { ProductFieldset } from '../components/ProductFieldset';
import { type Product, Unit } from '../models/product';

export const getProductFieldset = new Elysia().use(context).get('/fieldset', ({ query }) => {
  const product: Product = {
    name: getQueryParamSecure(query.name),
    quantity: 1,
    unit: Unit.Unit,
  };

  return (
    <li>
      <ProductFieldset product={product} />
    </li>
  );
});
