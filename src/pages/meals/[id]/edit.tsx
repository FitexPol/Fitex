import { Elysia } from 'elysia';

import { context } from '@/context';
import { Document } from '@components/_Document';
import { MealEditSection } from '@meals/components/MealEditSection';
import { Meal } from '@meals/models/meal';
import { $t } from '@utils/$t';

const _t = $t('meals');

export const mealEditPage = new Elysia().use(context).get('/edit', async ({ user, params: { id } }) => {
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

  return (
    <Document user={user}>
      <MealEditSection user={user!} mealDoc={mealDoc} />
    </Document>
  );
});
