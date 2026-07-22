# Taskiqo

Taskiqo is a MERN Stack Role-Based Task Management System that enables organizations to manage users and tasks through Role-Based Access Control (RBAC). It provides secure authentication, user management, task assignment, workflow tracking, and dashboard statistics.

---

# 🚀 Features

## Authentication
- User Signup
- User Login
- JWT Authentication
- Password Hashing (bcrypt)
- Protected Routes
- Session Version Management
- Authentication Context
- Persistent Login

## User Management
- Super Admin
- Admin
- Employee
- User Approval System
- Activate / Deactivate Users
- Promote / Demote Users
- Soft Delete & Restore Users
- User Details Modal
- User Search & Filtering

## Task Management
- Create Task
- Update Task
- Delete Task
- Assign Employees
- Reassign Employees
- Task Priority
- Due Date Management
- Task Listing
- Task Search & Filtering
- Employee Task View
- Admin Task View

## Workflow
- Pending → In Progress → Submitted → Completed
- Task Status Updates
- Dashboard Statistics

---

# 🛠️ Tech Stack

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- cors

## Frontend
- React
- React Router
- Axios
- Context API
- CSS

---

# 📂 Project Structure

```
Backend/
├── 01_Database/
├── 02_Model/
├── 03_Middleware/
├── 04_Utils/
├── 05_Controller/
├── 06_Routes/
├── Server.js
└── package.json

Frontend/
├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

---

# 🔐 Roles

## Super Admin
- Manage Users
- Activate / Deactivate Accounts
- Promote / Demote Users
- Restore Deleted Users
- View Dashboard
- View All Tasks

## Admin
- Create Tasks
- Update Tasks
- Delete Tasks
- Assign / Reassign Employees
- Review Employee Progress
- View Dashboard

## Employee
- Login After Approval
- View Assigned Tasks
- Update Task Status
- View Personal Dashboard

---

# 📌 Current Status

- ✅ Authentication Module Completed
- ✅ User Management Module Completed
- ✅ Task Management Module Completed
- ✅ Task Workflow Completed
- ✅ Dashboard APIs Completed
- ✅ Frontend Project Setup
- ✅ Authentication UI
- ✅ Auth Context
- ✅ Protected Routes
- ✅ Dashboard UI
- ✅ User Management UI
- ✅ User Details Modal
- ✅ API Integration
- ⏳ Reusable Filter Component
- ⏳ Role Based Dashboards
- ⏳ Deployment

---

# 📅 Roadmap

- [x] Authentication
- [x] User Management
- [x] Task CRUD
- [x] Task Workflow
- [x] Dashboard APIs
- [x] Frontend Setup
- [x] Authentication UI
- [x] API Integration
- [x] Auth Context
- [x] Protected Routes
- [x] Dashboard
- [x] User Management UI
- [ ] Reusable Filters
- [ ] Team Management
- [ ] Role Based Dashboards
- [ ] Deployment

---

# 📡 API Modules

- Authentication APIs
- User APIs
- Task APIs
- Dashboard APIs

---

# 🏗️ Architecture

```
Client (React)
        │
React Router
        │
Axios API Service
        │
Express REST API
        │
Authentication Middleware
        │
Role Middleware
        │
Controllers
        │
MongoDB
```

# 📄 License

This project is built for learning, portfolio, and educational purposes.