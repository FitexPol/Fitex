import type { App } from '@/app';

import { api } from './api';

export const homeModule = (app: App) => app.use(api);
