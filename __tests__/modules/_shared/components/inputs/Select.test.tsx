// eslint-disable-next-line import/no-unresolved
import { describe, expect, it } from 'bun:test';
import { t } from 'elysia';

import { Select, type SelectOption } from '@components/inputs/Select';

import { render } from '../../../../utils';

describe('Select', () => {
  it('should render correctly if it has no validation options set', async () => {
    const selectOptions: SelectOption[] = [
      { value: 'test-option-0', label: 'Option 0' },
      { value: 'test-option-1', label: 'Option 1' },
    ];

    const document = await render(
      <Select
        dto={t.Object({ test: t.Optional(t.String()) })}
        name="test"
        options={selectOptions}
        label="Test label"
        placeholder="Test placeholder"
        disabled
      />,
    );

    const label = document.querySelector('span');
    if (!label) throw new Error('Label not found');

    expect(label.textContent).toBe('Test label');

    const select = document.querySelector('select');
    if (!select) throw new Error('Select not found');

    expect(select.name).toBe('test');
    expect(select.required).toBeFalse();
    expect(select.disabled).toBeTrue();

    const options = select.querySelectorAll('option');

    expect(options).toHaveLength(3);

    options.forEach((option, index) => {
      if (index === 0) {
        expect(option.value).toBe('');
        expect(option.disabled).toBeTrue();
        expect(option.selected).toBeTrue();
        expect(option.textContent).toBe('Test placeholder');
        return;
      }

      expect(option.value).toBe(selectOptions[index - 1].value);
      expect(option.textContent).toBe(selectOptions[index - 1].label);
    });
  });

  it('should render correctly if it has validation options set', async () => {
    const document = await render(
      <Select dto={t.Object({ test: t.String() })} name="test" options={[]} error="Test error" />,
    );

    const select = document.querySelector('select');
    if (!select) throw new Error('Select not found');

    expect(select.required).toBeTrue();

    const error = document.querySelector('small');
    if (!error) throw new Error('Error not found');

    expect(error.textContent).toBe('Test error');
  });
});
