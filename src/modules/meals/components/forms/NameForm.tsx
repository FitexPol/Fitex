import { Button } from '@components/Button';
import { Input } from '@components/inputs/Input';
import type { ComponentProps } from '@types';
import { $t } from '@utils/$t';

import { type NameFormErrors, nameForm } from '../../forms/name';
import { type MealDoc } from '../../models/meal';

type NameFormProps = {
  mealDoc?: MealDoc;
  errors?: NameFormErrors;
};

export function NameForm({ mealDoc, errors }: ComponentProps<NameFormProps>) {
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
        <Input control={nameForm.name} value={mealDoc?.name} label={$t('_name')} error={errors?.name} />
        <Button type="submit">{$t('_submit')}</Button>
      </form>
    </>
  );
}
