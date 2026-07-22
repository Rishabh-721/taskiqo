import React, {useContext} from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoutes = () => {
  const {user, loading} = useContext(AuthContext);


  
  if(loading){
    return <h2>Loading...</h2>
  }

  if(!user){
    return <Navigate to="/" replace />
  }

  return <Outlet/>
}

export default ProtectedRoutes
