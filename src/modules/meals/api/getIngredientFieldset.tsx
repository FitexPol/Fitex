import { Elysia } from 'elysia';

import { MealForm } from '../components/MealForm';
import { getIngredientOptions } from '../utils/getIngredientOptions';

export const getIngredientFieldset = new Elysia().get('/ingredient-fieldset', () => {
  const ingredientOptions = getIngredientOptions();

  return <MealForm.IngredientFieldset ingredientOptions={ingredientOptions} />;
});
