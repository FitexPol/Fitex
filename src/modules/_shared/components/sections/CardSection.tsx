import type { BasePath, ComponentProps, Entity } from '../../types';
import { $t } from '../../utils/$t';
import { Card } from '../Card';
import { FloatingLink } from '../FloatingLink';

type CardSectionProps<T extends Entity> = {
  entity: T;
  basePath: BasePath;
};

export function CardSection<T extends Entity>({
  entity,
  basePath,
  children,
}: ComponentProps<CardSectionProps<T>>) {
  return (
    <section class="mb-10">
      <Card>
        <>
          <Card.Header title={<h1 class="mb-0 pr-7 text-2xl">{entity.name}</h1>} />
          <h3 class="mb-1 mt-2 text-lg">{$t('products')}:</h3>
          {children}
        </>
      </Card>

      <FloatingLink href={`/${basePath}/${entity.id}/edit`} icon="edit-2" />
    </section>
  );
}
