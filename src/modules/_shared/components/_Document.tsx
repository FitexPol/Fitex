import { icons } from 'feather-icons';

import type { ComponentProps, JWTUser } from '@types';

import { Button } from './Button';
import { Dropdown } from './Dropdown';
import { Link } from './Link';
import { $t } from '../utils/$t';

const _t = $t('_shared');

type DocumentProps = {
  layout?: 'default' | 'none';
  user: JWTUser | null;
};

export function Document({ layout = 'default', user, children }: ComponentProps<DocumentProps>) {
  function renderContent(layout: DocumentProps['layout']) {
    switch (layout) {
      case 'none':
        return <main class="flex min-h-screen items-center justify-center">{children}</main>;
      default:
        return <Layout username={user ? user.username : ''}>{children}</Layout>;
    }
  }

  return (
    <>
      {'<!DOCTYPE html>'}
      <html lang="pl-PL">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Fitex</title>
          <script src="https://unpkg.com/htmx.org@1.9.10"></script>
          <script src="https://unpkg.com/htmx.org/dist/ext/response-targets.js"></script>
          <meta name="color-scheme" content="light dark" />

          <link href="/public/styles.css" rel="stylesheet" />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.cyan.min.css" />
          <script src="/public/scripts.js" defer></script>
        </head>

        <body hx-ext="response-targets">
          {renderContent(layout)}
          <dialog
            id="notification-portal"
            class="bottom-auto left-1/2 right-auto top-3 block min-h-min w-auto min-w-fit -translate-x-1/2"
            hx-preserve="true"
          />
          <Loader />
        </body>
      </html>
    </>
  );
}

const navigation = [
  { name: _t('_document.navigation.shoppingLists'), href: '/shopping-lists' },
  { name: _t('_document.navigation.meals'), href: '/meals' },
];

function Layout({ children, username }: ComponentProps<{ username: string }>) {
  return (
    <div class="container">
      <nav>
        <ul>
          <li>
            <strong>
              <Link href="/">Fitex</Link>
            </strong>
          </li>
        </ul>

        <ul>
          {navigation.map(({ href, name }) => (
            <li>
              <Link href={href}>{name}</Link>
            </li>
          ))}

          <li>
            <Dropdown label={username} icon={icons.user.toSvg()}>
              <Dropdown.Item>
                <Button hx-get="/api/auth/logout" class="pico-reset w-full">
                  {_t('_document.logout')}
                </Button>
              </Dropdown.Item>
            </Dropdown>
          </li>
        </ul>
      </nav>

      <main class="pt-8">{children}</main>
    </div>
  );
}

function Loader() {
  return (
    <div id="loader" class="loader-indicator fixed bottom-4 right-4" hx-preserve="true">
      <div
        class="relative inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
      </div>
    </div>
  );
}
