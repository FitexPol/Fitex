// eslint-disable-next-line import/no-unresolved
import { describe, expect, it } from 'bun:test';
import { t } from 'elysia';

import { Input } from '@components/inputs/Input';

import { render } from '../../../../utils';

describe('Input', () => {
  it('should render correctly if control type is not set to "number" and has no validation options set', async () => {
    const datalistOptions = ['Option 1', 'Option 2'];

    const document = await render(
      <Input
        dto={t.Object({ test: t.Optional(t.String()) })}
        name="test"
        label="Test label"
        value="Test value"
        placeholder="Test placeholder"
        datalist={{ id: 'test-datalist', options: datalistOptions }}
        isDisabled
      />,
    );

    const inputWrapper = document.querySelector('label');
    if (!inputWrapper) throw new Error('Input wrapper not found');

    const label = inputWrapper.querySelector('span');
    if (!label) throw new Error('Label not found');

    expect(label.textContent).toBe('Test label');

    const input = inputWrapper.querySelector('input');
    if (!input) throw new Error('Input not found');

    expect(input.type).toBe('text');
    expect(input.value).toBe('Test value');
    expect(input.placeholder).toBe('Test placeholder');
    expect(input.getAttribute('list')).toBe('test-datalist');
    expect(input.disabled).toBeTrue();

    const datalist = inputWrapper.querySelector('datalist');
    if (!datalist) throw new Error('Datalist not found');

    expect(datalist.id).toBe('test-datalist');

    const options = datalist.querySelectorAll('option');

    expect(options).toHaveLength(2);

    options.forEach((option, i) => {
      expect(option.value).toBe(datalistOptions[i]);
    });
  });

  it('should render correctly if control type is not set to "number" and has validation options set', async () => {
    const document = await render(
      <Input
        dto={t.Object({
          test: t.String({
            minLength: 5,
            maxLength: 10,
            error: 'Test message',
          }),
        })}
        name="test"
        error="Test error"
      />,
    );

    const inputWrapper = document.querySelector('label');
    if (!inputWrapper) throw new Error('Input wrapper not found');

    const input = inputWrapper.querySelector('input');
    if (!input) throw new Error('Input not found');

    expect(input.minLength).toBe(5);
    expect(input.maxLength).toBe(10);
    expect(input.required).toBeTrue();

    const error = inputWrapper.querySelector('small');
    if (!error) throw new Error('Error not found');

    expect(error.textContent).toBe('Test error');
  });

  it('should render correctly if control type is set to "number" and has no validation options set', async () => {
    const datalistOptions = ['1', '2'];

    const document = await render(
      <Input
        dto={t.Object({ test: t.Optional(t.Number()) })}
        name="test"
        label="Test label"
        value="1"
        placeholder="Test placeholder"
        datalist={{ id: 'test-datalist', options: datalistOptions }}
        isDisabled
      />,
    );

    const inputWrapper = document.querySelector('label');
    if (!inputWrapper) throw new Error('Input wrapper not found');

    const label = inputWrapper.querySelector('span');
    if (!label) throw new Error('Label not found');

    expect(label.textContent).toBe('Test label');

    const input = inputWrapper.querySelector('input');
    if (!input) throw new Error('Input not found');

    expect(input.type).toBe('number');
    expect(input.value).toBe('1');
    expect(input.placeholder).toBe('Test placeholder');
    expect(input.getAttribute('list')).toBe('test-datalist');
    expect(input.disabled).toBeTrue();

    const datalist = inputWrapper.querySelector('datalist');
    if (!datalist) throw new Error('Datalist not found');

    expect(datalist.id).toBe('test-datalist');

    const options = datalist.querySelectorAll('option');

    expect(options).toHaveLength(2);

    options.forEach((option, i) => {
      expect(option.value).toBe(datalistOptions[i]);
    });
  });

  it('should render correctly if control type is set to "number" and has validation options set', async () => {
    const document = await render(
      <Input
        dto={t.Object({
          test: t.Number({
            minimum: 5,
            maximum: 10,
            error: 'Test message',
          }),
        })}
        name="test"
        error="Test error"
      />,
    );

    const inputWrapper = document.querySelector('label');
    if (!inputWrapper) throw new Error('Input wrapper not found');

    const input = inputWrapper.querySelector('input');
    if (!input) throw new Error('Input not found');

    expect(input.min).toBe('5');
    expect(input.max).toBe('10');
    expect(input.required).toBeTrue();

    const error = inputWrapper.querySelector('small');
    if (!error) throw new Error('Error not found');

    expect(error.textContent).toBe('Test error');
  });
});
