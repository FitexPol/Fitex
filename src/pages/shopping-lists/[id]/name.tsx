import { Elysia } from 'elysia';

import { Document } from '@components/_Document';
import { CardSection } from '@components/sections/CardSection';
import { NameForm } from '@shopping-lists/components/forms/NameForm';
import { ShoppingListBreadcrumbs } from '@shopping-lists/components/ShoppingListBreadcrumbs';
import { $t } from '@utils/$t';

import { shoppingListContext } from './context';

export const namePage = new Elysia()
  .use(shoppingListContext)
  .get('/name', ({ request, user, shoppingListDoc }) => (
    <Document currentUrl={request.url} user={user}>
      <ShoppingListBreadcrumbs
        items={[
          { href: `/${shoppingListDoc.id}`, label: shoppingListDoc.name },
          { href: '/name', label: $t('_name') },
        ]}
      />

      <CardSection title={shoppingListDoc.name}>
        <NameForm shoppingListDoc={shoppingListDoc} />
      </CardSection>
    </Document>
  ));
