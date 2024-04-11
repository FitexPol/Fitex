import { Button } from '@components/Button';
import { StringInput } from '@components/inputs/StringInput';
import { type FormErrors } from '@types';
import { $t } from '@utils/$t';

import { mealNameDTO } from '../../dto/mealName';
import { type MealDoc } from '../../models/meal';

type NameFormProps = {
  mealDoc?: MealDoc;
  errors?: FormErrors<typeof mealNameDTO>;
};

export function NameForm({ mealDoc, errors }: NameFormProps) {
  const hxAttributes: Htmx.Attributes = mealDoc
    ? {
        'hx-patch': `/api/meals/${mealDoc.id}`,
      }
    : {
        'hx-post': '/api/meals',
      };

  return (
    <form {...hxAttributes}>
      <StringInput
        dto={mealNameDTO}
        name="name"
        value={mealDoc?.name}
        label={$t('_name')}
        error={errors?.name}
      />

      <Button type="submit">{Html.escapeHtml($t('_submit'))}</Button>
    </form>
  );
}
