import { Elysia } from 'elysia';

import { context } from '@/context';
import { Document } from '@components/_Document';

export const homePage = new Elysia().use(context).get('/', ({ user }) => (
  <Document>
    <>
      <h1>{`Hello ${user?.email}`}</h1>

      <button hx-get="/api/test" hx-swap="outerHTML">
        Click Me
      </button>
    </>
  </Document>
));
