import { Elysia } from 'elysia';

import { context } from '@/context';
import { Document } from '@components/_Document';
import { UpdateProductForm } from '@components/forms/UpdateProductForm';
import { FormSection } from '@components/sections/FormSection';
import { ShoppingList } from '@shopping-lists/models/shoppingList';
import { $t } from '@utils/$t';
import { getPath } from '@utils/getPath';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';

export const productFormPage = new Elysia()
  .use(context)
  .get('/product-form', async ({ params: { id }, user, query: { productId } }) => {
    const shoppingListDoc = await ShoppingList.findById(id).exec();

    if (!shoppingListDoc) {
      return (
        <Document user={user}>
          <span>{$t('_errors.notFound')}</span>
        </Document>
      );
    }

    if (!shoppingListDoc.author._id.equals(user!.id)) {
      return (
        <Document user={user}>
          <span>{$t('_errors.permissionDenied')}</span>
        </Document>
      );
    }

    const productDoc = shoppingListDoc.products.find((productDoc) =>
      productDoc._id.equals(getQueryParamSecure(productId)),
    );

    return (
      <Document user={user}>
        <FormSection title={shoppingListDoc.name} floatingLinkHref={`/shopping-lists/${id}`}>
          {productDoc ? (
            <UpdateProductForm
              productDoc={productDoc}
              endpoint={getPath(`/api/shopping-lists/${id}/products/${productDoc.id}`)}
            />
          ) : (
            <span>{$t('_errors.notFound')}</span>
          )}
        </FormSection>
      </Document>
    );
  });
