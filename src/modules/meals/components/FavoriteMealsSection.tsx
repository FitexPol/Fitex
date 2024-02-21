import { type User } from '@auth/models/user';
import { Tiles } from '@components/Tiles';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';

import { MealCard } from './MealCard';
import { Meal } from '../models/meal';

const _t = $t('meals');

type MealsSectionProps = {
  user: User;
};

export async function FavoriteMealsSection({ user }: ComponentProps<MealsSectionProps>) {
  const mealDocs = await Meal.find({ author: user.id, isFavorite: true })
    .limit(15)
    .sort({ creationDate: -1 })
    .exec();

  return (
    <section id="favorite-meals-section">
      <div class="mb-6 flex justify-between">
        <div class="flex items-center gap-2">
          <h2>{_t('favoriteMealsSection.title')}</h2>
        </div>
      </div>

      <Tiles count={mealDocs.length} noResultsMessage={_t('favoriteMealsSection.noResults')}>
        <>
          {mealDocs.map((mealDoc) => (
            <Tiles.Item>
              <MealCard meal={mealDoc} />
            </Tiles.Item>
          ))}
        </>
      </Tiles>
    </section>
  );
}
