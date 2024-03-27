import { Elysia } from 'elysia';

import { Document } from '@components/_Document';
import { Breadcrumbs } from '@components/Breadcrumbs';
import { CardSection } from '@components/sections/CardSection';
import { DescriptionForm } from '@meals/components/forms/DescriptionForm';
import { getBreadcrumbs } from '@meals/utils/getBreadcrumbs';
import { $t } from '@utils/$t';

import { mealContext } from './context';

export const descriptionPage = new Elysia()
  .use(mealContext)
  .get('/description', ({ request, user, mealDoc }) => (
    <Document currentUrl={request.url} user={user}>
      <>
        <Breadcrumbs
          items={getBreadcrumbs([
            { href: `/${mealDoc.id}`, label: mealDoc.name },
            { href: '/description', label: $t('_description') },
          ])}
        />

        <CardSection title={mealDoc.name}>
          <DescriptionForm mealDoc={mealDoc} />
        </CardSection>
      </>
    </Document>
  ));
