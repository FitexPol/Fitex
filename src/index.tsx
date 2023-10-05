import { Elysia } from "elysia";
import { html } from '@elysiajs/html';
import * as elements from "typed-html";

const app = new Elysia()
  .use(html())
  .get("/", ({ html }) =>
    html(
      <BaseHtml>
        <TestList />
      </BaseHtml>
    )
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

function BaseHtml({ children }: elements.Children) {
  return `
    <!DOCKTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Fitex</title>
    </head>
    <body>${children}</body>
  `;
}

type ListItem = {
  name: string;
}

function TestList() {
  const items: ListItem[] = [
    { name: "Dupa" },
    { name: "Cyce" }
  ];

  return (
    <div>
      <h1>Elo cycu może jakiś callpage?</h1>
      
      <ul>
        {items.map(({ name }) => <li>{name}</li>)}
      </ul>
    </div>
  );
}