import React, { useContext } from 'react'
import { AuthContext } from '../utils/AuthContext'

const Profile = () => {
    const {user} = useContext(AuthContext);
  return (
    <div className='profile'>
      <h3>{user?.name}</h3>
      <p>{user?.email}</p>
    </div>
  )
}

export default Profile
