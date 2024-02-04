import type { ComponentProps } from '@types';

type DocumentProps = {
  layout?: 'default' | 'none';
};

export function Document({ layout = 'default', children }: ComponentProps<DocumentProps>) {
  function renderContent(layout: DocumentProps['layout']) {
    switch (layout) {
      case 'none':
        return <main class="max-h-screen">{children}</main>;
      default:
        return <Layout>{children}</Layout>;
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
        </head>

        <body id="body" hx-ext="response-targets">
          {renderContent(layout)}
        </body>
      </html>
    </>
  );
}

function Layout({ children }: ComponentProps) {
  const navigation = [{ name: 'Home', href: '/' }];

  return (
    <div class="container">
      <div class="flex justify-between">
        <nav>
          <ul hx-boost="true">
            {navigation.map(({ href, name }) => (
              <li>
                <a href={href}>{name}</a>
              </li>
            ))}
          </ul>
        </nav>

        <button hx-get="/api/auth/logout">Logout</button>
      </div>

      <main>{children}</main>
    </div>
  );
}
