import React from 'react';
import { useUser } from '../context/userContext';
import Welcome from '../components/Welcome';
import Layout from '../components/Layout';
import DashBoard from '../components/DashBoard';

const Home: React.FC = () => {
  const { user, logout } = useUser();
  return (
    <Layout>
      {user ? <DashBoard user={user} logout={logout} /> : <Welcome />}
    </Layout>
  );
};

export default Home;
