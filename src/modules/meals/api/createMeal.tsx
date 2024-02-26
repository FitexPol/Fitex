import { Elysia } from 'elysia';

import { context } from '@/context';
import { getGroupedProducts } from '@products/utils/getGroupedProducts';
import { getProductsById } from '@products/utils/getProductsById';
import { getBodySchema } from '@utils/getBodySchema';
import { getParsedBody } from '@utils/getParsedBody';
import { HxResponseHeader, type Unit } from '@vars';

import { type MealForm as MealFormType, mealForm } from '../forms';
import { Meal } from '../models/meal';
import { getMealFormWithErrors } from '../utils/getMealFormWithErrors';

export type MealBody<T> = T & {
  products: {
    productId: string;
    quantity: number;
    unit: Unit;
  }[];
};

export const createMeal = new Elysia().use(context).post(
  '',
  async ({ body, user, set }) => {
    const { products: productsBody, ...mealBody } =
      getParsedBody<MealBody<Omit<typeof body, 'products'>>>(body);

    const mealProducts = await getProductsById(getGroupedProducts(productsBody));

    const meal = new Meal({
      ...mealBody,
      author: user!.id,
      products: mealProducts,
    });

    try {
      await meal.save();
    } catch {
      set.status = 'Bad Request';
      throw new Error('Failed to create meal');
    }

    set.status = 'Created';
    set.headers = {
      [HxResponseHeader.Location]: `/meals/${meal.id}`,
    };
  },
  {
    body: getBodySchema<MealFormType>(mealForm),
    error({ code, error }) {
      if (code === 'VALIDATION') {
        return getMealFormWithErrors(error);
      }
    },
  },
);
