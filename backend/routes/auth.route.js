import express from "express";
import { register, login, logout, getProfile, updateProfile } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/profile", verifyToken, getProfile);
router.put("/update-profile", verifyToken, updateProfile);

export default router; 