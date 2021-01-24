import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import firebase from '../../firebase/clientApp';
import {
  getUserFromCookie,
  setUserCookie,
  removeUserCookie,
} from './userCookies';
import { mapUserData } from './mapUserData';
import { UserData } from './userData';

// ユーザー情報取得, ログアウト処理
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
        router.push('/');
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    // Firebase updates the id token every hour, this
    // makes sure the react state and the cookie are
    // both kept up to date

    // Firebaseのid tokenが変更された際の処理
    // cookieにuserDataを追加,削除
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

    // 未ログイン状態でも閲覧できるページのパスを以下に追加
    const existPaths = ['/', '/search', '/auth'];
    // 未ログイン状態で閲覧できるページ以外の場合、
    if (existPaths.includes(router.pathname) === false) {
      const userFromCookie: UserData = getUserFromCookie();
      // クッキーにUserDataがない場合はルートページにリダイレクトする
      if (!userFromCookie) {
        router.push('/');
        return;
      }
      // クッキーにUserDataがある場合はUserを更新
      setUser(userFromCookie);
    }

    return () => {
      cancelAuthListener();
    };
  }, []);

  return { user, logout };
};

export { useUser };
