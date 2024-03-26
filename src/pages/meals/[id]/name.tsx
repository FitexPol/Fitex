import { Elysia } from 'elysia';

import { Document } from '@components/_Document';
import { CardSection } from '@components/sections/CardSection';
import { NameForm } from '@meals/components/forms/NameForm';

import { mealContext } from './context';

export const namePage = new Elysia().use(mealContext).get('/name', ({ request, user, mealDoc }) => (
  <Document currentUrl={request.url} user={user}>
    <CardSection title={mealDoc.name}>
      <NameForm mealDoc={mealDoc} />
    </CardSection>
  </Document>
));
