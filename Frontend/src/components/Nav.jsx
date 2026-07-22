import React, { useContext } from 'react'
import { AuthContext } from '../utils/AuthContext'
import {LayoutDashboard, UserPen, Clipboard, SquareCheckBig} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    if(!user){
        return null;
    }

    if(user?.role === 'Super_Admin'){
        return (
            <nav>
                <div className="nav-item" onClick={() => navigate("/home")}>
                    <LayoutDashboard size={18} />
                    <span>Dashboard</span>
                </div>

                <div className="nav-item" onClick={() => navigate("/home/user-management")}>
                    <UserPen size={18} />
                    <span>User Management</span>
                </div>
            </nav>
        ) 
    }

    if(user?.role === 'Admin'){
        return (
            <nav>
                <div className="nav-item" onClick={() => navigate("/home")}>
                    <LayoutDashboard size={18} />
                    <span>Dashboard</span>
                </div>

                <div className="nav-item" onClick={() => navigate("/home/task-management")}>
                    <Clipboard size={18} />
                    <span>Task Management</span>
                </div>
            </nav>
        ) 
    }

    if(user?.role === 'Employee'){
        return (
            <nav>
                <div className="nav-item" onClick={() => navigate("/home")}>
                    <LayoutDashboard size={18} />
                    <span>Dashboard</span>
                </div>

                <div className="nav-item" onClick={() => navigate("/home/my-tasks")}>
                    <SquareCheckBig size={18} />
                    <span>User Management</span>
                </div>
            </nav>
        ) 
    }
}

    

export default Nav;
