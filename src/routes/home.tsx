import Elysia from 'elysia';

import Document from '@components/Document';

export const home = new Elysia().get('/', () => (
  <Document>
    <>
      <h1>Hello world!</h1>

      <button hx-get="/api/test" hx-swap="outerHTML">
        Click Me
      </button>
    </>
  </Document>
));
