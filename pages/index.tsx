import React from 'react';
import { useUser } from '../context/userContext';
import Welcome from '../components/Welcome';
import Layout from '../components/Layout';
import DashBoard from '../components/DashBoard';

const Home: React.FC = () => {
  const { user, loadingUser } = useUser();
  return (
    <Layout loading={loadingUser}>
      {user ? <DashBoard user={user} /> : <Welcome />}
    </Layout>
  );
};

export default Home;
