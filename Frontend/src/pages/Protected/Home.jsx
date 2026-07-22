import React from 'react';
import Sidebar from '../../components/Sidebar';
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <div className='home-layout'>
      <Sidebar />
      <main className='content'>
        <Outlet/>
      </main>
    </div>
  )
}

export default Home
