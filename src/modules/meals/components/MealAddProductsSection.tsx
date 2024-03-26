import { type JWTUser } from '@auth/models/user';
import { AddProductsSection } from '@components/sections/AddProductsSection';
import { type ComponentProps } from '@types';

import { type MealDoc } from '../models/meal';

type MealAddProductsSectionProps = {
  user: JWTUser;
  mealDoc: MealDoc;
};

export function MealAddProductsSection({ user, mealDoc }: ComponentProps<MealAddProductsSectionProps>) {
  return <AddProductsSection user={user} entity={mealDoc} basePath="meals" activeTab="products" />;
}
