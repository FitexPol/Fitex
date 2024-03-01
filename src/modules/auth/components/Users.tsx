import { icons } from 'feather-icons';

import { Link } from '@components/Link';
import { Table } from '@components/Table';
import { $t } from '@utils/$t';
import { getPath } from '@utils/getPath';

import { User } from '../models/user';

const _t = $t('auth');
const _tShared = $t('_shared');

export async function Users() {
  const userDocs = await User.find().limit(50).sort({ username: 1 }).exec();

  return (
    <Table>
      <>
        <Table.Header>
          <>
            <Table.Header.Item>{_t('_shared.username')}</Table.Header.Item>
            <Table.Header.Item>{_t('_shared.roles')}</Table.Header.Item>
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
  );
}
