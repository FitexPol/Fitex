import { icons } from 'feather-icons';

import { Button } from '@components/Button';
import { Table } from '@components/Table';
import { $t } from '@utils/$t';

import { User } from '../models/user';

const _t = $t('auth');
const _tShared = $t('_shared');

export async function Users() {
  const userDocs = await User.find().limit(50).sort({ username: 1 }).exec();

  return (
    <div id="users-table">
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
                      <Button
                        class="pico-reset"
                        hx-get={`/api/auth/users/${id}/modal`}
                        hx-target="#modal-portal"
                        hx-indicator="#loader"
                      >
                        {icons.edit.toSvg()}
                      </Button>
                    </Table.Body.Row.Cell>
                  </>
                </Table.Body.Row>
              ))}
            </>
          </Table.Body>
        </>
      </Table>
    </div>
  );
}
