import { type JWTUser, User } from '@auth/models/user';

export async function getUser(): Promise<JWTUser> {
  const userDoc = await User.findOne({ username: 'Test' });

  if (!userDoc) throw new Error('User not found');

  return { id: userDoc.id, username: userDoc.username };
}
