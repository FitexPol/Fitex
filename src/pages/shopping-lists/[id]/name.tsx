import { Elysia } from 'elysia';

import { Document } from '@components/_Document';
import { Breadcrumbs } from '@components/Breadcrumbs';
import { CardSection } from '@components/sections/CardSection';
import { NameForm } from '@shopping-lists/components/forms/NameForm';
import { getBreadcrumbs } from '@shopping-lists/utils/getBreadcrumbs';
import { $t } from '@utils/$t';

import { shoppingListContext } from './context';

export const namePage = new Elysia()
  .use(shoppingListContext)
  .get('/name', ({ request, user, shoppingListDoc }) => (
    <Document currentUrl={request.url} user={user}>
      <>
        <Breadcrumbs
          items={getBreadcrumbs([
            { href: `/${shoppingListDoc.id}`, label: shoppingListDoc.name },
            { href: '/name', label: $t('_name') },
          ])}
        />

        <CardSection title={shoppingListDoc.name}>
          <NameForm shoppingListDoc={shoppingListDoc} />
        </CardSection>
      </>
    </Document>
  ));
