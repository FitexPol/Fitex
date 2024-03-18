import { type ValidationError } from 'elysia';

import { getBodySchemaErrors } from '@utils/api/getBodySchemaErrors';

import { BasicInformationForm } from '../components/forms/BasicInformationForm';
import {
  type BasicInformationFormErrors,
  type BasicInformationForm as BasicInformationFormType,
  basicInformationForm,
} from '../forms/basicInformation';

export function getBasicInformationFormWithErrors(error: Readonly<ValidationError>): JSX.Element {
  const errors: BasicInformationFormErrors = getBodySchemaErrors<BasicInformationFormType>(
    error,
    basicInformationForm,
  );

  return <BasicInformationForm errors={errors} />;
}
