// eslint-disable-next-line import/no-unresolved
import { describe, expect, it } from 'bun:test';

import { Breadcrumbs, type BreadcrumbsItem } from '@components/Breadcrumbs';

import { render } from '../../../utils';

describe('Breadcrumbs', () => {
  it('should render with an appropriate items', async () => {
    const testItems: BreadcrumbsItem[] = [
      { href: '/segment-0', label: 'Segment 0' },
      { href: '/segment-1', label: 'Segment 1' },
    ];

    const document = await render(<Breadcrumbs items={testItems} />);

    const breadcrumbItems = document.querySelectorAll('ul li');

    expect(breadcrumbItems.length).toBe(3);

    let expectation = '';

    breadcrumbItems.forEach((item, i) => {
      const link = item.querySelector('a');

      if (!link) throw new Error('Link not found');

      if (i === 0) {
        expect(link.href).toBe('/');
        return;
      }

      expectation += testItems[i - 1].href;
      expect(link.href).toBe(expectation);
    });
  });
});
