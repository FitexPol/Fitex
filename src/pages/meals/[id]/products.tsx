import { Elysia } from 'elysia';

import { Document } from '@components/_Document';
import { Breadcrumbs } from '@components/Breadcrumbs';
import { MealAddProductsSection } from '@meals/components/MealAddProductsSection';
import { getBreadcrumbs } from '@meals/utils/getBreadcrumbs';
import { $t } from '@utils/$t';

import { mealContext } from './context';

export const productsPage = new Elysia().use(mealContext).get('/products', ({ request, user, mealDoc }) => (
  <Document currentUrl={request.url} user={user}>
    <>
      <Breadcrumbs
        items={getBreadcrumbs([
          { href: `/${mealDoc.id}`, label: mealDoc.name },
          { href: '/products', label: $t('products.addProducts') },
        ])}
      />

      <MealAddProductsSection user={user} mealDoc={mealDoc} />
    </>
  </Document>
));
