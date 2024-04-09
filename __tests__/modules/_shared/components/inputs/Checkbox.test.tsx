// eslint-disable-next-line import/no-unresolved
import { describe, expect, it } from 'bun:test';

import { Checkbox } from '@components/inputs/Checkbox';

import { render } from '../../../../utils';

describe('Checkbox', () => {
  it('should render correctly', async () => {
    const document = await render(<Checkbox name="test">Test label</Checkbox>);

    const checkboxLabel = document.querySelector('label');
    if (!checkboxLabel) throw new Error('Checkbox label not found');

    expect(checkboxLabel.textContent).toBe('Test label');

    const checkbox = document.querySelector('input[type="checkbox"]');
    if (!checkbox) throw new Error('Checkbox not found');

    expect(checkbox.getAttribute('name')).toBe('test');
    expect(checkbox.getAttribute('checked')).toBeNull();
  });

  it('should render with checked attribute if isChecked prop is set', async () => {
    const document = await render(
      <Checkbox name="test" isChecked>
        Test label
      </Checkbox>,
    );

    const checkbox = document.querySelector('input[type="checkbox"]');
    if (!checkbox) throw new Error('Checkbox not found');

    expect(checkbox.getAttribute('checked')).toBeDefined();
  });
});
