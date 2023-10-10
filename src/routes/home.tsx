import Elysia from 'elysia';
import Document from '@components/Document';

export const home = new Elysia().get('/', () => (
  <Document title="Fitex">
    <>
      <h1>Hello world!</h1>

      <button hx-get="/api/test" hx-swap="outerHTML" class="text-red-500">
        Click Me
      </button>
    </>
  </Document>
));
