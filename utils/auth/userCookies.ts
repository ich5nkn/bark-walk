import cookies from 'js-cookie';
import { UserData } from './userData';

export const getUserFromCookie = (): any => {
  const cookie = cookies.get('auth');
  if (!cookie) {
    return;
  }
  return JSON.parse(cookie);
};

export const setUserCookie = (user: UserData): void => {
  cookies.set('auth', user, {
    // firebase id tokens expire in one hour
    // set cookie expiry to match
    expires: 1 / 24,
  });
};

export const removeUserCookie = (): void => cookies.remove('auth');
