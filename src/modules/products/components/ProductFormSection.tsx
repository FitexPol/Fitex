import { Card } from '@components/Card';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';

import { ProductForm } from './ProductForm';
import { Product } from '../models/product';

const _t = $t('products');

type ProductFormSectionProps = {
  productId?: string;
};

export async function ProductFormSection({ productId }: ComponentProps<ProductFormSectionProps>) {
  if (!productId) {
    return (
      <Section title={_t('productFormSection.title')}>
        <ProductForm />
      </Section>
    );
  }

  const productDoc = await Product.findById(productId).populate('category').exec();

  if (!productDoc) {
    return <span>{_t('_shared.products.errors.notFound')}</span>;
  }

  return (
    <Section title={productDoc.name['pl-PL']}>
      <ProductForm productDoc={productDoc} />
    </Section>
  );
}

type SectionProps = {
  title: string;
};

function Section({ title, children }: ComponentProps<SectionProps>) {
  return (
    <section id="product-form-section">
      <Card>
        <>
          <Card.Header title={<h1 class="mb-0 text-2xl">{title}</h1>} />
          {children}
        </>
      </Card>
    </section>
  );
}
