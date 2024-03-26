import { Elysia } from 'elysia';

import { Document } from '@components/_Document';
import { CardSection } from '@components/sections/CardSection';
import { NameForm } from '@meals/components/forms/NameForm';
import { $t } from '@utils/$t';

import { userContext } from '../context';

export const newPage = new Elysia().use(userContext).get('/new', ({ request, user }) => (
  <Document currentUrl={request.url} user={user}>
    <CardSection title={$t('meals.createMeal')}>
      <NameForm />
    </CardSection>
  </Document>
));
