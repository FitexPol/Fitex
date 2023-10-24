import type { App } from '@/app';
import Document from '@components/Document';
import Input from '@components/Input';

export const auth = (app: App) =>
  app.get(
    '/auth',
    () => (
      <Document layout="none">
        <div class="container">
          <article>
            <header>
              <h1>Zaloguj się</h1>
            </header>

            <form hx-boost="true" action="/api/sign-up" method="post">
              <Input type="email" name="email" />
              <Input type="password" name="password" />
              <Input type="submit" value="Zatwierdź" class="contrast" />
            </form>
          </article>
        </div>
      </Document>
    ),
    {
      beforeHandle: ({ user, set }) => {
        if (user) {
          set.redirect = '/';
        }
      },
    },
  );
