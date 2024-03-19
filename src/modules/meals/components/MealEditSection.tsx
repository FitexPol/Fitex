import { type JWTUser } from '@auth/models/user';
import { EditSection } from '@components/sections/EditSection';
import type { ComponentProps } from '@types';
import { $t } from '@utils/$t';

import { type MealDoc } from '../models/meal';

type MealEditSectionProps = {
  user: JWTUser;
  mealDoc: MealDoc;
};

export function MealEditSection({ user, mealDoc }: ComponentProps<MealEditSectionProps>) {
  return (
    <EditSection
      title={$t('meals.mealEditSection.title')}
      basePath="meals"
      entity={mealDoc}
      basicInformation={[
        { label: $t('_name'), value: mealDoc.name },
        { label: $t('_description'), value: mealDoc.description },
      ]}
      user={user}
    />
  );
}
