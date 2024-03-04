import { Elysia } from 'elysia';

import { context } from '@/context';
import { getTabs } from '@admin-panel/utils/getTabs';
import { Document } from '@components/_Document';
import { Tabs } from '@components/Tabs';

import { categoryFormPage } from './form';

const categoriesPage = new Elysia().use(context).get('', ({ user, query }) => {
  return (
    <Document user={user}>
      <section class="mt-8">
        <Tabs tabs={getTabs(user!, query)} activeTab="categories" />
      </section>
    </Document>
  );
});

export const categoryPages = new Elysia().group('/categories', (app) =>
  app.use(categoriesPage).use(categoryFormPage),
);
