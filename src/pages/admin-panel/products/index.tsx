import { Elysia } from 'elysia';

import { context } from '@/context';
import { getTabs } from '@admin-panel/utils/getTabs';
import { Document } from '@components/_Document';
import { Tabs } from '@components/Tabs';

import { productFormPage } from './form';

const productsPage = new Elysia().use(context).get('', ({ user, query }) => {
  return (
    <Document user={user}>
      <section class="mt-8">
        <Tabs tabs={getTabs(user!, query)} activeTab="products" />
      </section>
    </Document>
  );
});

export const productPages = new Elysia().group('/products', (app) =>
  app.use(productsPage).use(productFormPage),
);
