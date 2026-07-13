import { Router } from "express";
const route = Router();

import auth from "../03_Middleware/Auth.Middleware.js"
import role from "../03_Middleware/Role.Middleware.js"
import User from "../02_Model/User.model.js";
import { activate, deactivate, demote, promote, restoreUser, softDelete, userListAdmin, userListSuperAdmin } from "../05_Controller/User.controller.js"


// Read
route.get("/Super-Admin/user", auth, role("Super_Admin"), userListSuperAdmin);
route.get("/Admin/user", auth, role("Admin"), userListAdmin);

// Update
route.patch("/:id/activate", auth, role("Super_Admin"), activate);
route.patch("/:id/deactivate", auth, role("Super_Admin"), deactivate);
route.patch("/:id/promote", auth, role("Super_Admin"), promote);
route.patch("/:id/demote", auth, role("Super_Admin"), demote);
route.patch("/:id/restore", auth, role("Super_Admin"), restoreUser);

// Delete
route.patch("/:id/delete", auth, role("Super_Admin"), softDelete);

export default route;
