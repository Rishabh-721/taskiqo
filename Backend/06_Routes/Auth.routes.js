import { Router } from "express";
import { profile, login, signUp } from "../05_Controller/Auth.controller.js"
import auth from "../03_Middleware/Auth.Middleware.js";

const route = Router();

// Create
route.post("/signup", signUp);
route.post("/login", login);

// Read
route.get("/profile", auth, profile);

export default route;