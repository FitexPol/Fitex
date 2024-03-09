import { type JWTUser } from '@auth/models/user';
import { Tiles } from '@components/Tiles';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';

import { MealCard } from './MealCard';
import { Meal } from '../models/meal';

const _t = $t('meals');

type MealsSectionProps = {
  user: JWTUser;
};

export async function FavoriteMealsSection({ user }: ComponentProps<MealsSectionProps>) {
  const mealDocs = await Meal.find({ author: user.id, isFavorite: true })
    .limit(15)
    .sort({ creationDate: -1 })
    .exec();

  return (
    <section id="favorite-meals-section">
      <h2 class="text-xl">{_t('favoriteMealsSection.title')}</h2>

      <Tiles count={mealDocs.length} noResultsMessage={_t('favoriteMealsSection.noResults')}>
        <>
          {mealDocs.map((mealDoc) => (
            <Tiles.Item>
              <MealCard mealDoc={mealDoc} />
            </Tiles.Item>
          ))}
        </>
      </Tiles>
    </section>
  );
}
