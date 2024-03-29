import { icons } from 'feather-icons';

import { type JWTUser } from '@auth/models/user';

import { Button } from './Button';
import { Dropdown } from './Dropdown';
import { FloatingLink } from './FloatingLink';
import { Link } from './Link';
import { type PropsWithClass } from '../types';
import { $t } from '../utils/$t';
import { $tm } from '../utils/$tm';

type DocumentProps = {
  currentUrl: string;
  layout?: 'default' | 'none';
  user?: JWTUser;
  isBackButtonVisible?: boolean;
};

export function Document({
  currentUrl,
  layout = 'default',
  user,
  isBackButtonVisible = true,
  children,
}: Html.PropsWithChildren<DocumentProps>) {
  function renderContent(layout: DocumentProps['layout']) {
    switch (layout) {
      case 'none':
        return <main class="flex min-h-[90vh] items-center justify-center">{children}</main>;
      default:
        return <Layout user={user}>{children}</Layout>;
    }
  }

  console.log(layout);

  return (
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
        <script src="/public/scripts.js" defer />
      </head>

      <body hx-ext="response-targets" hx-history="false" class="pb-16">
        {renderContent(layout)}
        <dialog
          id="notification-portal"
          class="bottom-auto left-1/2 right-auto top-3 block min-h-min w-auto min-w-fit -translate-x-1/2"
          hx-preserve="true"
        />
        <dialog id="modal-portal" hx-preserve="true" />
        <Loader />
        {isBackButtonVisible && Html.escapeHtml(<BackButton currentUrl={currentUrl} />)}
      </body>
    </html>
  );
}

type LayoutProps = {
  user?: JWTUser;
};

function Layout({ children, user }: Html.PropsWithChildren<LayoutProps>) {
  const navigation: { name: string; href: string; isHidden?: boolean }[] = [
    { name: $t('shoppingLists'), href: '/shopping-lists' },
    { name: $t('meals'), href: '/meals' },
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
          <li>{user?.username ?? ''}</li>
          <li>
            <button class="pico-reset" onclick="toggleMenu()" safe>
              {icons.menu.toSvg()}
            </button>
          </li>
        </ul>

        <ul
          id="menu"
          class={$tm(
            'absolute left-1/2 top-14 hidden h-[calc(100vh-3.5rem)] w-screen -translate-x-1/2 flex-col border-b-2 border-b-pico-muted bg-black/50 pb-4',
            'sm:static sm:flex sm:h-auto sm:w-[inherit] sm:transform-none sm:flex-row sm:border-0 sm:bg-transparent sm:pb-[inherit]',
          )}
        >
          {navigation
            .filter(({ isHidden }) => !isHidden)
            .map(({ href, name }) => (
              <li class="w-full bg-pico-background py-2 sm:w-auto sm:py-0" onclick="event.stopPropagation()">
                <Link href={href} class="m-0 w-full text-center">
                  {Html.escapeHtml(name)}
                </Link>
              </li>
            ))}

          <li
            class="w-full border-y border-pico-muted bg-pico-background py-2 sm:mt-[inherit] sm:w-[inherit] sm:border-none sm:py-[inherit]"
            onclick="event.stopPropagation()"
          >
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

function LogoutButton({ class: className }: PropsWithClass) {
  return (
    <Button hx-get="/api/auth/logout" class={$tm('pico-reset w-full', className)}>
      {Html.escapeHtml($t('_logout'))}
    </Button>
  );
}

type BackButtonProps = {
  currentUrl: string;
};

function BackButton({ currentUrl }: BackButtonProps) {
  const segments: string[] = currentUrl.split('/').filter(Boolean).slice(2);
  segments.pop();

  return <FloatingLink href={`/${segments.join('/')}`} icon={{ type: 'arrow-left' }} />;
}

function Loader() {
  return (
    <div id="loader" class="fixed left-0 right-0 top-0 z-50 h-0" hx-preserve="true">
      <div class="size-full origin-left scale-x-0 bg-pico-primary transition-transform ease-linear" />
    </div>
  );
}
