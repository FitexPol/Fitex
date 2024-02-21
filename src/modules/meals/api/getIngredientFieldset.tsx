import { Elysia } from 'elysia';

import { IngredientFieldset } from '@components/IngredientFieldset';
import { getIngredientOptions } from '@utils/getIngredientOptions';

import { mealForm } from '../forms';

export const getIngredientFieldset = new Elysia().get('/ingredient-fieldset', () => {
  const ingredientOptions = getIngredientOptions();

  return (
    <li>
      <IngredientFieldset controls={mealForm.ingredients} ingredientOptions={ingredientOptions} />
    </li>
  );
});
