import { ListProducts } from '@products/components/ListProducts';

import type { ComponentProps, Entity } from '../../types';
import { Card } from '../Card';

type CardSectionProps<T extends Entity> = {
  entity: T;
};

export function CardSection<T extends Entity>({ entity, children }: ComponentProps<CardSectionProps<T>>) {
  return (
    <section>
      <Card>
        <>
          <Card.Header title={<h1 class="mb-0 pr-7 text-2xl">{entity.name}</h1>} />

          <ListProducts products={entity.products}>
            <ListProducts.Title />
          </ListProducts>

          {children}
        </>
      </Card>
    </section>
  );
}
