import { Button } from '@components/Button';
import { Input } from '@components/inputs/Input';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';

import { type BasicInformationFormErrors, basicInformationForm } from '../../forms/basic-information';
import { type ShoppingListDoc } from '../../models/shoppingList';

const _tShared = $t('_shared');

type BasicInformationProps = {
  shoppingListDoc?: ShoppingListDoc;
  errors?: BasicInformationFormErrors;
};

export function BasicInformation({ shoppingListDoc, errors }: ComponentProps<BasicInformationProps>) {
  const hxAttributes: HtmxAttributes = shoppingListDoc
    ? {
        'hx-patch': `/api/shopping-lists/${shoppingListDoc.id}`,
      }
    : {
        'hx-post': '/api/shopping-lists',
      };

  return (
    <form id="shopping-list-details-form" {...hxAttributes}>
      <Input
        control={basicInformationForm.name}
        value={shoppingListDoc?.name}
        label={_tShared('_shared.forms.name')}
        error={errors?.name}
      />

      <Button type="submit">{_tShared('_shared.forms.submit')}</Button>
    </form>
  );
}
