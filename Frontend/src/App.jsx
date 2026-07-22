import React from "react";
import {Routes, Route} from "react-router-dom";
import Auth from "./pages/public/Auth"
import Login from "./pages/public/Login";
import SignUp from "./pages/public/SignUp";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Home from "./Pages/Protected/Home";
import Dashboard from "./Pages/Protected/Dashboard";
import UserManagement from "./Pages/Protected/UserManagement";
import TaskManagement from "./Pages/Protected/TaskManagement";
import MyTasks from "./Pages/Protected/myTasks";
function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Auth/>}>
        <Route index element={<Login />}/>
        <Route path="/signup" element={<SignUp/>}/> 
      </Route>
      <Route element={<ProtectedRoutes/>}>
          <Route path="/home" element={<Home/>}>
            <Route index element={<Dashboard/>}/>
            <Route path="user-management" element={<UserManagement/>}/>
            <Route path="task-management" element={<TaskManagement/>}/>
            <Route path="my-tasks" element={<MyTasks/>}/>
          </Route>
    </Route>
    </Routes>
    </>
  )
}

export default App
