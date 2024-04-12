// eslint-disable-next-line import/no-unresolved
import { describe, expect, it } from 'bun:test';

import { CardsSection } from '@components/sections/CardsSection';

import { render } from '../../../../utils';

describe('CardsSection', () => {
  it('should render correctly', async () => {
    const document = await render(
      <CardsSection
        title="Test title"
        basePath="meals"
        query={{}}
        activeFilters={{ itemsPerPage: 10, page: 1 }}
        activeSortLabel=""
        totalCount={100}
      />,
    );

    expect(document.body.innerHTML).toBeTruthy();
  });
});
