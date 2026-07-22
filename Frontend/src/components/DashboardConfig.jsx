import {
  Users,
  UserCheck,
  ShieldCheck,
  ClipboardList,
  Clock3,
  CircleCheckBig,
  LoaderCircle,
} from "lucide-react";

const DashboardConfig = {
  Super_Admin: [
    {
      key: "users",
      title: "Users",
      icon: Users,
      color: "#2563EB",
    },
    {
      key: "active",
      title: "Active Users",
      icon: UserCheck,
      color: "#22C55E",
    },
    {
      key: "admin",
      title: "Admins",
      icon: ShieldCheck,
      color: "#7C3AED",
    },
    {
      key: "totalTasks",
      title: "Total Tasks",
      icon: ClipboardList,
      color: "#F59E0B",
    },
  ],

  Admin: [
    {
      key: "employee",
      title: "Employees",
      icon: Users,
      color: "#2563EB",
    },
    {
      key: "myTasks",
      title: "My Tasks",
      icon: ClipboardList,
      color: "#06B6D4",
    },
    {
      key: "pending",
      title: "Pending",
      icon: Clock3,
      color: "#F59E0B",
    },
    {
      key: "completed",
      title: "Completed",
      icon: CircleCheckBig,
      color: "#22C55E",
    },
  ],

  Employee: [
    {
      key: "total",
      title: "Total",
      icon: ClipboardList,
      color: "#2563EB",
    },
    {
      key: "pending",
      title: "Pending",
      icon: Clock3,
      color: "#F59E0B",
    },
    {
      key: "inProgress",
      title: "In Progress",
      icon: LoaderCircle,
      color: "#06B6D4",
    },
    {
      key: "completed",
      title: "Completed",
      icon: CircleCheckBig,
      color: "#22C55E",
    },
  ],
};

export default DashboardConfig;