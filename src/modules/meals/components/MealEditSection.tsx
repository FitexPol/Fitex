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
      title={$t('mealEditSection.title')}
      basePath="meals"
      entity={mealDoc}
      basicInformation={[
        { label: 'Nazwa', value: mealDoc.name },
        { label: 'Opis', value: mealDoc.description },
      ]}
      user={user}
    />
  );
}
