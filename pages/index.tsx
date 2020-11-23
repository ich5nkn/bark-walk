import React from 'react';
import { useUser } from '../utils/auth/useUser';
import Welcome from '../components/welcome';
import Layout from '../components/ui/Layout';

const Home: React.FC = () => {
  const { user, logout } = useUser();
  if (user) {
    return (
      // TODO:ダッシュボード作成
      <Layout>
        <>
          <div>{user.uid}</div>
          <button onClick={logout}></button>
        </>
      </Layout>
    );
  }
  return <Welcome />;
};

export default Home;
