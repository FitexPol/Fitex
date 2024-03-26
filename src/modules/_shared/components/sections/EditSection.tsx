import { icons } from 'feather-icons';

import type { BasePath, ComponentProps, Entity } from '../../types';
import { $t } from '../../utils/$t';
import { getPath } from '../../utils/getPath';
import { Button } from '../Button';
import { Card } from '../Card';
import { FloatingLink } from '../FloatingLink';
import { Link } from '../Link';
import { ProductsTable } from '../ProductsTable';

type EditSectionProps<T extends Entity> = {
  title: string;
  basePath: BasePath;
  entity: T;
};

export function EditSection<T extends Entity>({
  title,
  basePath,
  entity,
  children,
}: ComponentProps<EditSectionProps<T>>) {
  return (
    <section class="mb-20">
      <Card>
        <>
          <Card.Header
            title={
              <h1 class="mb-0 text-2xl">
                {title}
                <Link href={getPath(`/${basePath}/name-form`, { id: entity.id })} class="ml-2 inline-flex">
                  {icons['edit-2'].toSvg({ class: 'w-5 h-5' })}
                </Link>
              </h1>
            }
            class="relative pr-10"
          />

          <Group title={$t('products')}>
            <ProductsTable entity={entity} basePath={basePath} />
          </Group>

          {children}

          <Card.Footer class="flex justify-end">
            <Button
              class="pico-reset !text-inherit"
              hx-delete={`/api/${basePath}/${entity.id}`}
              hx-target="closest section"
              hx-swap="outerHTML"
              hx-confirm={$t('_deletionConfirmation')}
              hx-indicator="#loader"
            >
              {icons.trash.toSvg()}
            </Button>
          </Card.Footer>
        </>
      </Card>

      <FloatingLink href={`/${basePath}`} icon={{ type: 'arrow-left' }} />

      <FloatingLink
        href={`/${basePath}/${entity.id}/add-products`}
        icon={{ type: 'plus', class: 'stroke-white' }}
        text={$t('products.addProducts')}
        class="left-auto right-5 bg-pico-primary"
      />
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
    <div class="mb-4 border-b border-solid border-b-pico-muted last-of-type:mb-0 last-of-type:border-none">
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
