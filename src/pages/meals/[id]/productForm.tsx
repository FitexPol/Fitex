import { Elysia } from 'elysia';

import { Document } from '@components/_Document';
import { UpdateProductForm } from '@components/forms/UpdateProductForm';
import { FormSection } from '@components/sections/FormSection';
import { $t } from '@utils/$t';
import { getPath } from '@utils/getPath';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';

import { mealContext } from './context';

export const productFormPage = new Elysia()
  .use(mealContext)
  .get('/product-form', async ({ mealDoc, user, query: { productId } }) => {
    const productDoc = mealDoc.products.find((productDoc) =>
      productDoc._id.equals(getQueryParamSecure(productId)),
    );

    return (
      <Document user={user}>
        <FormSection title={mealDoc.name} floatingLinkHref={`/meals/${mealDoc.id}`}>
          {productDoc ? (
            <UpdateProductForm
              user={user}
              productDoc={productDoc}
              endpoint={getPath(`/api/meals/${mealDoc.id}/products/${productDoc.id}`)}
            />
          ) : (
            <span>{$t('_errors.notFound')}</span>
          )}
        </FormSection>
      </Document>
    );
  });
