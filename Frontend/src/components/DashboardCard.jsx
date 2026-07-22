import React from "react";

const DashboardCard = ({title, value, icon: Icon, color}) => {
  return (
    <div className="dashboard-card">
    <div className="card-header">
        <h4>{title}</h4>

        <div
            className="card-icon"
            style={{
                backgroundColor: `${color}20`,
                color,
            }}
        >
            <Icon size={22} />
        </div>
    </div>

    <h2>{value}</h2>
</div>
  );
};

export default DashboardCard;