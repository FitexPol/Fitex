import { Elysia } from 'elysia';

import { Document } from '@components/_Document';
import { Breadcrumbs } from '@components/Breadcrumbs';
import { UpdateProductForm } from '@components/forms/UpdateProductForm';
import { CardSection } from '@components/sections/CardSection';
import { PageNotFoundError } from '@errors/PageNotFoundError';
import { getBreadcrumbs } from '@shopping-lists/utils/getBreadcrumbs';
import { getPath } from '@utils/getPath';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';

import { shoppingListContext } from './context';

export const productPage = new Elysia()
  .use(shoppingListContext)
  .get('/product', ({ request, shoppingListDoc, user, query: { productId } }) => {
    const productDoc = shoppingListDoc.products.find((productDoc) =>
      productDoc._id.equals(getQueryParamSecure(productId)),
    );

    if (!productDoc) throw new PageNotFoundError();

    return (
      <Document currentUrl={request.url} user={user}>
        <>
          <Breadcrumbs
            items={getBreadcrumbs([
              { href: `/${shoppingListDoc.id}`, label: shoppingListDoc.name },
              { href: getPath(`/product`, { productId: productDoc.id }), label: productDoc.name },
            ])}
          />

          <CardSection title={shoppingListDoc.name}>
            <UpdateProductForm
              user={user}
              productDoc={productDoc}
              endpoint={getPath(`/api/shopping-lists/${shoppingListDoc.id}/products/${productDoc.id}`)}
            />
          </CardSection>
        </>
      </Document>
    );
  });