import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import firebase from '../../firebase/clientApp';
import 'firebase/auth';
import {
  removeUserCookie,
  setUserCookie,
  getUserFromCookie,
} from './userCookies';
import { mapUserData } from './mapUserData';
import { UserData } from './userData';

const useUser = (): {
  user: UserData | undefined;
  logout: () => Promise<void>;
} => {
  const [user, setUser] = useState<UserData | undefined>();
  const router = useRouter();

  const logout = async () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        router.push('/auth');
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    // Firebase updates the id token every hour, this
    // makes sure the react state and the cookie are
    // both kept up to date

    // 未ログイン状態でも見れるページのパスを以下に追加
    const existPaths = ['/', '/search'];

    const cancelAuthListener = firebase.auth().onIdTokenChanged((user) => {
      if (user) {
        const userData = mapUserData(user);
        setUserCookie(userData);
        setUser(userData);
      } else {
        removeUserCookie();
        setUser(null);
      }
    });

    if (existPaths.indexOf(router.pathname) == -1) {
      const userFromCookie = getUserFromCookie();
      if (!userFromCookie) {
        router.push('/');
        return;
      }
      setUser(userFromCookie);
    }

    return () => {
      cancelAuthListener();
    };
  }, []);

  return { user, logout };
};

export { useUser };
