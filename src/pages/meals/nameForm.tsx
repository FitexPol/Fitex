import { Elysia } from 'elysia';

import { NameForm } from '@/modules/meals/components/forms/NameForm';
import { Document } from '@components/_Document';
import { FormSection } from '@components/sections/FormSection';
import { Meal } from '@meals/models/meal';
import { $t } from '@utils/$t';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';

import { userContext } from '../context';

export const nameFormPage = new Elysia().use(userContext).get('/name-form', async ({ user, query }) => {
  if (!query.id) {
    return (
      <Document user={user}>
        <FormSection title={$t('meals.createMeal')} floatingLinkHref="/meals">
          <NameForm />
        </FormSection>
      </Document>
    );
  }

  const mealDoc = await Meal.findById(getQueryParamSecure(query.id)).exec();

  if (!mealDoc) {
    return (
      <Document user={user}>
        <span>{$t('_errors.notFound')}</span>
      </Document>
    );
  }

  if (!mealDoc.author._id.equals(user.id)) {
    return (
      <Document user={user}>
        <span>{$t('_errors.permissionDenied')}</span>
      </Document>
    );
  }

  return (
    <Document user={user}>
      <FormSection title={mealDoc.name} floatingLinkHref={`/meals/${mealDoc.id}`}>
        <NameForm mealDoc={mealDoc} />
      </FormSection>
    </Document>
  );
});
