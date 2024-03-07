import { type JWTUser } from '@auth/models/user';
import { Tiles } from '@components/Tiles';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';

import { ShoppingListCard } from './ShoppingListCard';
import { ShoppingList } from '../models/shoppingList';

const _t = $t('shoppingLists');

type MealsSectionProps = {
  user: JWTUser;
};

export async function FavoriteShoppingListsSection({ user }: ComponentProps<MealsSectionProps>) {
  const shoppingListDocs = await ShoppingList.find({ author: user.id, isFavorite: true })
    .limit(15)
    .sort({ creationDate: -1 })
    .populate('meals.meal')
    .exec();

  return (
    <section id="favorite-meals-section">
      <h2 class="text-xl">{_t('favoriteShoppingListsSection.title')}</h2>

      <Tiles count={shoppingListDocs.length} noResultsMessage={_t('favoriteShoppingListsSection.noResults')}>
        <>
          {shoppingListDocs.map((shoppingListDoc) => (
            <Tiles.Item>
              <ShoppingListCard shoppingListDoc={shoppingListDoc} />
            </Tiles.Item>
          ))}
        </>
      </Tiles>
    </section>
  );
}
