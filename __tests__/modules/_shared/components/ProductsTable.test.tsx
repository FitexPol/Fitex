// eslint-disable-next-line import/no-unresolved
import { describe, expect, it } from 'bun:test';

import { ProductsTable } from '@components/ProductsTable';
import { Meal } from '@meals/models/meal';
import { Product } from '@models/product';

import { getUser, render } from '../../../utils';

describe('ProductsTable', () => {
  it('should render correctly', async () => {
    const user = await getUser();

    const mealDoc = new Meal({
      name: 'test',
      author: user.id,
      products: [new Product({ name: 'test-1' }), new Product({ name: 'test-0' })],
    });

    const sortedProducts = [...mealDoc.products].sort((a, b) => a.name.localeCompare(b.name));

    const document = await render(<ProductsTable entity={mealDoc} basePath="meals" />);

    const tRows = document.querySelectorAll('tbody tr');

    expect(tRows.length).toBe(2);

    tRows.forEach((row, index) => {
      const cells: Element[] = [];

      for (let i = 0; i < 4; i++) {
        const cell = row.children.item(i);

        if (!cell) throw new Error(`Cell ${i} not found`);

        cells.push(cell);
      }

      expect(cells[0].textContent).toBe(sortedProducts[index].name);
      expect(cells[1].textContent).toBe(sortedProducts[index].quantity.toString());
      expect(cells[2].textContent).toBe(sortedProducts[index].unit);

      const deleteButton = cells[3].querySelector('button');
      if (!deleteButton) throw new Error('Delete button not found');

      expect(deleteButton.getAttribute('hx-delete')).toBe(
        `/api/meals/${mealDoc.id}/products/${sortedProducts[index].id}`,
      );
      expect(deleteButton.getAttribute('hx-swap')).toBe('outerHTML');
      expect(deleteButton.getAttribute('hx-target')).toBe('#products');

      const editButton = cells[3].querySelector('a');
      if (!editButton) throw new Error('Edit button not found');

      expect(editButton.href).toBe(`/meals/${mealDoc.id}/product?productId=${sortedProducts[index].id}`);
    });
  });
});
