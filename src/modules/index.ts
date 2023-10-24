import type { App } from '@/app';

import { authModule } from './auth';
import { homeModule } from './home';

export const modules = (app: App) => app.use(homeModule).use(authModule);
