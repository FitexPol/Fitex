import { icons } from 'feather-icons';

import { type JWTUser } from '@auth/models/user';
import { Link } from '@components/Link';
import { EditSection } from '@components/sections/EditSection';
import { AddProductForm } from '@products/components/forms/AddProductForm';
import { ProductsTable } from '@products/components/ProductsTable';
import type { ComponentProps } from '@types';
import { $t } from '@utils/$t';
import { getPath } from '@utils/getPath';

import { type ShoppingListDoc } from '../models/shoppingList';

const _t = $t('shoppingLists');

type ShoppingListEditSectionProps = {
  user: JWTUser;
  shoppingListDoc: ShoppingListDoc;
};

export async function ShoppingListEditSection({
  user,
  shoppingListDoc,
}: ComponentProps<ShoppingListEditSectionProps>) {
  const basicInformation = [{ label: 'Nazwa', value: shoppingListDoc.name }];

  return (
    <EditSection title={_t('shoppingListEditSection.title')}>
      <>
        <EditSection.Group
          title="Podstawowe informacje"
          customElement={
            <Link
              href={getPath(`/shopping-lists/basic-information-form`, { shoppingListId: shoppingListDoc.id })}
            >
              {icons['edit-2'].toSvg({ class: 'w-5 h-5' })}
            </Link>
          }
        >
          <ul class="mt-1">
            {basicInformation.map(({ label, value }) => (
              <li class="text-sm">
                <strong>{label}:</strong> {value}
              </li>
            ))}
          </ul>
        </EditSection.Group>

        <EditSection.Group title="Produkty">
          <>
            <AddProductForm
              user={user}
              endpoint={`/api/shopping-lists/${shoppingListDoc.id}/products`}
              class="mt-2"
            />

            <ProductsTable
              products={shoppingListDoc.products}
              actionPaths={{
                edit: `/shopping-lists/${shoppingListDoc.id}/product-form`,
                delete: `/api/shopping-lists/${shoppingListDoc.id}/products`,
              }}
            />
          </>
        </EditSection.Group>
      </>
    </EditSection>
  );
}
