import { icons } from 'feather-icons';

import { type ProductDoc } from '../../models/product';
import type { BasePath, ComponentProps } from '../../types';
import { $t } from '../../utils/$t';
import { getRoundedQuantity } from '../../utils/getRoundedQuantity';
import { Card } from '../Card';
import { Link } from '../Link';

const _tShared = $t('_shared');

type CardSectionProps = {
  entityId: string;
  entityName: string;
  basePath: BasePath;
  products: ProductDoc[];
};

export function CardSection({
  entityId,
  entityName,
  basePath,
  products,
  children,
}: ComponentProps<CardSectionProps>) {
  return (
    <section class="mb-10">
      <Card>
        <>
          <Card.Header title={<h1 class="mb-0 pr-7 text-2xl">{entityName}</h1>} />

          <h3 class="mb-1 mt-2 text-lg">{_tShared('_shared.products')}:</h3>

          {products.length > 0 ? (
            <ul>
              {products.map(({ name, quantity, unit }) => (
                <li>
                  <label>
                    <input type="checkbox" name={name} />
                    {name} - {getRoundedQuantity(quantity)} {unit}
                  </label>
                </li>
              ))}
            </ul>
          ) : (
            <span>{_tShared('_shared.noProducts')}</span>
          )}

          {children}
        </>
      </Card>

      <Link
        href={`/${basePath}/${entityId}/edit`}
        class="fixed bottom-5 right-5 rounded-full bg-pico-primary p-3 shadow-md"
      >
        {icons['edit-2'].toSvg({ class: 'w-7 h-7 stroke-white' })}
      </Link>
    </section>
  );
}
