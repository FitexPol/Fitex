import { Button } from '@components/Button';
import { StringInput } from '@components/inputs/StringInput';
import { type FormErrors } from '@types';
import { $t } from '@utils/$t';

import { shoppingListNameDTO } from '../../dto/shoppingListName';
import { type ShoppingListDoc } from '../../models/shoppingList';

type NameFormProps = {
  shoppingListDoc?: ShoppingListDoc;
  errors?: FormErrors<typeof shoppingListNameDTO>;
};

export function NameForm({ shoppingListDoc, errors }: NameFormProps) {
  const hxAttributes: Htmx.Attributes = shoppingListDoc
    ? {
        'hx-patch': `/api/shopping-lists/${shoppingListDoc.id}`,
      }
    : {
        'hx-post': '/api/shopping-lists',
      };

  return (
    <form {...hxAttributes}>
      <StringInput
        dto={shoppingListNameDTO}
        name="name"
        value={shoppingListDoc?.name}
        label={$t('_name')}
        error={errors?.name}
      />

      <Button type="submit">{Html.escapeHtml($t('_submit'))}</Button>
    </form>
  );
}
