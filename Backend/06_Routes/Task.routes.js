import { Router } from "express";
import auth from "../03_Middleware/Auth.Middleware.js";
import role from "../03_Middleware/Role.Middleware.js"
import { taskCreation, taskDelete, taskReassingAdmin, taskUpdate, taskListSuperAdmin, taskListEmployee, review, assignedIsCompleated, dashboard, taskListAdmin} from "../05_Controller/Task.controller.js";

const route = Router();

// Create

route.post("/create",auth, role("Admin"), taskCreation);

// Read

route.get("/dashboard/Super_Admin", auth, role("Super_Admin"), dashboard);
route.get("/list/Super_Admin", auth,  role("Super_Admin"), taskListSuperAdmin);
route.get("/list/Admin", auth,  role("Admin"), taskListAdmin);
route.get("/dashboard/Admin", auth, role("Admin"), dashboard);
route.get("/list/Employee", auth,  role("Employee"), taskListEmployee);
route.get("/dashboard/Employee", auth, role("Employee"), dashboard);

// Update
route.patch("/admin/:id/reassing", auth, role("Super_Admin"), taskReassingAdmin);
route.put("/update/:id",auth, role("Admin"), taskUpdate);
route.patch("/review/:id", auth, role("Admin"), review);
route.patch("/compleate/:id", auth, role("Employee"), assignedIsCompleated);

// Delete

route.delete("/delete/:id",auth, role("Admin"), taskDelete);

export default route;


