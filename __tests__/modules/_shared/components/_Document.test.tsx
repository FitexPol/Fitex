// eslint-disable-next-line import/no-unresolved
import { describe, expect, it } from 'bun:test';

import { Document } from '@components/_Document';

import { render } from '../../../utils';

describe('Document', () => {
  it('should render with an appropriate global elements', async () => {
    const document = await render(<Document currentUrl="http://domain.pl/url/segments"><></></Document>);

    const body = document.querySelector('body');
    if (!body) throw new Error('Body not found');
    expect(body.getAttribute('hx-history')).toBe('false');

    const notificationPortal = document.getElementById('notification-portal');
    if (!notificationPortal) throw new Error('Notification portal not found');
    expect(notificationPortal.getAttribute('hx-preserve')).toBe('true');

    const modalPortal = document.getElementById('modal-portal');
    if (!modalPortal) throw new Error('Modal portal not found');
    expect(modalPortal.getAttribute('hx-preserve')).toBe('true');

    const loader = document.getElementById('loader');
    if (!loader) throw new Error('Loader not found');
    expect(modalPortal.getAttribute('hx-preserve')).toBe('true');

    // const backButtons = body.querySelectorAll('a');
    // backButtons.forEach((button) => console.log(button.outerHTML));
    // if (!backButton) throw new Error('Back button not found');
    // console.log(backButton.getAttribute('href'));
    // expect(backButton.getAttribute('href')).toBe('/url');
  });
});
