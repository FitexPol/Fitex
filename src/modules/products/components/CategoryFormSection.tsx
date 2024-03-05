import { Card } from '@components/Card';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';

import { CategoryForm } from './CategoryForm';
import { Category } from '../models/category';

const _t = $t('products');

type CategoryFormSectionProps = {
  categoryId?: string;
};

export async function CategoryFormSection({ categoryId }: ComponentProps<CategoryFormSectionProps>) {
  if (!categoryId) {
    return (
      <Section title={_t('categoryFormSection.title')}>
        <CategoryForm />
      </Section>
    );
  }

  const categoryDoc = await Category.findById(categoryId).exec();

  if (!categoryDoc) {
    return <span>{_t('_shared.categories.errors.notFound')}</span>;
  }

  return (
    <Section title={categoryDoc.name['pl-PL']}>
      <CategoryForm categoryDoc={categoryDoc} />
    </Section>
  );
}

type SectionProps = {
  title: string;
};

function Section({ title, children }: ComponentProps<SectionProps>) {
  return (
    <section id="category-form-section">
      <Card>
        <>
          <Card.Header title={<h1 class="mb-0 text-2xl">{title}</h1>} />
          {children}
        </>
      </Card>
    </section>
  );
}
