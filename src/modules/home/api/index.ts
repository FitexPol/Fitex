import type { App } from '@/app';
import getEnvSecure from '@utils/getEnvSecure';

import { test } from './test';

export const api = (app: App) => app.group(getEnvSecure('API_PREFIX'), (app) => app.use(test));
