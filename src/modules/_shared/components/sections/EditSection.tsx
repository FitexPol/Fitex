import { icons } from 'feather-icons';

import { type JWTUser } from '@auth/models/user';
import { AddProductForm } from '@products/components/forms/AddProductForm';
import { ProductsTable } from '@products/components/ProductsTable';
import { type ProductDoc } from '@products/models/product';

import type { BasePath, ComponentProps } from '../../types';
import { $t } from '../../utils/$t';
import { getPath } from '../../utils/getPath';
import { Card } from '../Card';
import { Link } from '../Link';

const _tShared = $t('_shared');

type EditSectionProps = {
  title: string;
  basePath: BasePath;
  entityId: string;
  basicInformation: { label: string; value: string }[];
  user: JWTUser;
  products: ProductDoc[];
};

export function EditSection({
  title,
  basePath,
  entityId,
  basicInformation,
  user,
  products,
  children,
}: ComponentProps<EditSectionProps>) {
  return (
    <section>
      <Card>
        <>
          <Card.Header title={<h1 class="mb-0 text-2xl">{title}</h1>} />

          <Group
            title={_tShared('_shared.basicInformation')}
            customElement={
              <Link href={getPath(`/${basePath}/basic-information-form`, { id: entityId })}>
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

          <Group title={_tShared('_shared.products')}>
            <>
              <AddProductForm user={user} endpoint={`/api/${basePath}/${entityId}/products`} class="mt-2" />

              <ProductsTable
                products={products}
                actionPaths={{
                  edit: `/${basePath}/${entityId}/product-form`,
                  delete: `/api/${basePath}/${entityId}/products`,
                }}
              />
            </>
          </Group>
          {children}
        </>
      </Card>
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
