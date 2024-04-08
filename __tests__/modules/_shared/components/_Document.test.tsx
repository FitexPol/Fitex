// eslint-disable-next-line import/no-unresolved
import { describe, expect, it } from 'bun:test';

import { Document } from '@components/_Document';

import { getUser, render } from '../../../utils';

describe('Document', () => {
  it('should render with an appropriate global elements', async () => {
    const document = await render(<Document currentUrl="http://domain.pl/url/segments" />);

    expect(document.body.getAttribute('hx-history')).toBe('false');

    const notificationPortal = document.getElementById('notification-portal');
    if (!notificationPortal) throw new Error('Notification portal not found');
    expect(notificationPortal.getAttribute('hx-preserve')).toBe('true');

    const modalPortal = document.getElementById('modal-portal');
    if (!modalPortal) throw new Error('Modal portal not found');
    expect(modalPortal.getAttribute('hx-preserve')).toBe('true');

    const loader = document.getElementById('loader');
    if (!loader) throw new Error('Loader not found');
    expect(modalPortal.getAttribute('hx-preserve')).toBe('true');

    const links = document.querySelectorAll('a');
    const backButton = links.item(links.length - 1);
    expect(backButton.getAttribute('href')).toBe('/url');
  });

  it('should render without default layout if layout argument is set to "none"', async () => {
    const document = await render(<Document currentUrl="" layout="none" />);

    const nav = document.querySelector('nav');
    expect(nav).toBeNull();
  });

  it('should render without back button if isBackButtonVisible argument is set to false', async () => {
    const document = await render(
      <Document currentUrl="http://domain.pl/url/segments" isBackButtonVisible={false} />,
    );

    const links = document.querySelectorAll('a');
    const backButton = links.item(links.length - 1);
    expect(backButton.getAttribute('href')).not.toBe('/url');
  });

  it('should render with an appropriate username rendered in the navigation if user argument is set', async () => {
    const user = await getUser();
    const document = await render(<Document currentUrl="" user={user} />);

    const nav = document.querySelector('nav');
    if (!nav) throw new Error('Nav not found');

    const dropdownLabel = nav.querySelector('details summary div');
    if (!dropdownLabel) throw new Error('Dropdown label not found');

    expect(dropdownLabel.textContent).toBe('Test');
  });
});
