import { icons } from 'feather-icons';

import { type User } from '@auth/models/user';
import type { ComponentProps } from '@types';

import { Button } from './Button';
import { Dropdown } from './Dropdown';

type DocumentProps = {
  layout?: 'default' | 'none';
  user: User | null;
};

export function Document({ layout = 'default', user, children }: ComponentProps<DocumentProps>) {
  function renderContent(layout: DocumentProps['layout']) {
    switch (layout) {
      case 'none':
        return <main class="max-h-screen">{children}</main>;
      default:
        return <Layout username={user ? (user.username as string) : ''}>{children}</Layout>;
    }
  }

  return (
    <>
      {'<!DOCTYPE html>'}
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Fitex</title>
          <script src="https://unpkg.com/htmx.org@1.9.10"></script>
          <script src="https://unpkg.com/htmx.org/dist/ext/response-targets.js"></script>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@1.5.10/css/pico.min.css" />

          <link href="/public/styles.css" rel="stylesheet" />
          <script src="/public/scripts.js" defer></script>
        </head>

        <body id="body" hx-ext="response-targets">
          {renderContent(layout)}
          <dialog id="modal-portal"></dialog>
        </body>
      </html>
    </>
  );
}

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Meals', href: '/meals' },
];

function Layout({ children, username }: ComponentProps<{ username: string }>) {
  return (
    <div class="container">
      <div class="flex items-center justify-between">
        <nav>
          <ul hx-boost="true">
            {navigation.map(({ href, name }) => (
              <li>
                <a href={href}>{name}</a>
              </li>
            ))}
          </ul>
        </nav>

        <Dropdown label={username} icon={icons.user.toSvg()}>
          <Dropdown.Item>
            <Button hx-get="/api/auth/logout" class="border-none">
              Logout
            </Button>
          </Dropdown.Item>
        </Dropdown>
      </div>

      <main class="pt-8">{children}</main>
    </div>
  );
}
