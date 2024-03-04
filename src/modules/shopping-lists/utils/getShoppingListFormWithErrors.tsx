import { type ValidationError } from 'elysia';

import { type JWTUser } from '@auth/models/user';
import { getBodySchemaErrors } from '@utils/getBodySchemaErrors';

import { ShoppingListForm } from '../components/ShoppingListForm';
import {
  type ShoppingListFormErrors,
  type ShoppingListForm as ShoppingListFormType,
  shoppingListForm,
} from '../forms';

export function getShoppingListFormWithErrors(error: Readonly<ValidationError>, user: JWTUser): JSX.Element {
  const errors: ShoppingListFormErrors = getBodySchemaErrors<ShoppingListFormType>(error, shoppingListForm);

  return <ShoppingListForm user={user} errors={errors} />;
}