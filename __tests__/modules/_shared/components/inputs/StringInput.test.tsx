// eslint-disable-next-line import/no-unresolved
import { describe, expect, it } from 'bun:test';
import { t } from 'elysia';

import { StringInput } from '@components/inputs/StringInput';

import { render } from '../../../../utils';

describe('StringInput', () => {
  it('should render correctly if it has no validation options set', async () => {
    const datalistOptions = ['Option 1', 'Option 2'];

    const document = await render(
      <StringInput
        dto={t.Object({ test: t.Optional(t.String()) })}
        name="test"
        label="Test label"
        value="Test value"
        placeholder="Test placeholder"
        datalist={{ id: 'test-datalist', options: datalistOptions }}
        disabled
      />,
    );

    const label = document.querySelector('span');
    if (!label) throw new Error('Label not found');

    expect(label.textContent).toBe('Test label');

    const input = document.querySelector('input');
    if (!input) throw new Error('Input not found');

    expect(input.type).toBe('text');
    expect(input.value).toBe('Test value');
    expect(input.placeholder).toBe('Test placeholder');
    expect(input.required).toBeFalse();
    expect(input.getAttribute('list')).toBe('test-datalist');
    expect(input.disabled).toBeTrue();

    const datalist = document.querySelector('datalist');
    if (!datalist) throw new Error('Datalist not found');

    expect(datalist.id).toBe('test-datalist');

    const options = datalist.querySelectorAll('option');

    expect(options).toHaveLength(2);

    options.forEach((option, i) => {
      expect(option.value).toBe(datalistOptions[i]);
    });
  });

  it('should render correctly if it has validation options set', async () => {
    const document = await render(
      <StringInput
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

    const input = document.querySelector('input');
    if (!input) throw new Error('Input not found');

    expect(input.minLength).toBe(5);
    expect(input.maxLength).toBe(10);
    expect(input.required).toBeTrue();

    const error = document.querySelector('small');
    if (!error) throw new Error('Error not found');

    expect(error.textContent).toBe('Test error');
  });
});
