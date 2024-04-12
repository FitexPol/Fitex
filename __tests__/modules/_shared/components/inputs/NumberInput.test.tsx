// eslint-disable-next-line import/no-unresolved
import { describe, expect, it } from 'bun:test';
import { t } from 'elysia';

import { NumberInput } from '@components/inputs/NumberInput';

import { render } from '../../../../utils';

describe('NumberInput', () => {
  it('should render correctly if it has no validation options set', async () => {
    const datalistOptions = ['1', '2'];

    const document = await render(
      <NumberInput
        dto={t.Object({ test: t.Optional(t.String()) })}
        name="test"
        label="Test label"
        value="1"
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

    expect(input.type).toBe('number');
    expect(input.value).toBe('1');
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
      <NumberInput
        dto={t.Object({ test: t.String() })}
        name="test"
        min="1"
        max="10"
        step=".01"
        error="Test error"
      />,
    );

    const input = document.querySelector('input');
    if (!input) throw new Error('Input not found');

    expect(input.min).toBe('1');
    expect(input.max).toBe('10');
    expect(input.required).toBeTrue();

    const error = document.querySelector('small');
    if (!error) throw new Error('Error not found');

    expect(error.textContent).toBe('Test error');
  });
});
