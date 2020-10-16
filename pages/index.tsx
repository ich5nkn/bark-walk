import React from 'react';
import { useUser } from '../utils/auth/useUser';
import Welcome from './Welcome';

const Home: React.FC = () => {
  const { user, logout } = useUser();
  if (user) {
    return (
      <>
        <div>{user.uid}</div>
        <button onClick={logout}></button>
      </>
    );
  }
  return <Welcome />;
};

export default Home;
