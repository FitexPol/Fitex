import { Elysia } from 'elysia';

import { context } from '@/context';
import { Document } from '@components/_Document';
import { BasicInformationForm } from '@shopping-lists/components/forms/BasicInformation';
import { ShoppingListFormSection } from '@shopping-lists/components/ShoppingListFormSection';
import { ShoppingList } from '@shopping-lists/models/shoppingList';
import { $t } from '@utils/$t';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';

const _t = $t('shoppingLists');

export const basicInformationFormPage = new Elysia()
  .use(context)
  .get('/basic-information-form', async ({ user, query }) => {
    const shoppingListDoc = await ShoppingList.findById(getQueryParamSecure(query.shoppingListId)).exec();

    if (!shoppingListDoc) {
      return (
        <Document user={user}>
          <span>{_t('_shared.errors.notFound')}</span>
        </Document>
      );
    }

    if (!shoppingListDoc.author._id.equals(user!.id)) {
      return (
        <Document user={user}>
          <span>{_t('_shared.errors.permissionDenied')}</span>
        </Document>
      );
    }

    return (
      <Document user={user}>
        <ShoppingListFormSection shoppingListDoc={shoppingListDoc}>
          <BasicInformationForm shoppingListDoc={shoppingListDoc} />
        </ShoppingListFormSection>
      </Document>
    );
  });
