import React from 'react';
import { useUser } from '../context/userContext';
import Welcome from '../components/welcome';
import Layout from '../components/ui/Layout';
import DashBoard from '../components/ui/DashBoard';

const Home: React.FC = () => {
  const { user, logout } = useUser();
  return (
    <Layout>
      {user ? <DashBoard user={user} logout={logout} /> : <Welcome />}
    </Layout>
  );
};

export default Home;
