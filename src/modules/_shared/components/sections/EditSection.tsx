import type { BasePath, Entity } from '../../types';
import { $t } from '../../utils/$t';
import { Button } from '../Button';
import { Card } from '../Card';
import { FloatingLink } from '../FloatingLink';
import { Icon } from '../Icon';
import { Link } from '../Link';
import { ProductList } from '../ProductList';

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
}: Html.PropsWithChildren<EditSectionProps<T>>) {
  return (
    <section>
      <Card>
        <Card.Header
          title={
            <h1 class="mb-0 text-2xl">
              {Html.escapeHtml(title)}
              <Link href={`/${basePath}/${entity.id}/name`} class="ml-2 inline-flex">
                <Icon type="edit-2" class="size-5" />
              </Link>
            </h1>
          }
          class="relative pr-10"
        />

        <Group title={$t('products')}>
          <ProductList entity={entity} basePath={basePath} />
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
            <Icon type="trash" />
          </Button>
        </Card.Footer>
      </Card>

      <FloatingLink
        href={`/${basePath}/${entity.id}/products`}
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

function Group({ title, customElement, children }: Html.PropsWithChildren<GroupProps>) {
  const HComponent = (
    <h2 class="mb-0 text-lg" safe>
      {title}
    </h2>
  );

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
