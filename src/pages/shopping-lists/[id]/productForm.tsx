import { Elysia } from 'elysia';

import { Document } from '@components/_Document';
import { UpdateProductForm } from '@components/forms/UpdateProductForm';
import { FormSection } from '@components/sections/FormSection';
import { $t } from '@utils/$t';
import { getPath } from '@utils/getPath';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';

import { shoppingListContext } from './context';

export const productFormPage = new Elysia()
  .use(shoppingListContext)
  .get('/product-form', async ({ shoppingListDoc, user, query: { productId } }) => {
    const productDoc = shoppingListDoc.products.find((productDoc) =>
      productDoc._id.equals(getQueryParamSecure(productId)),
    );

    return (
      <Document user={user}>
        <FormSection title={shoppingListDoc.name} floatingLinkHref={`/shopping-lists/${shoppingListDoc.id}`}>
          {productDoc ? (
            <UpdateProductForm
              user={user}
              productDoc={productDoc}
              endpoint={getPath(`/api/shopping-lists/${shoppingListDoc.id}/products/${productDoc.id}`)}
            />
          ) : (
            <span>{$t('_errors.notFound')}</span>
          )}
        </FormSection>
      </Document>
    );
  });
