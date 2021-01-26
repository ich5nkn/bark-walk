import React from 'react';
import { useEffect, useState } from 'react';
import firebase from '../firebase/clientApp';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { mapUserData } from '../utils/auth/mapUserData';
import { setUserCookie } from '../utils/auth/userCookies';

// FirebaseUI or Firebase Authentication SDKの選択肢がある
// 完全なドロップイン認証ソリューションとして、FirebaseUI を採用
// FirebaseUI のReact用のラッパーであるfirebaseui-web-reactに関するドキュメント
// https://github.com/firebase/firebaseui-web-react

// firebaseui-web-reactに認証情報を渡すためにFirebase Auth instanceを生成
const auth = firebase.auth();

// 設定解説：https://github.com/firebase/firebaseui-web/#configuration
const uiConfig: any = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
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
  // 認証情報の保存
  credentialHelper: 'none',
  callbacks: {
    // The signInSuccessWithAuthResult callback is invoked when user signs in successfully.
    // https://github.com/firebase/firebaseui-web#available-callbacks
    // redirectUrlはsignInSuccessUrlを上書きしたい場合のみ設定
    signInSuccessWithAuthResult: (
      authResult: firebase.auth.UserCredential /*, redirectUrl */
    ) => {
      const userData = mapUserData(authResult.user);
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
