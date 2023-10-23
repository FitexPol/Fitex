import type { ComponentProps } from '../types';

type DocumentProps = {
  layout?: 'default' | 'none';
};

export default function Document({ layout = 'default', children }: ComponentProps<DocumentProps>) {
  function renderContent(layout: DocumentProps['layout']) {
    switch (layout) {
      case 'none':
        return <main>{children}</main>;
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
          <script src="/htmx"></script>
          <link href="/picocss" rel="stylesheet" />
          <link href="/public/styles.css" rel="stylesheet" />
        </head>

        <body class="min-h-screen">{renderContent(layout)}</body>
      </html>
    </>
  );
}

function Layout({ children }: ComponentProps) {
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Auth', href: '/auth' },
  ];

  return (
    <>
      <nav>
        <ul hx-boost="true">
          {navigation.map(({ href, name }) => (
            <li>
              <a href={href}>{name}</a>
            </li>
          ))}
        </ul>
      </nav>

      <main>{children}</main>
    </>
  );
}
