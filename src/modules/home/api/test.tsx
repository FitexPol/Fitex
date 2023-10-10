import Elysia from 'elysia';
import Test, { Item } from '../components/Test';

export const test = new Elysia().get('/test', () => {
  const items: Item[] = [{ name: 'Dupa' }, { name: 'Cyce' }];

  return (
    <Test items={items}>
      <h2>Super komponent</h2>
    </Test>
  );
});
