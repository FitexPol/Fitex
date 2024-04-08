import { Button } from '@components/Button';
import { Textarea } from '@components/inputs/Textarea';
import { $t } from '@utils/$t';

import { type DescriptionFormErrors, descriptionForm } from '../../forms/description';
import { type MealDoc } from '../../models/meal';

type DescriptionFormProps = {
  mealDoc: MealDoc;
  errors?: DescriptionFormErrors;
};

export function DescriptionForm({ mealDoc, errors }: DescriptionFormProps) {
  return (
    <form hx-patch={`/api/meals/${mealDoc.id}/description`}>
      <Textarea
        control={descriptionForm.description}
        value={mealDoc.description}
        label={$t('_description')}
        rows="5"
        error={errors?.description}
      />

      <Button type="submit">{Html.escapeHtml($t('_submit'))}</Button>
    </form>
  );
}
