import { Elysia } from 'elysia';

import { context } from '@/context';
import { Document } from '@components/_Document';
import { FormSection } from '@components/sections/FormSection';
import { Meal } from '@meals/models/meal';
import { UpdateProductForm } from '@products/components/forms/UpdateProductForm';
import { $t } from '@utils/$t';
import { getPath } from '@utils/getPath';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';

const _t = $t('meals');

export const productFormPage = new Elysia()
  .use(context)
  .get('/product-form', async ({ params: { id }, user, query }) => {
    const mealDoc = await Meal.findById(id).exec();

    if (!mealDoc) {
      return (
        <Document user={user}>
          <span>{_t('_shared.errors.notFound')}</span>
        </Document>
      );
    }

    if (!mealDoc.author._id.equals(user!.id)) {
      return (
        <Document user={user}>
          <span>{_t('_shared.errors.permissionDenied')}</span>
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
            <span>{_t('_shared.errors.notFound')}</span>
          )}
        </FormSection>
      </Document>
    );
  });
