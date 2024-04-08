import { JSDOM } from 'jsdom';

import { type JWTUser, User } from '@auth/models/user';

export async function getUser(): Promise<JWTUser> {
  const userDoc = await User.findOne({ username: 'Test' });

  if (!userDoc) throw new Error('User not found');

  return { id: userDoc.id, username: userDoc.username };
}

export async function render(component: JSX.Element): Promise<Document> {
  const html: string = typeof component === 'string' ? component : await component;

  return new JSDOM(html).window.document;
}
