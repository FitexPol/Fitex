import { type ValidationError } from 'elysia';

import { getBodySchemaErrors } from '@utils/getBodySchemaErrors';

import { CategoryForm } from '../components/CategoryForm';
import { type CategoryFormErrors, type CategoryForm as CategoryFormType, categoryForm } from '../forms';

export function getCategoryFormWithErrors(error: Readonly<ValidationError>): JSX.Element {
  const errors: CategoryFormErrors = getBodySchemaErrors<CategoryFormType>(error, categoryForm);

  return <CategoryForm errors={errors} />;
}
