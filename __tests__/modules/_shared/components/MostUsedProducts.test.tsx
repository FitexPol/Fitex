// eslint-disable-next-line import/no-unresolved
import { describe, expect, it } from 'bun:test';

import { MostUsedProducts } from '@components/MostUsedProducts';
import { Meal } from '@meals/models/meal';
import { Product } from '@models/product';

import { getUser, render } from '../../../utils';

describe('MostUsedProducts', () => {
  it('should render correctly', async () => {
    const user = await getUser();

    const mealDoc = new Meal({
      name: 'test',
      author: user.id,
      products: [new Product({ name: 'test-0' })],
    });

    const productNames: string[] = ['test-0', 'test-1'];

    const document = await render(
      <MostUsedProducts productNames={productNames} basePath="meals" entity={mealDoc} />,
    );

    const items = document.querySelectorAll('#most-used-products li');

    expect(items.length).toBe(2);

    items.forEach((item, i) => {
      const form = item.querySelector('form');
      if (!form) throw new Error('Form not found');

      const input = item.querySelector('input');
      if (!input) throw new Error('Input not found');

      expect(form.getAttribute('hx-post')).toBe(`/api/meals/${mealDoc.id}/products`);
      expect(form.getAttribute('hx-swap')).toBe('outerHTML');
      expect(form.getAttribute('hx-target')).toBe('#most-used-products');
      expect(input.value).toBe(productNames[i]);

      if (input.value !== 'test-0') return;

      expect(item.classList.contains('pointer-events-none')).toBe(true);
      expect(item.classList.contains('opacity-50')).toBe(true);
    });
  });
});
