import { type JWTUser } from '@auth/models/user';
import { Card } from '@components/Card';
import { type ComponentProps } from '@types';
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
        <MealForm user={user} />
      </Section>
    );
  }

  const mealDoc = await Meal.findById(mealId).exec();

  if (!mealDoc) {
    return <span>{_t('_shared.errors.notFound')}</span>;
  }

  if (!mealDoc.author._id.equals(user.id)) {
    return <span>{_t('_shared.permissionDenied')}</span>;
  }

  return (
    <Section title={mealDoc.name}>
      <MealForm user={user} mealDoc={mealDoc} />
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
          <Card.Header title={<h1 class="mb-0 text-2xl">{title}</h1>} />
          {children}
        </>
      </Card>
    </section>
  );
}
