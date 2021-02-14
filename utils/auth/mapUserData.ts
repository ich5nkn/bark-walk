// firebase.User情報を取得し、必要な値のみオブジェクトに格納して返す

import { UserData } from './userData';

// TODO: firebase.Userの型にはtokenが存在しないので型を合成する必要があるかも
export const mapUserData = (user: firebase.User): UserData => {
  const { uid, email, displayName, photoURL } = user;
  return {
    uid,
    email,
    displayName,
    photoURL,
  };
};
