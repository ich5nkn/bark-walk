// eslint-disable-next-line no-redeclare
/* globals window */
import React from 'react';
import { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { setUserCookie } from '../utils/auth/userCookies';
import { mapUserData } from '../utils/auth/mapUserData';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

// TODO: 下記の設定ファイルを読み進めて設定を進める
// https://github.com/firebase/firebaseui-web#configure-oauth-providers

// Init the Firebase app.
// TODO: どのような処理か確認する
const auth = firebase.auth();

const uiConfig: any = {
  signInFlow: 'popup',
  // Auth providers
  // https://github.com/firebase/firebaseui-web#configure-oauth-providers
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  credentialHelper: 'none',
  callbacks: {
    signInSuccessWithAuthResult: async ({ user } /*, redirectUrl*/) => {
      const userData = mapUserData(user);
      setUserCookie(userData);
    },
  },
};

const FirebaseAuth: React.FC = () => {
  // Do not SSR FirebaseUI, because it is not supported.
  // https://github.com/firebase/firebaseui-web/issues/213
  const [renderAuth, setRenderAuth] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRenderAuth(true);
    }
  }, []);
  return (
    <div>
      {renderAuth ? (
        // コンポーネントをWrapして整える
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      ) : null}
    </div>
  );
};

export default FirebaseAuth;
