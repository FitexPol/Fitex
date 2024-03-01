import { Elysia } from 'elysia';

import { context } from '@/context';
import { getTabs } from '@admin-panel/utils/getTabs';
import { Document } from '@components/_Document';
import { Tabs } from '@components/Tabs';

export const productsPage = new Elysia().use(context).get('/products', ({ user }) => {
  return (
    <Document user={user}>
      <section class="mt-8">
        <Tabs tabs={getTabs(user!)} activeTab="products" />
      </section>
    </Document>
  );
});
