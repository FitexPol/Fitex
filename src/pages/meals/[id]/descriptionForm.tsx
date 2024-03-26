import { Elysia } from 'elysia';

import { Document } from '@components/_Document';
import { FormSection } from '@components/sections/FormSection';
import { DescriptionForm } from '@meals/components/forms/DescriptionForm';

import { mealContext } from './context';

export const descriptionFormPage = new Elysia()
  .use(mealContext)
  .get('/description-form', ({ request, user, mealDoc }) => {
    return (
      <Document currentUrl={request.url} user={user}>
        <FormSection title={mealDoc.name}>
          <DescriptionForm mealDoc={mealDoc} />
        </FormSection>
      </Document>
    );
  });
