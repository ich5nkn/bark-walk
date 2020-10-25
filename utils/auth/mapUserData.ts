import { UserData } from './userData';

// TODO: firebase.Userの型を確認する
export const mapUserData = (user: any): UserData => {
  const { uid, email, token } = user;
  return {
    uid,
    email,
    token,
  };
};
