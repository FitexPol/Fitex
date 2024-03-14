import { Elysia } from 'elysia';

import { context } from '@/context';
import { Document } from '@components/_Document';
import { FormSection } from '@components/sections/FormSection';
import { UpdateProductForm } from '@products/components/forms/UpdateProductForm';
import { ShoppingList } from '@shopping-lists/models/shoppingList';
import { $t } from '@utils/$t';
import { getPath } from '@utils/getPath';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';

const _t = $t('shoppingLists');

export const productFormPage = new Elysia()
  .use(context)
  .get('/product-form', async ({ params: { id }, user, query }) => {
    const shoppingListDoc = await ShoppingList.findById(id).exec();

    if (!shoppingListDoc) {
      return (
        <Document user={user}>
          <span>{_t('_shared.errors.notFound')}</span>
        </Document>
      );
    }

    if (!shoppingListDoc.author._id.equals(user!.id)) {
      return (
        <Document user={user}>
          <span>{_t('_shared.errors.permissionDenied')}</span>
        </Document>
      );
    }

    const productDoc = shoppingListDoc.products.find((productDoc) =>
      productDoc._id.equals(getQueryParamSecure(query.productId)),
    );

    return (
      <Document user={user}>
        <FormSection title={shoppingListDoc.name}>
          {productDoc ? (
            <UpdateProductForm
              productDoc={productDoc}
              endpoint={getPath(`/api/shopping-lists/${id}/products/${productDoc.id}`)}
            />
          ) : (
            <span>{_t('_shared.errors.notFound')}</span>
          )}
        </FormSection>
      </Document>
    );
  });
