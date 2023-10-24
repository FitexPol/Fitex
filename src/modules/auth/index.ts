import type { App } from '@/app';

import { api } from './api';

export const authModule = (app: App) => app.use(api);
