// firebase.User情報を取得し、必要な値のみオブジェクトに格納して返す

import { User } from '../../model/user';

export const mapUserData = (user: firebase.User): User => {
  const { uid, email, displayName, photoURL } = user;
  return {
    uid,
    email,
    displayName,
    photoURL,
  };
};
