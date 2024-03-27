import { Elysia } from 'elysia';

import { Document } from '@components/_Document';
import { CardSection } from '@components/sections/CardSection';
import { DescriptionForm } from '@meals/components/forms/DescriptionForm';
import { MealBreadcrumbs } from '@meals/components/MealBreadcrumbs';
import { $t } from '@utils/$t';

import { mealContext } from './context';

export const descriptionPage = new Elysia()
  .use(mealContext)
  .get('/description', ({ request, user, mealDoc }) => (
    <Document currentUrl={request.url} user={user}>
      <>
        <MealBreadcrumbs
          items={[
            { href: `/${mealDoc.id}`, label: mealDoc.name },
            { href: '/description', label: $t('_description') },
          ]}
        />

        <CardSection title={mealDoc.name}>
          <DescriptionForm mealDoc={mealDoc} />
        </CardSection>
      </>
    </Document>
  ));
