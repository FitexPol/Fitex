import { Button } from '@components/Button';
import { Input } from '@components/inputs/Input';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';

import { type BasicInformationFormErrors, basicInformationForm } from '../../forms/basicInformation';
import { type ShoppingListDoc } from '../../models/shoppingList';

type BasicInformationFormProps = {
  shoppingListDoc?: ShoppingListDoc;
  errors?: BasicInformationFormErrors;
};

export function BasicInformationForm({ shoppingListDoc, errors }: ComponentProps<BasicInformationFormProps>) {
  const hxAttributes: HtmxAttributes = shoppingListDoc
    ? {
        'hx-patch': `/api/shopping-lists/${shoppingListDoc.id}`,
      }
    : {
        'hx-post': '/api/shopping-lists',
      };

  return (
    <form {...hxAttributes}>
      <Input
        control={basicInformationForm.name}
        value={shoppingListDoc?.name}
        label={$t('name')}
        error={errors?.name}
      />

      <Button type="submit">{$t('submit')}</Button>
    </form>
  );
}
