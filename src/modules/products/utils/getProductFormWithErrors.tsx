import { type ValidationError } from 'elysia';

import { getBodySchemaErrors } from '@utils/getBodySchemaErrors';

import { ProductForm } from '../components/ProductForm';
import { type ProductFormErrors, type ProductForm as ProductFormType, productForm } from '../forms';

export function getProductFormWithErrors(error: Readonly<ValidationError>): JSX.Element {
  const errors: ProductFormErrors = getBodySchemaErrors<ProductFormType>(error, productForm);

  return <ProductForm errors={errors} />;
}
