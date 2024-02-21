import { Elysia } from 'elysia';

import { authModule } from './auth';
import { homeModule } from './home';
import { mealsModule } from './meals';
import { shoppingListsModule } from './shopping-lists';

export const modules = new Elysia().use(authModule).use(homeModule).use(mealsModule).use(shoppingListsModule);
