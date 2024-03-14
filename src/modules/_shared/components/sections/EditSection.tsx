import { icons } from 'feather-icons';

import { addProductForm } from '../../forms/add-product';
import type { BasePath, ComponentProps, Datalist, Entity } from '../../types';
import { $t } from '../../utils/$t';
import { getPath } from '../../utils/getPath';
import { Button } from '../Button';
import { Card } from '../Card';
import { Input } from '../inputs/Input';
import { Link } from '../Link';
import { ProductsTable } from '../ProductsTable';

const _tShared = $t('_shared');

type EditSectionProps<T extends Entity> = {
  title: string;
  basePath: BasePath;
  entity: T;
  basicInformation: { label: string; value: string }[];
  productsDatalist: Datalist;
};

export function EditSection<T extends Entity>({
  title,
  basePath,
  entity,
  basicInformation,
  productsDatalist,
  children,
}: ComponentProps<EditSectionProps<T>>) {
  return (
    <section>
      <Card>
        <>
          <Card.Header title={<h1 class="mb-0 text-2xl">{title}</h1>} />

          <Group
            title={_tShared('_shared.basicInformation')}
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

          <Group title={_tShared('_shared.products')}>
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
                  label={_tShared('editSection.addProduct.label')}
                  datalist={productsDatalist}
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
