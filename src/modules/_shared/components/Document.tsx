import type { ComponentProps } from '../types';

export default function Document({ children }: ComponentProps) {
  return (
    <>
      {'<!DOCTYPE html>'}
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Fitex</title>
          <script src="https://unpkg.com/htmx.org@1.9.6"></script>
          <link href="/public/styles.css" rel="stylesheet" />
        </head>

        <body class="bg-green-50">{children}</body>
      </html>
    </>
  );
}
