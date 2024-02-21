import { type User } from '@auth/models/user';
import { Card } from '@components/Card';
import { type ComponentProps } from '@types';
import { $t } from '@utils/$t';

import { MealForm } from './MealForm';
import { Meal } from '../models/meal';

const _t = $t('meals');

type MealFormSectionProps = {
  user: User;
  mealId?: string;
};

export async function MealFormSection({ user, mealId }: ComponentProps<MealFormSectionProps>) {
  if (!mealId) {
    return (
      <Section title="Stwórz posiłek">
        <MealForm />
      </Section>
    );
  }

  const mealDoc = await Meal.findById(mealId).exec();

  if (!mealDoc) {
    return <span>{_t('mealSection.notFound')}</span>;
  }

  if (!mealDoc.author._id.equals(user.id)) {
    return <span>{_t('mealSection.permissionDenied')}</span>;
  }

  return (
    <Section title={mealDoc.name}>
      <MealForm meal={mealDoc} />
    </Section>
  );
}

type SectionProps = {
  title: string;
};

function Section({ title, children }: ComponentProps<SectionProps>) {
  return (
    <section id="meal-form-section">
      <Card>
        <>
          <Card.Header title={title} />
          {children}
        </>
      </Card>
    </section>
  );
}
