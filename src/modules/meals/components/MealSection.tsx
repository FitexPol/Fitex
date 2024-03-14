import { CardSection } from '@components/sections/CardSection';
import type { ComponentProps } from '@types';

import { type MealDoc } from '../models/meal';

type MealSectionProps = {
  mealDoc: MealDoc;
};

export async function MealSection({ mealDoc }: ComponentProps<MealSectionProps>) {
  return <CardSection entity={mealDoc}>{mealDoc.description && <p>{mealDoc.description}</p>}</CardSection>;
}
