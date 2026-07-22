import React from 'react';
import Profile from './Profile';
import Nav from './Nav';
import Logout from './Logout';

const Sidebar = () => {
  return (
    <aside className='sidebar'>
      <div className='sidebar-top'>
        <Profile />
        <Nav/>
      </div>
      <Logout/>
    </aside>
  )
}

export default Sidebar
