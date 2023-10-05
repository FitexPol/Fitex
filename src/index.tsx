import "@kitajs/html/register";
import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";

import { routes } from "./routes";
import { api } from "./api";

const app = new Elysia()
  .use(staticPlugin())
  .use(html())
  .use(routes)
  .use(api)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
