// eslint-disable-next-line import/no-unresolved
import { describe, expect, it } from 'bun:test';

import { $t } from '@utils/$t';

describe('$t', () => {
  it('should return the translation if provided translation key exists', () => {
    const translation = $t('shoppingLists');

    expect(translation).toBe('Listy zakupów');
  });

  it('should return the error message if provided translation key does not exist', () => {
    const translation = $t('nonExistingKey');

    expect(translation).toBe('BŁĄD: Nie udało się załadować tłumaczenia');
  });
});
