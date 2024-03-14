import { Elysia } from 'elysia';

import { context } from '@/context';
import { Document } from '@components/_Document';
import { FormSection } from '@components/sections/FormSection';
import { BasicInformationForm } from '@meals/components/forms/BasicInformationForm';
import { Meal } from '@meals/models/meal';
import { $t } from '@utils/$t';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';

const _t = $t('meals');

export const basicInformationFormPage = new Elysia()
  .use(context)
  .get('/basic-information-form', async ({ user, query }) => {
    if (!query.id) {
      return (
        <Document user={user}>
          <FormSection title={_t('basicInformationFormPage.title')}>
            <BasicInformationForm />
          </FormSection>
        </Document>
      );
    }

    const mealDoc = await Meal.findById(getQueryParamSecure(query.id)).exec();

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
        <FormSection title={mealDoc.name}>
          <BasicInformationForm mealDoc={mealDoc} />
        </FormSection>
      </Document>
    );
  });
