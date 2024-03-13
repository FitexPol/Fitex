import { Elysia } from 'elysia';

import { context } from '@/context';
import { Document } from '@components/_Document';
import { BasicInformation } from '@meals/components/forms/BasicInformation';
import { MealFormSection } from '@meals/components/MealFormSection';
import { Meal } from '@meals/models/meal';
import { $t } from '@utils/$t';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';

const _t = $t('meals');

export const basicInformationFormPage = new Elysia()
  .use(context)
  .get('/basic-information-form', async ({ user, query }) => {
    if (!query.mealId) {
      return (
        <Document user={user}>
          <MealFormSection>
            <BasicInformation />
          </MealFormSection>
        </Document>
      );
    }

    const mealDoc = await Meal.findById(getQueryParamSecure(query.mealId)).exec();

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

    return (
      <Document user={user}>
        <MealFormSection mealDoc={mealDoc}>
          <BasicInformation mealDoc={mealDoc} />
        </MealFormSection>
      </Document>
    );
  });
