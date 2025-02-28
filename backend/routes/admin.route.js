import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import { verifyAdmin } from "../middleware/admin.middleware.js";
import {
  getAllUsers,
  updateUser,
  deleteUser,
  getCurrentPanel,
  updatePanel,
  getAboutContent,
  updateAboutContent,
  getAllPhotos,
  uploadPhoto,
  deletePhoto,
  getAllPosts,
  createPost,
  updatePost,
  deletePost
} from "../controllers/admin.controller.js";

const router = express.Router();

// All routes here require authentication and admin/staff role
router.use(verifyToken, verifyAdmin);

// Users Management Routes
router.get("/users", getAllUsers);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

// Panel Management Routes
router.get("/panel", getCurrentPanel);
router.put("/panel", updatePanel);

// About Page Routes
router.get("/about", getAboutContent);
router.put("/about", updateAboutContent);

// Gallery Routes
router.get("/gallery", getAllPhotos);
router.post("/gallery", uploadPhoto);
router.delete("/gallery/:id", deletePhoto);

// Blog Routes
router.get("/blog", getAllPosts);
router.post("/blog", createPost);
router.put("/blog/:id", updatePost);
router.delete("/blog/:id", deletePost);

export default router; 