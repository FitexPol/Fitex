import { Button } from '@components/Button';
import { Input } from '@components/inputs/Input';
import { Textarea } from '@components/inputs/Textarea';
import type { ComponentProps } from '@types';
import { $t } from '@utils/$t';

import { type BasicInformationFormErrors, basicInformationForm } from '../../forms/basicInformation';
import { type MealDoc } from '../../models/meal';

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
          label={$t('_name')}
          error={errors?.name}
        />

        <Textarea
          control={basicInformationForm.description}
          value={mealDoc?.description}
          label={$t('_description')}
          rows="5"
          error={errors?.description}
        />

        <Button type="submit">{$t('_submit')}</Button>
      </form>
    </>
  );
}
