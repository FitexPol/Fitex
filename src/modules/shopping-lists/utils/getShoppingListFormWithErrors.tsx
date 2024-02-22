import { type ValidationError } from 'elysia';

import { type User } from '@auth/models/user';
import { getBodySchemaErrors } from '@utils/getBodySchemaErrors';

import { ShoppingListForm } from '../components/ShoppingListForm';
import {
  type ShoppingListFormErrors,
  type ShoppingListForm as ShoppingListFormType,
  shoppingListForm,
} from '../forms';

export function getShoppingListFormWithErrors(error: Readonly<ValidationError>, user: User): JSX.Element {
  const errors: ShoppingListFormErrors = getBodySchemaErrors<ShoppingListFormType>(error, shoppingListForm);

  return <ShoppingListForm user={user} errors={errors} />;
}
