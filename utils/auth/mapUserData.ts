// TODO: firebase.Userの型を確認する
export const mapUserData = (
  user
): { uid: string; email: string; token: string } => {
  const { uid, email, token } = user;
  return {
    uid,
    email,
    token,
  };
};
