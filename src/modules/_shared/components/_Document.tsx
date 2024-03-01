import { icons } from 'feather-icons';

import { type JWTUser, Role } from '@auth/models/user';
import type { ComponentProps } from '@types';

import { Button } from './Button';
import { Dropdown } from './Dropdown';
import { Link } from './Link';
import { $t } from '../utils/$t';
import { $tm } from '../utils/$tm';

const _t = $t('_shared');

type DocumentProps = {
  layout?: 'default' | 'none';
  user?: JWTUser;
};

export function Document({ layout = 'default', user, children }: ComponentProps<DocumentProps>) {
  function renderContent(layout: DocumentProps['layout']) {
    switch (layout) {
      case 'none':
        return <main class="flex min-h-screen items-center justify-center">{children}</main>;
      default:
        return <Layout user={user}>{children}</Layout>;
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
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css" />
          <script src="/public/scripts.js" defer></script>
        </head>

        <body hx-ext="response-targets">
          {renderContent(layout)}
          <dialog
            id="notification-portal"
            class="bottom-auto left-1/2 right-auto top-3 block min-h-min w-auto min-w-fit -translate-x-1/2"
            hx-preserve="true"
          />
          <dialog id="modal-portal" hx-preserve="true" />
          <Loader />
        </body>
      </html>
    </>
  );
}

type LayoutProps = {
  user?: JWTUser;
};

function Layout({ children, user }: ComponentProps<LayoutProps>) {
  const navigation: { name: string; href: string; isHidden?: boolean }[] = [
    { name: _t('_document.navigation.shoppingLists'), href: '/shopping-lists' },
    { name: _t('_document.navigation.meals'), href: '/meals' },
    {
      name: _t('_document.navigation.adminPanel'),
      href: '/admin-panel',
      isHidden: !user?.hasRole(Role.SuperAdmin, Role.Admin),
    },
  ];

  return (
    <div class="container">
      <nav class="sticky top-0 z-10 border-b border-b-pico-muted bg-pico-background sm:static">
        <ul>
          <li>
            <strong>
              <Link href="/">Fitex</Link>
            </strong>
          </li>
        </ul>

        <ul class="sm:hidden">
          <li>
            <button class="pico-reset" onclick="toggleMenu()">
              {icons.menu.toSvg()}
            </button>
          </li>
        </ul>

        <ul
          id="menu"
          class="absolute left-0 top-14 hidden w-full flex-col border-b-2 border-b-pico-muted bg-pico-background pb-4 sm:static sm:flex sm:w-[inherit] sm:flex-row sm:border-0 sm:bg-transparent sm:pb-[inherit]"
        >
          {navigation
            .filter(({ isHidden }) => !isHidden)
            .map(({ href, name }) => (
              <li class="w-full py-2 sm:w-auto sm:py-0">
                <Link href={href} class="m-0 w-full text-center">
                  {name}
                </Link>
              </li>
            ))}

          <li class="mt-2 w-full border-y border-pico-muted py-2 sm:mt-[inherit] sm:w-[inherit] sm:border-none sm:py-[inherit]">
            <Dropdown label={user?.username ?? ''} icon={icons.user.toSvg()} class="!hidden sm:!inline">
              <>
                <Dropdown.Item>
                  <LogoutButton />
                </Dropdown.Item>
              </>
            </Dropdown>

            <LogoutButton class="sm:hidden" />
          </li>
        </ul>
      </nav>

      <main class="pt-8">{children}</main>
    </div>
  );
}

function LogoutButton({ class: className }: ComponentProps) {
  return (
    <Button hx-get="/api/auth/logout" class={$tm('pico-reset w-full', className)}>
      {_t('_document.logout')}
    </Button>
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
