import { Card } from '@components/Card';
import { type ComponentProps, type JWTUser } from '@types';
import { $t } from '@utils/$t';

import { MealForm } from './MealForm';
import { Meal } from '../models/meal';

const _t = $t('meals');

type MealFormSectionProps = {
  user: JWTUser;
  mealId?: string;
};

export async function MealFormSection({ user, mealId }: ComponentProps<MealFormSectionProps>) {
  if (!mealId) {
    return (
      <Section title={_t('mealFormSection.title')}>
        <MealForm />
      </Section>
    );
  }

  const mealDoc = await Meal.findById(mealId).populate('products.product').exec();

  if (!mealDoc) {
    return <span>{_t('_shared.notFound')}</span>;
  }

  if (!mealDoc.author._id.equals(user.id)) {
    return <span>{_t('mealFormSection.permissionDenied')}</span>;
  }

  return (
    <Section title={mealDoc.name}>
      <MealForm mealDoc={mealDoc} />
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
