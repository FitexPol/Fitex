import { Card } from '@components/Card';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';

import { type MealDoc } from '../models/meal';

const _t = $t('meals');

type MealFormSectionProps = {
  mealDoc?: MealDoc;
};

export async function MealFormSection({ mealDoc, children }: ComponentProps<MealFormSectionProps>) {
  return (
    <section id="meal-form-section">
      <Card>
        <>
          <Card.Header
            title={<h1 class="mb-0 text-2xl">{mealDoc ? mealDoc.name : _t('mealFormSection.title')}</h1>}
          />
          {children}
        </>
      </Card>
    </section>
  );
}
