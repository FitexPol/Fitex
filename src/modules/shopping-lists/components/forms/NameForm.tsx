import { Button } from '@components/Button';
import { Input } from '@components/inputs/Input';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';

import { type NameFormErrors, nameForm } from '../../forms/name';
import { type ShoppingListDoc } from '../../models/shoppingList';

type NameFormProps = {
  shoppingListDoc?: ShoppingListDoc;
  errors?: NameFormErrors;
};

export function NameForm({ shoppingListDoc, errors }: ComponentProps<NameFormProps>) {
  const hxAttributes: HtmxAttributes = shoppingListDoc
    ? {
        'hx-patch': `/api/shopping-lists/${shoppingListDoc.id}`,
      }
    : {
        'hx-post': '/api/shopping-lists',
      };

  return (
    <form {...hxAttributes}>
      <Input control={nameForm.name} value={shoppingListDoc?.name} label={$t('_name')} error={errors?.name} />

      <Button type="submit">{$t('_submit')}</Button>
    </form>
  );
}
