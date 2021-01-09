import React from 'react';
import { useUser } from '../utils/auth/useUser';
import Welcome from '../components/welcome';
import Layout from '../components/ui/Layout';
import DashBoard from '../components/ui/DashBoard';

const Home: React.FC = () => {
  const { user, logout } = useUser();
  if (user) {
    return (
      // TODO:ダッシュボード作成
      <Layout>
        <DashBoard user={user} logout={logout} />
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
