import { type Cookie } from 'elysia';

export function setAuthCookie(authCookie: Cookie<string>, token: string): void {
  authCookie.value = token;
  authCookie.path = '/';
  authCookie.httpOnly = true;
  authCookie.secure = true;
  authCookie.maxAge = 7 * 86400;
}
