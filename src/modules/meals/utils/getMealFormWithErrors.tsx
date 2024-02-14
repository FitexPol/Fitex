import { type ValidationError } from 'elysia';

import { getBodySchemaErrors } from '@utils/getBodySchemaErrors';

import { MealForm } from '../components/MealForm';
import { type MealFormErrors, type MealForm as MealFormType, mealForm } from '../forms';

export function getMealFormWithErrors(error: Readonly<ValidationError>): JSX.Element {
  const errors: MealFormErrors = getBodySchemaErrors<MealFormType>(error, mealForm);

  return <MealForm errors={errors} />;
}
