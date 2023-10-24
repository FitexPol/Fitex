import type { App } from '@/app';
import Document from '@components/Document';

export const home = (app: App) =>
  app.get('/', ({ user }) => (
    <Document>
      <>
        <h1>{`Hello ${user?.email}`}</h1>

        <button hx-get="/api/test" hx-swap="outerHTML">
          Click Me
        </button>
      </>
    </Document>
  ));
