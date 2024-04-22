// eslint-disable-next-line import/no-unresolved
import { describe, expect, it } from 'bun:test';

import { ListSection } from '@components/sections/ListSection';

import { render } from '../../../../utils';

describe('CardsSection', () => {
  it('should render title and "create new" button correctly', async () => {
    const document = await render(
      <ListSection
        title="Test title"
        basePath="meals"
        query={{}}
        activeFilters={{ itemsPerPage: 15, page: 1 }}
        activeSortLabel=""
        totalCount={0}
      />,
    );

    const title = document.querySelector('h1');
    if (!title) throw new Error('Title not found');
    expect(title.textContent).toBe('Test title');

    const createNewButton = document.querySelector('a[href="/meals/new"]');
    if (!createNewButton) throw new Error('Create new button not found');
    expect(createNewButton.textContent).toBeDefined();
  });

  it('should render filters correctly', async () => {
    const document = await render(
      <ListSection
        title=""
        basePath="meals"
        query={{}}
        activeFilters={{ itemsPerPage: 15, page: 1 }}
        activeSortLabel="po nazwie (A-Z)"
        totalCount={0}
      />,
    );

    const filterButton = document.querySelector('h1 + button');
    if (!filterButton) throw new Error('Filter button not found');
    expect(filterButton.getAttribute('onclick')).toBe('toggleSidePanel()');

    const sidePanel = document.getElementById('side-panel');
    if (!sidePanel) throw new Error('Side panel not found');

    const filters = sidePanel.querySelectorAll('ul');

    const itemsPerPageFilter = filters.item(0);
    const itemsPerPageOptions = itemsPerPageFilter.querySelectorAll('a');
    expect(itemsPerPageOptions.length).toBe(3);

    let itemsPerPage = 15;

    itemsPerPageOptions.forEach((option, index) => {
      if (index === 0) {
        const checkbox = option.querySelector('input');
        if (!checkbox) throw new Error('Checkbox not found');
        expect(checkbox.checked).toBeTrue();
      }

      expect(option.href).toBe(`/meals?itemsPerPage=${itemsPerPage}`);
      itemsPerPage = itemsPerPage * 2;
    });

    const sortFilter = filters.item(1);
    const sortOptions = sortFilter.querySelectorAll('a');
    expect(sortOptions.length).toBe(4);

    sortOptions.forEach((option, index) => {
      const checkbox = option.querySelector('input');

      if (!checkbox) throw new Error('Checkbox not found');

      switch (index) {
        case 0: {
          expect(option.href).toBe('/meals?sort=name-asc');
          expect(checkbox.name).toBe('po nazwie (A-Z)');
          expect(checkbox.checked).toBeTrue();
          break;
        }
        case 1: {
          expect(option.href).toBe('/meals?sort=name-desc');
          expect(checkbox.name).toBe('po nazwie (Z-A)');
          break;
        }
        case 2: {
          expect(option.href).toBe('/meals?sort=creationDate-asc');
          expect(checkbox.name).toBe('po dacie utworzenia (od najwcześniejszej)');
          break;
        }
        case 3: {
          expect(option.href).toBe('/meals?sort=creationDate-desc');
          expect(checkbox.name).toBe('po dacie utworzenia (od najpóźniejszej)');
          break;
        }
      }
    });
  });

  it('should render pagination correctly', async () => {
    const document = await render(
      <ListSection
        title=""
        basePath="meals"
        query={{}}
        activeFilters={{ itemsPerPage: 15, page: 1 }}
        activeSortLabel=""
        totalCount={100}
      />,
    );

    const pagination = document.querySelector('ul[data-test-id="pagination"]');
    if (!pagination) throw new Error('Pagination not found');

    const paginationItems = pagination.querySelectorAll('li');

    expect(paginationItems.length).toBe(4);

    paginationItems.forEach((item, index) => {
      if (index === 2) {
        expect(item.textContent).toBe('...');
        return;
      }

      const link = item.querySelector('a');

      if (!link) throw new Error('Link not found');

      switch (index) {
        case 0: {
          expect(link.href).toBe('/meals?page=1');
          expect(link.textContent).toBe('1');
          break;
        }
        case 1: {
          expect(link.href).toBe('/meals?page=2');
          expect(link.textContent).toBe('2');
          break;
        }
        case 3: {
          expect(link.href).toBe('/meals?page=7');
          expect(link.textContent).toBe('7');
          break;
        }
      }
    });
  });
});
