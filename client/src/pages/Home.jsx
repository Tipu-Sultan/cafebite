import React from 'react';
import MenuList from '../components/menu/MenuList';
import Layout from '../components/Layout/Layout';

const Home = () => {

  return (
    <Layout title={'Home'}>
      <div className="mx-auto">
      <h1 className="text-3xl font-bold text-center mb-4">Welcome to CafeBite</h1>
      <MenuList />
    </div>
    </Layout>
  );
};

export default Home;
