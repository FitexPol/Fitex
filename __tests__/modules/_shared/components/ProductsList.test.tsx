// eslint-disable-next-line import/no-unresolved
import { describe, expect, it } from 'bun:test';

import { ProductList } from '@components/ProductList';
import { Meal } from '@meals/models/meal';
import { Product } from '@models/product';

import { getUser, render } from '../../../utils';

describe('ProductList', () => {
  it('should render correctly', async () => {
    const user = await getUser();

    const mealDoc = new Meal({
      name: 'test',
      author: user.id,
      products: [new Product({ name: 'test-1' }), new Product({ name: 'test-0' })],
    });

    const sortedProducts = [...mealDoc.products].sort((a, b) => a.name.localeCompare(b.name));

    const document = await render(<ProductList entity={mealDoc} basePath="meals" />);

    const items = document.querySelectorAll('ul li');

    expect(items.length).toBe(2);

    items.forEach((item, index) => {
      const label = item.querySelector('label');
      if (!label) throw new Error('Label not found');

      const { name, quantity } = sortedProducts[index];
      expect(label.textContent).toBe(`${name} - ${quantity}`);

      const deleteButton = item.querySelector('button');
      if (!deleteButton) throw new Error('Delete button not found');

      expect(deleteButton.getAttribute('hx-delete')).toBe(
        `/api/meals/${mealDoc.id}/products/${sortedProducts[index].id}`,
      );
      expect(deleteButton.getAttribute('hx-swap')).toBe('outerHTML');
      expect(deleteButton.getAttribute('hx-target')).toBe('closest ul');

      const editButton = item.querySelector('a');
      if (!editButton) throw new Error('Edit button not found');

      expect(editButton.href).toBe(`/meals/${mealDoc.id}/product?productId=${sortedProducts[index].id}`);
    });
  });
});
