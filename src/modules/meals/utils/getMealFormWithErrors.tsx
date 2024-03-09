import { type ValidationError } from 'elysia';

import { type JWTUser } from '@auth/models/user';
import { getBodySchemaErrors } from '@utils/getBodySchemaErrors';

import { MealForm } from '../components/MealForm';
import { type MealFormErrors, type MealForm as MealFormType, mealForm } from '../forms';

export function getMealFormWithErrors(error: Readonly<ValidationError>, user: JWTUser): JSX.Element {
  const errors: MealFormErrors = getBodySchemaErrors<MealFormType>(error, mealForm);

  return <MealForm errors={errors} user={user} />;
}
