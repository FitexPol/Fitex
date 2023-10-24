import { app } from './app';
import { modules } from './modules';
import { views } from './views';

app.use(views).use(modules).listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
