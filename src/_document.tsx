import Html from "@kitajs/html";

export default function Document({
  children,
  title,
}: Html.PropsWithChildren<{ title: string }>) {
  return (
    <>
      {"<!doctype html>"}
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>{title}</title>
          <script src="https://unpkg.com/htmx.org@1.9.6" />
          <link href="/public/styles.css" rel="stylesheet" />
        </head>

        <body>{children}</body>
      </html>
    </>
  );
}
