import type { ComponentProps } from '@types';

type DocumentProps = {
  title: string;
};

export default function Document({ children, title }: ComponentProps<DocumentProps>) {
  return (
    <>
      {'<!DOCTYPE html>'}
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>{title}</title>
          <script src="https://unpkg.com/htmx.org@1.9.6" />
          <link href="/public/styles.css" rel="stylesheet" />
        </head>

        <body>{children}</body>
      </html>
    </>
  );
}
