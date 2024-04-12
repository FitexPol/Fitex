// eslint-disable-next-line import/no-unresolved
import { describe, expect, it } from 'bun:test';
import { t } from 'elysia';

import { Textarea } from '@components/inputs/Textarea';

import { render } from '../../../../utils';

describe('Textarea', () => {
  it('should render correctly if it has no validation options set', async () => {
    const document = await render(
      <Textarea
        dto={t.Object({ test: t.Optional(t.String()) })}
        name="test"
        value="Test value"
        label="Test label"
        placeholder="Test placeholder"
        rows="5"
      />,
    );

    const label = document.querySelector('span');
    if (!label) throw new Error('Label not found');

    expect(label.textContent).toBe('Test label');

    const textarea = document.querySelector('textarea');
    if (!textarea) throw new Error('Textarea not found');

    expect(textarea.name).toBe('test');
    expect(textarea.value).toBe('Test value');
    expect(textarea.placeholder).toBe('Test placeholder');
    expect(textarea.rows).toBe(5);
    expect(textarea.required).toBeFalse();
  });

  it('should render correctly if it has validation options set', async () => {
    const document = await render(
      <Textarea dto={t.Object({ test: t.String() })} name="test" error="Test error" />,
    );

    const textarea = document.querySelector('textarea');
    if (!textarea) throw new Error('Textarea not found');

    expect(textarea.required).toBeTrue();

    const error = document.querySelector('small');
    if (!error) throw new Error('Error not found');

    expect(error.textContent).toBe('Test error');
  });
});
