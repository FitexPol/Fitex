import { icons } from 'feather-icons';

import { type JWTUser } from '@auth/models/user';

import { addProductForm } from '../../forms/addProduct';
import type { BasePath, ComponentProps, Entity, Tab } from '../../types';
import { $t } from '../../utils/$t';
import { $tm } from '../../utils/$tm';
import { geMostUsedProductNames } from '../../utils/getMostUsedProductNames';
import { Button } from '../Button';
import { Card } from '../Card';
import { FloatingLink } from '../FloatingLink';
import { Input } from '../inputs/Input';
import { Link } from '../Link';
import { MostUsedProducts } from '../MostUsedProducts';

type AddProductsSectionProps<T extends Entity> = {
  user: JWTUser;
  entity: T;
  basePath: BasePath;
  activeTab: string;
  additionalTabs?: Map<string, Tab>;
};

export async function AddProductsSection<T extends Entity>({
  user,
  entity,
  basePath,
  activeTab,
  additionalTabs,
}: ComponentProps<AddProductsSectionProps<T>>) {
  const productNames = await geMostUsedProductNames(user);

  const tabs = new Map<string, Tab>([
    [
      'products',
      {
        href: `/${basePath}/${entity.id}/add-products`,
        label: $t('products.mostUsed'),
        component: <MostUsedProducts productNames={productNames} basePath={basePath} entity={entity} />,
      },
    ],
  ]);

  if (additionalTabs) {
    additionalTabs.forEach((tab, key) => tabs.set(key, tab));
  }

  function Component() {
    const tab = tabs.get(activeTab);

    if (!tab) return <></>;

    return tab.component;
  }

  const hxAttributes: HtmxAttributes =
    activeTab === 'products'
      ? {
          'hx-target': '#most-used-products',
          'hx-swap': 'outerHTML',
        }
      : {
          'hx-swap': 'none',
        };

  return (
    <section class="mb-20">
      <Card>
        <>
          <Card.Header title={<h1 class="mb-0 text-2xl">{entity.name}</h1>} />

          <form
            class="mt-2 grid !grid-cols-12"
            hx-post={`/api/${basePath}/${entity.id}/products`}
            hx-on--after-request="this.reset()"
            {...hxAttributes}
          >
            <Input
              control={addProductForm.name}
              label={$t('products.addProduct.label')}
              placeholder={$t('products.addProduct.placeholder')}
              datalist={{ id: 'products-datalist', options: productNames }}
              class="col-span-10 sm:col-span-11"
            />

            <Button type="submit" class="pico-reset col-span-2 !m-auto h-fit !w-fit sm:col-span-1">
              {icons['plus-circle'].toSvg()}
            </Button>
          </form>

          <>
            <div class="grid !grid-cols-[repeat(auto-fit,minmax(0%,_1fr))] !gap-0">
              {Array.from(tabs.entries()).map(([tab, { href, label }]) => (
                <Link
                  href={href}
                  class={$tm(
                    'border-b-2 border-b-pico-muted py-2 text-center',
                    activeTab === tab && 'pointer-events-none border-b-pico-primary',
                  )}
                >
                  {label}
                </Link>
              ))}
            </div>

            <Component />
          </>
        </>
      </Card>

      <FloatingLink href={`/${basePath}/${entity.id}`} icon={{ type: 'arrow-left' }} />
    </section>
  );
}
