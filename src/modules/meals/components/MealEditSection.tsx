import { icons } from 'feather-icons';

import { type JWTUser } from '@auth/models/user';
import { Link } from '@components/Link';
import { EditSection } from '@components/sections/EditSection';
import { AddProductForm } from '@products/components/forms/AddProductForm';
import { ProductsTable } from '@products/components/ProductsTable';
import type { ComponentProps } from '@types';
import { $t } from '@utils/$t';
import { getPath } from '@utils/getPath';

import { type MealDoc } from '../models/meal';

const _t = $t('meals');

type MealEditSectionProps = {
  user: JWTUser;
  mealDoc: MealDoc;
};

export function MealEditSection({ user, mealDoc }: ComponentProps<MealEditSectionProps>) {
  const basicInformation = [
    { label: 'Nazwa', value: mealDoc.name },
    { label: 'Opis', value: mealDoc.description },
  ];

  return (
    <EditSection title={_t('mealEditSection.title')}>
      <>
        <EditSection.Group
          title="Podstawowe informacje"
          customElement={
            <Link href={getPath(`/meals/basic-information-form`, { mealId: mealDoc.id })}>
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
            <AddProductForm user={user} endpoint={`/api/meals/${mealDoc.id}/products`} class="mt-2" />

            <ProductsTable
              products={mealDoc.products}
              actionPaths={{
                edit: `/meals/${mealDoc.id}/product-form`,
                delete: `/api/meals/${mealDoc.id}/products`,
              }}
            />
          </>
        </EditSection.Group>
      </>
    </EditSection>
  );
}
