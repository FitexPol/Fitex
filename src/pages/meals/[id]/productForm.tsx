import { Elysia } from 'elysia';

import { context } from '@/context';
import { Document } from '@components/_Document';
import { UpdateProductForm } from '@components/forms/UpdateProductForm';
import { FormSection } from '@components/sections/FormSection';
import { Meal } from '@meals/models/meal';
import { $t } from '@utils/$t';
import { getPath } from '@utils/getPath';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';

export const productFormPage = new Elysia()
  .use(context)
  .get('/product-form', async ({ params: { id }, user, query }) => {
    const mealDoc = await Meal.findById(id).exec();

    if (!mealDoc) {
      return (
        <Document user={user}>
          <span>{$t('errors.notFound')}</span>
        </Document>
      );
    }

    if (!mealDoc.author._id.equals(user!.id)) {
      return (
        <Document user={user}>
          <span>{$t('errors.permissionDenied')}</span>
        </Document>
      );
    }

    const productDoc = mealDoc.products.find((productDoc) =>
      productDoc._id.equals(getQueryParamSecure(query.productId)),
    );

    return (
      <Document user={user}>
        <FormSection title={mealDoc.name}>
          {productDoc ? (
            <UpdateProductForm
              productDoc={productDoc}
              endpoint={getPath(`/api/meals/${id}/products/${productDoc.id}`)}
            />
          ) : (
            <span>{$t('errors.notFound')}</span>
          )}
        </FormSection>
      </Document>
    );
  });
