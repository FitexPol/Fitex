import { Types } from 'mongoose';

import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';

import { type ShoppingListDoc } from '../models/shoppingList';

type IncludedMealsProps = {
  meals: ShoppingListDoc['meals'];
};

export function IncludedMeals({ meals }: ComponentProps<IncludedMealsProps>) {
  const includedMeals = meals.reduce((acc, { meal, quantity }) => {
    if (!meal || meal instanceof Types.ObjectId) return acc;

    const text = quantity > 1 ? `${meal.name} (x${quantity})` : meal.name;

    return acc.length > 0 ? `${acc}, ${text}` : text;
  }, '');

  return (
    <small class="text-xs">
      * {$t('shoppingLists.includedMeals')}: {includedMeals}
    </small>
  );
}
