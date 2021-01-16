// eslint-disable-next-line no-redeclare
/* globals window */
import React from 'react';
import { useEffect, useState } from 'react';
import firebase from '../firebase/clientApp';
import { setUserCookie } from '../utils/auth/userCookies';
import { mapUserData } from '../utils/auth/mapUserData';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

// FirebaseUI or Firebase Authentication SDKの選択肢がある
// 完全なドロップイン認証ソリューションとして、FirebaseUI を採用
// Firebase Authentication SDK は複数のログイン方法を手動でアプリに統合する際に必要だが今回は採用していない
// FirebaseUI のReact用のラッパーであるfirebaseui-web-reactに関するドキュメント
// https://github.com/firebase/firebaseui-web-react

// firebaseui-web-reactに認証情報を渡すためにFirebase Auth instanceを生成
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
  // Terms of service url.
  tosUrl: '',
  // Privacy policy url.
  privacyPolicyUrl: '',
  // TODO: 確認する
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
