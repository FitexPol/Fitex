import { Elysia } from 'elysia';

import { context } from '@/context';
import { Document } from '@components/_Document';
import { FormSection } from '@components/sections/FormSection';
import { BasicInformationForm } from '@shopping-lists/components/forms/BasicInformationForm';
import { ShoppingList } from '@shopping-lists/models/shoppingList';
import { $t } from '@utils/$t';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';

export const basicInformationFormPage = new Elysia()
  .use(context)
  .get('/basic-information-form', async ({ user, query }) => {
    if (!query.id) {
      return (
        <Document user={user}>
          <FormSection title={$t('_basicInformation')} floatingLinkHref="/shopping-lists">
            <BasicInformationForm />
          </FormSection>
        </Document>
      );
    }

    const shoppingListDoc = await ShoppingList.findById(getQueryParamSecure(query.id)).exec();

    if (!shoppingListDoc) {
      return (
        <Document user={user}>
          <span>{$t('_errors.notFound')}</span>
        </Document>
      );
    }

    if (!shoppingListDoc.author._id.equals(user!.id)) {
      return (
        <Document user={user}>
          <span>{$t('_errors.permissionDenied')}</span>
        </Document>
      );
    }

    return (
      <Document user={user}>
        <FormSection title={shoppingListDoc.name} floatingLinkHref={`/shopping-lists/${shoppingListDoc.id}`}>
          <BasicInformationForm shoppingListDoc={shoppingListDoc} />
        </FormSection>
      </Document>
    );
  });
