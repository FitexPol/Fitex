import { Elysia } from 'elysia';

import { context } from '@/context';
import { Document } from '@components/_Document';
import { FormSection } from '@components/sections/FormSection';
import { BasicInformationForm } from '@shopping-lists/components/forms/BasicInformationForm';
import { ShoppingList } from '@shopping-lists/models/shoppingList';
import { $t } from '@utils/$t';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';

const _t = $t('shoppingLists');

export const basicInformationFormPage = new Elysia()
  .use(context)
  .get('/basic-information-form', async ({ user, query }) => {
    if (!query.id) {
      return (
        <Document user={user}>
          <FormSection title={_t('basicInformationFormPage.title')}>
            <BasicInformationForm />
          </FormSection>
        </Document>
      );
    }

    const shoppingListDoc = await ShoppingList.findById(getQueryParamSecure(query.id)).exec();

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
        <FormSection title={shoppingListDoc.name}>
          <BasicInformationForm shoppingListDoc={shoppingListDoc} />
        </FormSection>
      </Document>
    );
  });
