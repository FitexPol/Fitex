import Elysia from 'elysia';

import Button from '@components/Button';
import Document from '@components/Document';
import Input from '@components/Input';

export const auth = new Elysia().get('/auth', () => (
  <Document>
    <div class="flex min-h-screen items-center justify-center">
      <div class="rounded-lg border-2 bg-white px-5 py-3">
        <h1 class="mb-5 text-center">Zaloguj się</h1>

        <form class="flex flex-col gap-2">
          <Input type="email" />
          <Input type="password" />
          <Button type='submit'>Zatwierdź</Button>
        </form>
      </div>
    </div>
  </Document>
));
