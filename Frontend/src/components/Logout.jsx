import { LogOut } from 'lucide-react'
import React, { useContext } from 'react'
import { AuthContext } from '../utils/AuthContext'
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const {logout} = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogOut = () => {
        logout();
        navigate("/");
    }
  return (
    <div className="logout-link" onClick={handleLogOut}>
        <LogOut size={18} />
        <span>Logout</span>
    </div>
  )
}

export default Logout
