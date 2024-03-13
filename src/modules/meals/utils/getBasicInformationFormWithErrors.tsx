import { type ValidationError } from 'elysia';

import { getBodySchemaErrors } from '@utils/getBodySchemaErrors';

import { BasicInformation } from '../components/forms/BasicInformation';
import {
  type BasicInformationForm,
  type BasicInformationFormErrors,
  basicInformationForm,
} from '../forms/basic-information';

export function getBasicInformationFormWithErrors(error: Readonly<ValidationError>): JSX.Element {
  const errors: BasicInformationFormErrors = getBodySchemaErrors<BasicInformationForm>(
    error,
    basicInformationForm,
  );

  return <BasicInformation errors={errors} />;
}
