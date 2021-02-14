import React from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect, createContext, useContext } from 'react';
import firebase from '../firebase/clientApp';
import {
  getUserFromCookie,
  removeUserCookie,
  setUserCookie,
} from '../utils/auth/userCookies';
import { UserData } from '../utils/auth/userData';

// TODO: ContextAPIに型を付与する
const UserContext = createContext({});
const UserContextComp = ({ children }: any): JSX.Element => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const router = useRouter();

  const logout = (): Promise<void> => {
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

  const rootPageRedirect = (): void => {
    // 未ログイン状態でも閲覧できるページのパスを以下に追加
    const existPaths = ['/', '/search', '/auth'];
    // 未ログイン状態で閲覧できるページ以外の場合 かつ 未ログインの場合にルートページにリダイレクト
    if (existPaths.includes(router.pathname) === false) {
      const userFromCookie: UserData = getUserFromCookie();
      // クッキーにUserDataがない場合はルートページにリダイレクトする
      if (!userFromCookie) {
        router.push('/');
      }
    }
  };

  useEffect(() => {
    // Listen authenticated user
    const unsubscriber = firebase
      .auth()
      .onAuthStateChanged(async (user: UserData) => {
        try {
          if (user) {
            // User is signed in.
            const { uid, displayName, email, photoURL } = user;
            // You could also look for the user doc in your Firestore (if you have one):
            // const userDoc = await firebase.firestore().doc(`users/${uid}`).get()

            setUserCookie({ uid, displayName, email, photoURL });
            setUser({ uid, displayName, email, photoURL });
          } else {
            removeUserCookie();
            setUser(null);
          }
        } catch (error) {
          // Most probably a connection error. Handle appropriately.
          console.log(error.message);
        } finally {
          setLoadingUser(false);
        }
      });

    // 挙動確認のためにクッキーからユーザー方法を取得
    console.log(getUserFromCookie());
    rootPageRedirect();

    // Unsubscribe auth listener on unmount
    return () => unsubscriber();
  }, []);

  return (
    <UserContext.Provider value={{ user, loadingUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextComp;

// Custom hook that shorhands the context!
export const useUser = (): any => useContext(UserContext);
