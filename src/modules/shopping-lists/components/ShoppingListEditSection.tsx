import { icons } from 'feather-icons';

import { type JWTUser } from '@auth/models/user';
import { Card } from '@components/Card';
import { Link } from '@components/Link';
import { AddProduct } from '@products/components/forms/AddProduct';
import { ProductsTable } from '@products/components/ProductsTable';
import type { ComponentProps } from '@types';
import { $t } from '@utils/$t';
import { getPath } from '@utils/getPath';

import { ShoppingList } from '../models/shoppingList';

const _t = $t('shoppingLists');

type ShoppingListEditSectionProps = {
  user: JWTUser;
  shoppingListId: string;
};

export async function ShoppingListEditSection({
  user,
  shoppingListId,
}: ComponentProps<ShoppingListEditSectionProps>) {
  const shoppingListDoc = await ShoppingList.findById(shoppingListId).populate('meals.meal').exec();

  if (!shoppingListDoc) {
    return <span>{_t('_shared.errors.notFound')}</span>;
  }

  if (!shoppingListDoc.author._id.equals(user.id)) {
    return <span>{_t('_shared.errors.permissionDenied')}</span>;
  }

  return (
    <section id="shopping-list-edit-section">
      <Card>
        <>
          <Card.Header title={<h1 class="mb-0 text-2xl">{_t('shoppingListEditSection.title')}</h1>} />

          <Group
            title="Podstawe informacje"
            editElement={
              <Link href={getPath(`/shopping-lists/basic-information-form`, { shoppingListId })}>
                {icons['edit-2'].toSvg({ class: 'w-5 h-5' })}
              </Link>
            }
          >
            <ul class="mt-1">
              <li class="text-sm">
                <strong>Nazwa:</strong> {shoppingListDoc.name}
              </li>
            </ul>
          </Group>

          <Group title="Produkty">
            <>
              <AddProduct
                user={user}
                endpoint={`/api/shopping-lists/${shoppingListId}/products`}
                class="mt-2"
              />

              <ProductsTable
                products={shoppingListDoc.products}
                actionPaths={{
                  edit: `/shopping-lists/${shoppingListId}/product-form`,
                  delete: `/api/shopping-lists/${shoppingListId}/products`,
                }}
              />
            </>
          </Group>
        </>
      </Card>
    </section>
  );
}

type GroupProps = {
  title: string;
  editElement?: JSX.Element;
};

function Group({ title, editElement, children }: ComponentProps<GroupProps>) {
  const HComponent = <h2 class="mb-0 text-lg">{title}</h2>;

  return (
    <div class="mb-4 border-b border-solid border-b-pico-muted last-of-type:border-none">
      {editElement ? (
        <div class="flex items-center gap-2">
          {HComponent}
          {editElement}
        </div>
      ) : (
        HComponent
      )}

      {children}
    </div>
  );
}
