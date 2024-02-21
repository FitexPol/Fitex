import { Elysia } from 'elysia';

import { IngredientFieldset } from '@components/IngredientFieldset';
import { getIngredientOptions } from '@utils/getIngredientOptions';

import { shoppingListForm } from '../forms';

export const getIngredientFieldset = new Elysia().get('/ingredient-fieldset', () => {
  const ingredientOptions = getIngredientOptions();

  return (
    <li>
      <IngredientFieldset controls={shoppingListForm.ingredients} ingredientOptions={ingredientOptions} />
    </li>
  );
});
