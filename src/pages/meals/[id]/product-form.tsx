import { Elysia } from 'elysia';

import { context } from '@/context';
import { Document } from '@components/_Document';
import { MealFormSection } from '@meals/components/MealFormSection';
import { Meal } from '@meals/models/meal';
import { UpdateProduct } from '@products/components/forms/UpdateProduct';
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
        <MealFormSection mealDoc={mealDoc}>
          {productDoc ? (
            <UpdateProduct
              productDoc={productDoc}
              endpoint={getPath(`/api/meals/${id}/products/${productDoc.id}`)}
            />
          ) : (
            <span>{_t('_shared.errors.notFound')}</span>
          )}
        </MealFormSection>
      </Document>
    );
  });
