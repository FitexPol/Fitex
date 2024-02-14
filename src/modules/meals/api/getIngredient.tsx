import { Elysia } from 'elysia';

import { MealForm } from '../components/MealForm';
import { getIngredientOptions } from '../utils/getIngredientOptions';

export const getIngredient = new Elysia().get('/ingredient', async () => {
  const ingredientOptions = await getIngredientOptions();

  return <MealForm.Ingredient ingredientOptions={ingredientOptions} />;
});
