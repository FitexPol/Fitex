// eslint-disable-next-line import/no-unresolved
import { afterAll, beforeAll, describe, expect, it } from 'bun:test';

import { UpdateProductForm } from '@components/forms/UpdateProductForm';
import { Meal } from '@meals/models/meal';
import { Product } from '@models/product';

import { getUser, render } from '../../../../utils';

describe('UpdateProductForm', async () => {
  const user = await getUser();
  const productDoc = new Product({ name: 'test-0' });

  beforeAll(async () => {
    const mealDoc = new Meal({
      name: 'test-meal-0',
      author: user.id,
      products: [productDoc],
    });

    await mealDoc.save();
  });

  it('should render correctly if errors prop is not set', async () => {
    const document = await render(
      <UpdateProductForm endpoint="/api/test/endpoint" user={user} productDoc={productDoc} />,
    );

    const form = document.querySelector('form');
    if (!form) throw new Error('Form not found');

    expect(form.getAttribute('hx-patch')).toBe('/api/test/endpoint');

    const inputWrappers = form.querySelectorAll('label');

    expect(inputWrappers).toHaveLength(3);

    // Name input
    const nameInputWrapper = inputWrappers.item(0);

    const nameInput = nameInputWrapper.querySelector('input');
    if (!nameInput) throw new Error('Name input not found');

    expect(nameInput.name).toBe('name');
    expect(nameInput.type).toBe('text');
    expect(nameInput.required).toBeTrue();
    expect(nameInput.value).toBe(productDoc.name);
    expect(nameInput.getAttribute('list')).toBe('products-datalist');

    const nameInputDatalist = nameInputWrapper.querySelector('datalist');
    if (!nameInputDatalist) throw new Error('Name input datalist not found');

    expect(nameInputDatalist.id).toBe('products-datalist');

    const datalistOptions = nameInputDatalist.querySelectorAll('option');
    expect(datalistOptions.item(0).value).toBe('test-0');

    // Quantity input
    const quantityInputWrapper = inputWrappers.item(1);

    const quantityInput = quantityInputWrapper.querySelector('input');
    if (!quantityInput) throw new Error('Quantity input not found');

    expect(quantityInput.name).toBe('quantity');
    expect(quantityInput.type).toBe('number');
    expect(quantityInput.step).toBe('.1');
    expect(quantityInput.value).toBe(productDoc.quantity.toString());

    // Unit input
    const unitInputWrapper = inputWrappers.item(2);

    const unitSelect = unitInputWrapper.querySelector('select');
    if (!unitSelect) throw new Error('Unit select not found');

    expect(unitSelect.name).toBe('unit');
  });

  afterAll(async () => {
    await Meal.collection.drop();
  });
});
