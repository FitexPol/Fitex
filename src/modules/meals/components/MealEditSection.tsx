import { Icon } from '@components/Icon';
import { Link } from '@components/Link';
import { EditSection } from '@components/sections/EditSection';
import { $t } from '@utils/$t';

import { type MealDoc } from '../models/meal';

type MealEditSectionProps = {
  mealDoc: MealDoc;
};

export function MealEditSection({ mealDoc }: MealEditSectionProps) {
  return (
    <EditSection title={mealDoc.name} basePath="meals" entity={mealDoc}>
      <EditSection.Group
        title={$t('_description')}
        customElement={
          <Link href={`/meals/${mealDoc.id}/description`} class="ml-1 inline-flex">
            <Icon type="edit-2" class="size-5" />
          </Link>
        }
      >
        <p safe>{mealDoc.description}</p>
      </EditSection.Group>
    </EditSection>
  );
}
