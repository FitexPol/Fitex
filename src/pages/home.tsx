import { Elysia } from 'elysia';

import { context } from '@/context';
import { Document } from '@components/_Document';

export const homePage = new Elysia().use(context).get('/', ({ user }) => <Document user={user} />);
