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
        return <main class="max-h-screen">{children}</main>;
      default:
        return <Layout username={user ? user.username : ''}>{children}</Layout>;
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
          <Loader />
        </body>
      </html>
    </>
  );
}

const navigation = [
  { name: _t('_document.navigation.home'), href: '/' },
  { name: _t('_document.navigation.shoppingLists'), href: '/shopping-lists' },
  { name: _t('_document.navigation.meals'), href: '/meals' },
];

function Layout({ children, username }: ComponentProps<{ username: string }>) {
  return (
    <div class="container">
      <div class="flex items-center justify-between">
        <nav>
          <ul>
            {navigation.map(({ href, name }) => (
              <li>
                <Link href={href}>{name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <Dropdown label={username} icon={icons.user.toSvg()}>
          <Dropdown.Item>
            <Button hx-get="/api/auth/logout" class="border-none">
              {_t('_document.logout')}
            </Button>
          </Dropdown.Item>
        </Dropdown>
      </div>

      <main class="pt-8">{children}</main>
    </div>
  );
}

function Loader() {
  return (
    <div id="loader" class="loader-indicator fixed bottom-4 right-4">
      <div
        class="relative inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
      </div>
    </div>
  );
}
