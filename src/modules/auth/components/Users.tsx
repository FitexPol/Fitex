import { icons } from 'feather-icons';

import { Dropdown } from '@components/Dropdown';
import { Input } from '@components/inputs/Input';
import { Link } from '@components/Link';
import { Pagination } from '@components/Pagination';
import { Table } from '@components/Table';
import type { ComponentProps, SortOption } from '@types';
import { $t } from '@utils/$t';
import { getItemsPerPageOption } from '@utils/getItemPerPageOption';
import { getPage } from '@utils/getPage';
import { getPath } from '@utils/getPath';
import { getSkipValue } from '@utils/getSkipValue';
import { itemsPerPageOptions } from '@vars';

import { Role, User, type UserDoc } from '../models/user';

const _t = $t('auth');
const _tShared = $t('_shared');

enum SortQuery {
  usernameAsc = 'username-asc',
  usernameDesc = 'username-desc',
  RolesAsc = 'roles-asc',
  RolesDesc = 'roles-desc',
}

type UsersProps = {
  usernameQuery: string;
  rolesQuery: string;
  sortQuery: string;
  itemsPerPageQuery: string;
  pageQuery: string;
};

export async function Users({
  usernameQuery,
  rolesQuery,
  sortQuery,
  itemsPerPageQuery,
  pageQuery,
}: ComponentProps<UsersProps>) {
  const { label: sortLabel, value: sortValue }: UsersSortOption = getSortOption(sortQuery);
  const itemsPerPage: number = getItemsPerPageOption(itemsPerPageQuery);
  const page = getPage(pageQuery);

  const totalUserDocs = await User.countDocuments({
    username: { $regex: new RegExp(usernameQuery, 'i') },
    roles: { $regex: new RegExp(rolesQuery, 'i') },
  });

  const userDocs = await User.find({
    username: { $regex: new RegExp(usernameQuery, 'i') },
    roles: { $regex: new RegExp(rolesQuery, 'i') },
  })
    .skip(getSkipValue(page, itemsPerPage))
    .limit(itemsPerPage)
    .sort(sortValue)
    .exec();

  return (
    <div id="users">
      <div class="flex flex-col justify-between gap-y-4 sm:flex-row sm:justify-end">
        <Dropdown label={`${_tShared('_shared.itemsPerPage')}: ${itemsPerPage}`}>
          <>
            {itemsPerPageOptions.map(({ label, query }) => (
              <Dropdown.Item active={query === itemsPerPage.toString()}>
                <Link
                  href={getPath('/admin-panel/users', {
                    itemsPerPage: query,
                    sort: sortQuery,
                    username: usernameQuery,
                    roles: rolesQuery,
                  })}
                >
                  {label}
                </Link>
              </Dropdown.Item>
            ))}
          </>
        </Dropdown>
      </div>

      <fieldset class="mb-6 mt-4 grid !gap-y-0 md:mb-0 md:grid-cols-2">
        <Input
          control={{ name: 'username', type: 'search', placeholder: 'auth.users.filters.username' }}
          value={usernameQuery}
          hx-get="/api/auth/users"
          hx-trigger="input changed delay:500ms, search"
        />

        <Dropdown label={`${_t('users.filters.roles')}: ${rolesQuery || _tShared(`_shared.all`)}`}>
          <>
            <Dropdown.Item active={!rolesQuery}>
              <Link
                href={getPath('/admin-panel/users', {
                  itemsPerPage: itemsPerPageQuery,
                  sort: sortQuery,
                  username: usernameQuery,
                })}
              >
                {_tShared(`_shared.all`)}
              </Link>
            </Dropdown.Item>

            {Object.values(Role).map((value) => (
              <Dropdown.Item active={value === rolesQuery}>
                <Link
                  href={getPath('/admin-panel/users', {
                    itemsPerPage: itemsPerPageQuery,
                    sort: sortQuery,
                    username: usernameQuery,
                    roles: value,
                  })}
                >
                  {value}
                </Link>
              </Dropdown.Item>
            ))}
          </>
        </Dropdown>
      </fieldset>

      <Table>
        <>
          <Table.Header>
            <>
              <Table.Header.Item>
                <Link
                  href={getPath('/admin-panel/users', {
                    sort:
                      sortLabel === SortQuery.usernameAsc ? SortQuery.usernameDesc : SortQuery.usernameAsc,
                    itemsPerPage: itemsPerPageQuery,
                    username: usernameQuery,
                    roles: rolesQuery,
                  })}
                  class="inline-flex items-center gap-1"
                >
                  <>
                    {_t('_shared.username')}
                    {sortLabel === SortQuery.usernameAsc && icons['arrow-up'].toSvg()}
                    {sortLabel === SortQuery.usernameDesc && icons['arrow-down'].toSvg()}
                  </>
                </Link>
              </Table.Header.Item>

              <Table.Header.Item>
                <Link
                  href={getPath('/admin-panel/users', {
                    sort: sortLabel === SortQuery.RolesAsc ? SortQuery.RolesDesc : SortQuery.RolesAsc,
                    itemsPerPage: itemsPerPageQuery,
                    username: usernameQuery,
                    roles: rolesQuery,
                  })}
                  class="inline-flex items-center gap-1"
                >
                  <>
                    {_t('_shared.roles')}
                    {sortLabel === SortQuery.RolesAsc && icons['arrow-up'].toSvg()}
                    {sortLabel === SortQuery.RolesDesc && icons['arrow-down'].toSvg()}
                  </>
                </Link>
              </Table.Header.Item>

              <Table.Header.Item>{_tShared('_shared.actions')}</Table.Header.Item>
            </>
          </Table.Header>

          <Table.Body>
            <>
              {userDocs.map(({ id, username, roles }) => (
                <Table.Body.Row firstItem={username}>
                  <>
                    <Table.Body.Row.Cell>
                      {roles.reduce((acc, role) => {
                        return acc.length ? `${acc}, ${role}` : role;
                      }, '')}
                    </Table.Body.Row.Cell>

                    <Table.Body.Row.Cell>
                      <Link href={getPath('/admin-panel/users/form', { userId: id })}>
                        {icons.edit.toSvg()}
                      </Link>
                    </Table.Body.Row.Cell>
                  </>
                </Table.Body.Row>
              ))}
            </>
          </Table.Body>
        </>
      </Table>

      <Pagination
        itemsPerPage={itemsPerPage}
        page={page}
        totalCount={totalUserDocs}
        path="/admin-panel/users"
        currentQuery={{
          itemsPerPage: itemsPerPageQuery,
          sort: sortQuery,
          username: usernameQuery,
          roles: rolesQuery,
        }}
      />
    </div>
  );
}

type SortValues = Record<keyof UserDoc, -1 | 1>;
type UsersSortOption = SortOption<Pick<SortValues, 'username'> | Pick<SortValues, 'roles'>>;

function getSortOption(queryParam: string): UsersSortOption {
  switch (queryParam) {
    case SortQuery.usernameDesc:
      return {
        label: SortQuery.usernameDesc,
        value: { username: -1 },
      };
    case SortQuery.RolesAsc:
      return {
        label: SortQuery.RolesAsc,
        value: { roles: 1 },
      };
    case SortQuery.RolesDesc:
      return {
        label: SortQuery.RolesDesc,
        value: { roles: -1 },
      };
    default:
      return {
        label: SortQuery.usernameAsc,
        value: { username: 1 },
      };
  }
}
