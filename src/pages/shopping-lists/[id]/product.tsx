import { Elysia } from 'elysia';

import { Document } from '@components/_Document';
import { UpdateProductForm } from '@components/forms/UpdateProductForm';
import { CardSection } from '@components/sections/CardSection';
import { $t } from '@utils/$t';
import { getPath } from '@utils/getPath';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';

import { shoppingListContext } from './context';

export const productPage = new Elysia()
  .use(shoppingListContext)
  .get('/product', ({ request, shoppingListDoc, user, query: { productId } }) => {
    const productDoc = shoppingListDoc.products.find((productDoc) =>
      productDoc._id.equals(getQueryParamSecure(productId)),
    );

    return (
      <Document currentUrl={request.url} user={user}>
        <CardSection title={shoppingListDoc.name}>
          {productDoc ? (
            <UpdateProductForm
              user={user}
              productDoc={productDoc}
              endpoint={getPath(`/api/shopping-lists/${shoppingListDoc.id}/products/${productDoc.id}`)}
            />
          ) : (
            <span>{$t('_errors.notFound')}</span>
          )}
        </CardSection>
      </Document>
    );
  });
