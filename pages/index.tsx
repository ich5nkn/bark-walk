import React from 'react';
import { useUser } from '../context/userContext';
import Welcome from '../components/welcome';
import Layout from '../components/ui/Layout';
import DashBoard from '../components/ui/DashBoard';

const Home: React.FC = () => {
  const { user, logout } = useUser();
  if (user) {
    return (
      // TODO:ダッシュボード作成
      <Layout>
        <div>{user.uid}</div>
        <p>Welcome {user.displayName} You are now signed-in!</p>
        <button onClick={logout}>ログアウト</button>
      </Layout>
    );
  }
  return (
    <Layout>
      <Welcome />
    </Layout>
  );
};

export default Home;
