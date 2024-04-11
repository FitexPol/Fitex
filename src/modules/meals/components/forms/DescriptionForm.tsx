import { Button } from '@components/Button';
import { Textarea } from '@components/inputs/Textarea';
import { type FormErrors } from '@types';
import { $t } from '@utils/$t';

import { mealDescriptionDTO } from '../../dto/mealDescription';
import { type MealDoc } from '../../models/meal';

type DescriptionFormProps = {
  mealDoc: MealDoc;
  errors?: FormErrors<typeof mealDescriptionDTO>;
};

export function DescriptionForm({ mealDoc, errors }: DescriptionFormProps) {
  return (
    <form hx-patch={`/api/meals/${mealDoc.id}/description`}>
      <Textarea
        dto={mealDescriptionDTO}
        name="description"
        value={mealDoc.description}
        label={$t('_description')}
        rows="5"
        error={errors?.description}
      />

      <Button type="submit">{Html.escapeHtml($t('_submit'))}</Button>
    </form>
  );
}
