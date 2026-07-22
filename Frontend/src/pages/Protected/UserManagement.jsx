import React, { useContext, useEffect, useState } from 'react';
import {AuthContext} from '../../utils/AuthContext';
import API from '../../services/API';
import { useNavigate } from 'react-router-dom';
import UserModel from '../../components/UserModel';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [active, setActive] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const params = new URLSearchParams();
  const {user} = useContext(AuthContext);

  if (role) {
    params.append("role", role);
  }

  if (active) {
    params.append("isActive", active);
  }

  const query = params.toString();

  const userFetch = async() => {
    try {
    setLoading(true); 
    const response = await API(
      "GET",
      query
      ? `user/list/${user.role}?${query}` 
      : `user/list/${user.role}`
    );

    const updatedUsers = response.data.data;

    setUsers(updatedUsers);
    
    if (selectedUser) {
      const updatedUser = updatedUsers.find(
          u => u._id === selectedUser._id
      );

      if (updatedUser) {
          setSelectedUser(updatedUser);
      }
    }

    console.log(selectedUser);

    } catch (error) {
      console.log(error);
    } finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    userFetch();
  }, []);


  return (
    <div className="user-management">
      <header className="page-header">
        <div>
          <h2>User Management</h2>
          <p>Total Users: {users.length}</p>
        </div>
      </header>
    <div className="toolbar">
      <select defaultValue="">
    <option value="" disabled>
        Filter by Role
    </option>
    <option value="Employee">Employee</option>
    <option value="Admin">Admin</option>
    <option value="Super_Admin">Super Admin</option>
</select>
    <select defaultValue="">
    <option value="" disabled>
        Filter by Status
    </option>
    <option value="Active">Employee</option>
    <option value="Admin">Admin</option>
    <option value="Super_Admin">Super Admin</option>
</select>
<select defaultValue="">
    <option value="" disabled>
        Filter by Role
    </option>
    <option value="Employee">Employee</option>
    <option value="Admin">Admin</option>
    <option value="Super_Admin">Super Admin</option>
</select>
<button>Clear Filter</button>
    </div>

      <div className='user-table-card'>
      <table border="solid black">
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id} onClick={() => {if(showModal) return; setSelectedUser(user); setShowModal(true)}}>
              <td>{index+1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.isActive ? "🟢 Active" : "🔴 Inactive"}</td>

            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {showModal && 
      <UserModel user={selectedUser} setSelectedUser={setSelectedUser} setUsers={setUsers} onClose={() => setShowModal(false)} userFetch={userFetch} />
      }
    </div>
  )
}

export default UserManagement;
