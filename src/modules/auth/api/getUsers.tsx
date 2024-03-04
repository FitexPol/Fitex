import { Elysia } from 'elysia';

import { context } from '@/context';
import { getPath } from '@utils/getPath';
import { getQueryParams } from '@utils/getQueryParams';
import { getQueryParamSecure } from '@utils/getQueryParamSecure';
import { HxRequestHeader, HxResponseHeader } from '@vars';

export const getUsers = new Elysia().use(context).get('', ({ request, query, set }) => {
  const currentUrl = request.headers.get(HxRequestHeader.CurrentUrl);
  const queryParams = getQueryParams(currentUrl);

  set.headers[HxResponseHeader.Location] = getPath('/admin-panel/users', {
    sort: getQueryParamSecure(queryParams.sort),
    itemsPerPage: getQueryParamSecure(queryParams.itemsPerPage),
    username: getQueryParamSecure(query.username ?? queryParams.username),
    roles: getQueryParamSecure(query.roles ?? queryParams.roles),
  });
});
