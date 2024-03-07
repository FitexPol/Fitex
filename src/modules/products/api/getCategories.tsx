import { Elysia } from 'elysia';

import { getPath } from '@utils/getPath';
import { getQueryParams } from '@utils/getQueryParams';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';
import { HxRequestHeader, HxResponseHeader } from '@vars';

export const getCategories = new Elysia().get('', ({ request, query, set }) => {
  const currentUrl = request.headers.get(HxRequestHeader.CurrentUrl);
  const queryParams = getQueryParams(currentUrl);

  set.headers[HxResponseHeader.Location] = getPath('/admin-panel/categories', {
    sort: getQueryParamSecure(queryParams.sort),
    itemsPerPage: getQueryParamSecure(queryParams.itemsPerPage),
    'name.pl-PL': getQueryParamSecure(query['name.pl-PL'] ?? queryParams['name.pl-PL']),
  });
});