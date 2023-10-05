import '@kitajs/html/register';
import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import Html from "@kitajs/html";
import Test, { Item } from './components/Test';

const app = new Elysia()
  .use(html())
  .get("/", () => {
    const items: Item[] = [
      { name: "Dupa" },
      { name: "Cyce" }
    ];

    return (
      <BaseHtml title="Fitex">
        <>
          <h1>Hello world!</h1>

          <Test items={items}>
            <h2>Super komponent</h2>
          </Test>
        </>
      </BaseHtml>
    )
  })
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);

function BaseHtml({ children, title }: Html.PropsWithChildren<{ title: string }>) {
  return (
    <>
      {'<!doctype html>'}
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>{title}</title>
        </head>

        <body>{children}</body>
      </html>
    </>
  );
}