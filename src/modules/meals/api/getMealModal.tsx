import { Elysia } from 'elysia';

import { context } from '@/context';
import { Modal } from '@components/Modal';
import { HxEvent, HxResponseHeader } from '@vars';

import { MealForm } from '../components/MealForm';
import { Meal } from '../models/meal';

export const getMealModal = new Elysia().use(context).get('/modal', async ({ set, query, user }) => {
  set.headers = {
    [HxResponseHeader.TriggerAfterSwap]: HxEvent.ShowModal,
  };

  if (!query.mealId) {
    return (
      <Modal title="Create meal">
        <MealForm />
      </Modal>
    );
  }

  const mealDoc = await Meal.findById(query.mealId).exec();

  if (!mealDoc) {
    set.status = 'Not Found';

    throw new Error('Meal not found');
  }

  if (!mealDoc.author._id.equals(user!.id)) {
    set.status = 'Forbidden';
    throw new Error('You are not authorized to get this meal');
  }

  return (
    <Modal title={mealDoc.name}>
      <MealForm meal={mealDoc} />
    </Modal>
  );
});
