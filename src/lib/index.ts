import Elysia from 'elysia';

const nodeModulesDir = `${import.meta.dir}/../../node_modules/`;

export const lib = new Elysia().group('/lib', (app) =>
  app
    .get('/picocss', () => Bun.file(`${nodeModulesDir}@picocss/pico/css/pico.min.css`))
    .get('/htmx', () => Bun.file(`${nodeModulesDir}htmx.org/dist/htmx.min.js`))
    .get('/htmx-response-targets', () => Bun.file(`${nodeModulesDir}htmx.org/dist/ext/response-targets.js`)),
);
