import "@kitajs/html/register";
import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import Html from "@kitajs/html";
import Test, { Item } from "./components/Test";

const app = new Elysia()
  .use(html())
  .get("/", () => {
    return (
      <BaseHtml title="Fitex">
        <>
          <h1>Hello world!</h1>

          <button hx-get="/test" hx-swap="outerHTML">
            Click Me
          </button>
        </>
      </BaseHtml>
    );
  })
  .get("/test", () => {
    const items: Item[] = [
      { name: "Dupa" },
      { name: "Cyce" }
    ];

    return (
      <Test items={items}>
        <h2>Super komponent</h2>
      </Test>
    );
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

function BaseHtml({
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
          <script src="https://unpkg.com/htmx.org@1.9.6"></script>
        </head>

        <body>{children}</body>
      </html>
    </>
  );
}
