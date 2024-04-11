import { Elysia, t } from 'elysia';

import { Document } from '@components/_Document';
import { UpdateProductForm } from '@components/forms/UpdateProductForm';
import { CardSection } from '@components/sections/CardSection';
import { PageNotFoundError } from '@errors/PageNotFoundError';
import { MealBreadcrumbs } from '@meals/components/MealBreadcrumbs';
import { getPath } from '@utils/getPath';

import { mealContext } from './context';

export const productPage = new Elysia().use(mealContext).get(
  '/product',
  ({ request, mealDoc, user, query: { productId } }) => {
    const productDoc = mealDoc.products.find((productDoc) => productDoc._id.equals(productId));

    if (!productDoc) throw new PageNotFoundError();

    return (
      <Document currentUrl={request.url} user={user}>
        <MealBreadcrumbs
          items={[
            { href: `/${mealDoc.id}`, label: mealDoc.name },
            { href: getPath('/product', { productId: productDoc.id }), label: productDoc.name },
          ]}
        />

        <CardSection title={mealDoc.name}>
          <UpdateProductForm
            user={user}
            productDoc={productDoc}
            endpoint={getPath(`/api/meals/${mealDoc.id}/products/${productDoc.id}`)}
          />
        </CardSection>
      </Document>
    );
  },
  {
    query: t.Object({
      productId: t.String(),
    }),
  },
);
