import { type JWTPayloadSpec } from '@elysiajs/jwt';
import { icons } from 'feather-icons';

import type { ComponentProps } from '@types';

import { Dropdown } from './Dropdown';

type DocumentProps = {
  layout?: 'default' | 'none';
  user: (Record<string, string | number> & JWTPayloadSpec) | null;
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
          <script src="/lib/htmx"></script>
          <script src="/lib/htmx-response-targets"></script>
          <link href="/lib/picocss" rel="stylesheet" />

          <link href="/public/styles.css" rel="stylesheet" />
          <script src="/public/scripts.js" defer></script>
        </head>

        <body id="body" hx-ext="response-targets">
          {renderContent(layout)}
        </body>
      </html>
    </>
  );
}

function Layout({ children, username }: ComponentProps<{ username: string }>) {
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Meals', href: '/meals' },
  ];

  return (
    <div class="container px-2">
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
            <button hx-get="/api/auth/logout" class="border-none">
              Logout
            </button>
          </Dropdown.Item>
        </Dropdown>
      </div>

      <main>{children}</main>
    </div>
  );
}
