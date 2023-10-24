import type { App } from '@/app';

import Test, { type Item } from '../components/Test';

export const test = (app: App) =>
  app.get('/test', () => {
    const items: Item[] = [{ name: 'Dupa' }, { name: 'Cyce' }];

    return (
      <Test items={items}>
        <h2>Super komponent</h2>
      </Test>
    );
  });
