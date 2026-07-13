# Taskiqo

Taskiqo is a MERN stack role-based task management system that enables organizations to manage users and tasks through Role-Based Access Control (RBAC).

---

## 🚀 Features

### Authentication
- User Signup
- User Login
- JWT Authentication
- Password Hashing (bcrypt)
- Protected Routes
- Session Version Management

### User Management
- Super Admin
- Admin
- Employee
- User Approval System
- Activate/Deactivate Users
- Promote/Demote Users
- Soft Delete & Restore Users
- User Search and Filtering

### Task Management
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

### Workflow
- Pending -> In Progress
- Task Status Updates
- Dashboard Statistics

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

### Frontend (Upcoming)
- React
- React Router
- Axios

---

## 📂 Project Structure

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
```

---

## 🔐 Roles

### Super Admin
- Manage users
- Activate/Deactivate accounts
- Promote/Demote users
- View dashboard
- View all tasks
- Reassign Admin

### Admin
- Create tasks
- Update tasks
- Delete tasks
- Assign/Reassign employees
- Review employee Progress
- View dashboard

### Employee
- Login after approval
- View assigned tasks
- Update task status
- View personal dashboard

---

## 📌 Current Status

- ✅ Authentication Module Completed
- ✅ User Management Module Completed
- ✅ Task Management Module Completed
- ✅ Task Workflow Completed
- ✅ Dashboard APIs Completed
- ⏳ React Frontend
- ⏳ Deployment
---

## 📅 Roadmap

- [x] Authentication
- [x] User Management
- [x] Task CRUD
- [x] Task Workflow
- [x] Dashboard APIs
- [ ] React Frontend
- [ ] Deployment

---

## 📡 API Modules

- Authentication APIs
- User APIs
- Task APIs
- Dashboard APIs

## 🏗️ Architecture

Client
   │
React
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

## 📈 Development Timeline

### Day 1 (10 July 2026)
✔ Authentication
✔ Signup/Login
✔ JWT
✔ User Schema

### Day 2 (11 July 2026)
✔ RBAC
✔ User Management
✔ Seed Super Admin

### Day 3 (12 July 2026)
✔ Task CRUD
✔ Assignment
✔ Priority
✔ Due Dates

### Day 4 (13 July 2026)
✔ Filtering
✔ Workflow
✔ Employee Task APIs
✔ Dashboard APIs


## 📄 License

This project is built for learning and portfolio purposes.