import type { ComponentProps, Entity } from '../../types';
import { $t } from '../../utils/$t';
import { getRoundedQuantity } from '../../utils/getRoundedQuantity';
import { Card } from '../Card';

const _tShared = $t('_shared');

type CardSectionProps<T extends Entity> = {
  entity: T;
};

export function CardSection<T extends Entity>({ entity, children }: ComponentProps<CardSectionProps<T>>) {
  return (
    <section>
      <Card>
        <>
          <Card.Header title={<h1 class="mb-0 pr-7 text-2xl">{entity.name}</h1>} />

          <h3 class="mb-1 mt-2 text-lg">{_tShared('_shared.products')}:</h3>

          {entity.products.length > 0 ? (
            <ul>
              {entity.products.map(({ name, quantity, unit }) => (
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
    </section>
  );
}
