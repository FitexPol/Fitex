import { Elysia } from 'elysia';

import { Document } from '@components/_Document';
import { MealAddProductsSection } from '@meals/components/MealAddProductsSection';
import { MealBreadcrumbs } from '@meals/components/MealBreadcrumbs';
import { $t } from '@utils/$t';

import { mealContext } from './context';

export const productsPage = new Elysia().use(mealContext).get('/products', ({ request, user, mealDoc }) => (
  <Document currentUrl={request.url} user={user}>
    <MealBreadcrumbs
      items={[
        { href: `/${mealDoc.id}`, label: mealDoc.name },
        { href: '/products', label: $t('products.addProducts') },
      ]}
    />

    <MealAddProductsSection user={user} mealDoc={mealDoc} />
  </Document>
));
