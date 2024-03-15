import { icons } from 'feather-icons';

import { type JWTUser } from '@auth/models/user';
import { Meal } from '@meals/models/meal';
import { ShoppingList } from '@shopping-lists/models/shoppingList';

import { addProductForm } from '../../forms/addProduct';
import type { BasePath, ComponentProps, Entity } from '../../types';
import { $t } from '../../utils/$t';
import { getPath } from '../../utils/getPath';
import { Button } from '../Button';
import { Card } from '../Card';
import { FloatingLink } from '../FloatingLink';
import { Input } from '../inputs/Input';
import { Link } from '../Link';
import { ProductsTable } from '../ProductsTable';

type EditSectionProps<T extends Entity> = {
  title: string;
  basePath: BasePath;
  entity: T;
  basicInformation: { label: string; value: string }[];
  user: JWTUser;
};

export async function EditSection<T extends Entity>({
  title,
  basePath,
  entity,
  basicInformation,
  user,
  children,
}: ComponentProps<EditSectionProps<T>>) {
  const productNames: Record<string, string> = {};
  const shoppingListDocs = await ShoppingList.find({ author: user.id });
  const mealDocs = await Meal.find({ author: user.id });

  shoppingListDocs.forEach(({ products }) => {
    products.forEach(({ name }) => {
      productNames[name] = name;
    });
  });

  mealDocs.forEach(({ products }) => {
    products.forEach(({ name }) => {
      productNames[name] = name;
    });
  });

  return (
    <section class="mb-10">
      <Card>
        <>
          <Card.Header title={<h1 class="mb-0 text-2xl">{title}</h1>} />

          <Group
            title={$t('basicInformation')}
            customElement={
              <Link href={getPath(`/${basePath}/basic-information-form`, { id: entity.id })}>
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
          </Group>

          <Group title={$t('products')}>
            <>
              <form
                class="mt-2 grid !grid-cols-12"
                hx-post={`/api/${basePath}/${entity.id}/products`}
                hx-target="#products"
                hx-swap="outerHTML"
                hx-on--after-request="this.reset()"
                hx-indicator="#loader"
              >
                <Input
                  control={addProductForm.name}
                  label={$t('addProduct.label')}
                  placeholder={$t('addProduct.placeholder')}
                  datalist={{ id: 'products-datalist', options: Object.values(productNames) }}
                  class="col-span-10 sm:col-span-11"
                />

                <Button type="submit" class="pico-reset col-span-2 !m-auto h-fit !w-fit sm:col-span-1">
                  {icons['plus-circle'].toSvg()}
                </Button>
              </form>

              <ProductsTable entity={entity} basePath={basePath} />
            </>
          </Group>
          {children}
        </>
      </Card>

      <FloatingLink basePath={basePath} entityId={entity.id} icon="clipboard" />
    </section>
  );
}

type GroupProps = {
  title: string;
  customElement?: JSX.Element;
};

function Group({ title, customElement, children }: ComponentProps<GroupProps>) {
  const HComponent = <h2 class="mb-0 text-lg">{title}</h2>;

  return (
    <div class="mb-4 border-b border-solid border-b-pico-muted last-of-type:border-none">
      {customElement ? (
        <div class="flex items-center gap-2">
          {HComponent}
          {customElement}
        </div>
      ) : (
        HComponent
      )}

      {children}
    </div>
  );
}

EditSection.Group = Group;
