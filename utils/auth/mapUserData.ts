import firebase from 'firebase/app';

export const mapUserData = (user: firebase.User) => {
  // const { uid, email, token } = user;
  return {
    uid,
    email,
    token,
  };
};
