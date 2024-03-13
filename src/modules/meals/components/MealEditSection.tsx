import { icons } from 'feather-icons';

import { type JWTUser } from '@auth/models/user';
import { Card } from '@components/Card';
import { Link } from '@components/Link';
import { AddProduct } from '@products/components/forms/AddProduct';
import { ProductsTable } from '@products/components/ProductsTable';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';
import { getPath } from '@utils/getPath';

import { Meal } from '../models/meal';

const _t = $t('meals');

type MealEditSectionProps = {
  user: JWTUser;
  mealId: string;
};

export async function MealEditSection({ user, mealId }: ComponentProps<MealEditSectionProps>) {
  const mealDoc = await Meal.findById(mealId).exec();

  if (!mealDoc) {
    return <span>{_t('_shared.errors.notFound')}</span>;
  }

  if (!mealDoc.author._id.equals(user.id)) {
    return <span>{_t('_shared.errors.permissionDenied')}</span>;
  }

  return (
    <section id="meal-edit-section">
      <Card>
        <>
          <Card.Header title={<h1 class="mb-0 text-2xl">{_t('mealEditSection.title')}</h1>} />

          <Group
            title="Podstawe informacje"
            editElement={
              <Link href={getPath(`/meals/basic-information-form`, { mealId })}>
                {icons['edit-2'].toSvg({ class: 'w-5 h-5' })}
              </Link>
            }
          >
            <ul class="mt-1">
              <li class="text-sm">
                <strong>Nazwa:</strong> {mealDoc.name}
              </li>
              <li class="text-sm">
                <strong>Opis:</strong> {mealDoc.description}
              </li>
            </ul>
          </Group>

          <Group title="Produkty">
            <>
              <AddProduct user={user} endpoint={`/api/meals/${mealId}/products`} class="mt-2" />

              <ProductsTable
                products={mealDoc.products}
                actionPaths={{
                  edit: `/meals/${mealId}/product-form`,
                  delete: `/api/meals/${mealId}/products`,
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
