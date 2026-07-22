import React, { useContext, useEffect, useState } from 'react';
import API from '../../services/API';
import { AuthContext } from '../../utils/AuthContext';
import DashboardCard from '../../components/DashboardCard';
import DashboardConfig from '../../components/DashboardConfig';
import RoleChart from '../../components/RoleChart';
import TaskChart from '../../components/TaskChart';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [dashData, setDashData] = useState({});
  const [dashboardData, setDashboardData] = useState({});

  const fetchDashboard = async() => {
    try {
      const response = await API('GET',`task/dashboard/${user.role}`);
      const info = response?.data?.data?.card;
      const data = response?.data?.data;
      console.log(data);
      setDashData(info);
      setDashboardData(data);
    } catch (error) {
      console.error(error.response?.data || error);
    }
  }

     useEffect(() => {
      if (user?.role) {
        fetchDashboard();
      }}, [user?.role]);

    const cards = DashboardConfig[user.role]?.map((card) => ({
      ...card,
      value: dashData[card.key] ?? 0,
    }));

    const roleData = [
  {
    name: "Super Admin",
    value: dashboardData.userStats?.superAdmin  ??  0,
  },
  {
    name: "Admin",
    value: dashboardData.userStats?.admin ??  0,
  },
  {
    name: "Employee",
    value: dashboardData.userStats?.employee  ??  0,
  },
];

const taskData = [
  {
    name: "Pending",
    value: dashboardData.taskStat?.pendingTasks  ??  0,
  },
  {
    name: "Progress",
    value: dashboardData.taskStat?.inProgressTasks  ??  0,
  },
  {
    name: "Submitted",
    value: dashboardData.taskStat?.submittedTasks  ??  0,
  },
  {
    name: "Completed",
    value: dashboardData.taskStat?.compleatedTasks  ??  0,
  },
];

  return (
    <div className='dashboard'>
      <header className='dashboard-heading'>
        <h2>👋 Welcome{user?.role !== "Employee" && `, ${user?.role}`}</h2><br />
      </header>
      <hr className='verticle_line'/>
      <h3 className="subtitle">Summary Cards</h3>
      <div className="card-grid">
        {cards?.map((card) => {
          const { key, ...props } = card;

          return (
              <DashboardCard key={key} {...props}/>
            );
          })}
      </div>
      <hr className="verticle_line" />
      <h3 className="subtitle">Charts</h3>

        <div className='chart-grid'>
          <div className="chart-card">
            <h4 className="subtitle">Users by Role</h4>
            <RoleChart data={roleData} />
          </div>
          <div className="chart-card">
            <h4 className="subtitle">Tasks by Status</h4>
            <TaskChart data={taskData} />
          </div>
        </div>
    </div>
  )
}

export default Dashboard;
