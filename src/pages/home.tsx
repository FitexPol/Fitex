import { Elysia } from 'elysia';

import { setup } from '@/setup';
import { Document } from '@components/_Document';

export const homePage = new Elysia().use(setup).get('/', ({ user }) => (
  <Document>
    <>
      <h1>{`Hello ${user?.email}`}</h1>

      <button hx-get="/api/test" hx-swap="outerHTML">
        Click Me
      </button>
    </>
  </Document>
));
