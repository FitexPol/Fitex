import Elysia from 'elysia';

import Document from '@components/Document';
import Input from '@components/Input';

export const auth = new Elysia().get('/auth', () => (
  <Document layout="none">
    <div class="container">
      <article>
        <header>
          <h1>Zaloguj się</h1>
        </header>
        
        <form>
          <Input type="email" />
          <Input type="password" />
          <Input type="submit" value="Zatwierdź" class="contrast" />
        </form>
      </article>
    </div>
  </Document>
));
