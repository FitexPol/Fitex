import { type JWTUser } from '@auth/models/user';
import { AddProductsSection } from '@components/sections/AddProductsSection';

import { type MealDoc } from '../models/meal';

type MealAddProductsSectionProps = {
  user: JWTUser;
  mealDoc: MealDoc;
};

export function MealAddProductsSection({ user, mealDoc }: MealAddProductsSectionProps) {
  return <AddProductsSection user={user} entity={mealDoc} basePath="meals" activeTab="products" />;
}
