import { Elysia } from 'elysia';

import { Document } from '@components/_Document';
import { FormSection } from '@components/sections/FormSection';
import { NameForm } from '@shopping-lists/components/forms/NameForm';
import { ShoppingList } from '@shopping-lists/models/shoppingList';
import { $t } from '@utils/$t';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';

import { userContext } from '../context';

export const nameFormPage = new Elysia()
  .use(userContext)
  .get('/name-form', async ({ request, user, query }) => {
    if (!query.id) {
      return (
        <Document currentUrl={request.url} user={user}>
          <FormSection title={$t('shoppingLists.createShoppingList')}>
            <NameForm />
          </FormSection>
        </Document>
      );
    }

    const shoppingListDoc = await ShoppingList.findById(getQueryParamSecure(query.id)).exec();

    if (!shoppingListDoc) {
      return (
        <Document currentUrl={request.url} user={user}>
          <span>{$t('_errors.notFound')}</span>
        </Document>
      );
    }

    if (!shoppingListDoc.author._id.equals(user.id)) {
      return (
        <Document currentUrl={request.url} user={user}>
          <span>{$t('_errors.permissionDenied')}</span>
        </Document>
      );
    }

    return (
      <Document currentUrl={request.url} user={user}>
        <FormSection title={shoppingListDoc.name}>
          <NameForm shoppingListDoc={shoppingListDoc} />
        </FormSection>
      </Document>
    );
  });
