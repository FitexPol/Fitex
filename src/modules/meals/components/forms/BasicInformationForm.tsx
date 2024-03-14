import { Button } from '@components/Button';
import { Input } from '@components/inputs/Input';
import { Textarea } from '@components/inputs/Textarea';
import type { ComponentProps } from '@types';
import { $t } from '@utils/$t';

import { type BasicInformationFormErrors, basicInformationForm } from '../../forms/basic-information';
import { type MealDoc } from '../../models/meal';

const _tShared = $t('_shared');

type BasicInformationFormProps = {
  mealDoc?: MealDoc;
  errors?: BasicInformationFormErrors;
};

export function BasicInformationForm({ mealDoc, errors }: ComponentProps<BasicInformationFormProps>) {
  const hxAttributes: HtmxAttributes = mealDoc
    ? {
        'hx-patch': `/api/meals/${mealDoc.id}`,
      }
    : {
        'hx-post': '/api/meals',
      };

  return (
    <>
      <form {...hxAttributes}>
        <Input
          control={basicInformationForm.name}
          value={mealDoc?.name}
          label={_tShared('_shared.forms.name')}
          error={errors?.name}
        />

        <Textarea
          control={basicInformationForm.description}
          value={mealDoc?.description}
          label={_tShared('_shared.forms.description')}
          rows="5"
          error={errors?.description}
        />

        <Button type="submit">{_tShared('_shared.forms.submit')}</Button>
      </form>
    </>
  );
}
