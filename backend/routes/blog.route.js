import express from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';
import { checkRole } from '../middleware/role.middleware.js';
import { upload } from '../utils/multer.js';
import {
  getBlogPosts,
  getBlogPost,
  addBlogPost,
  updateBlogPost,
  deleteBlogPost
} from '../controllers/blog.controller.js';

const router = express.Router();

// Public routes
router.get('/', getBlogPosts);
router.get('/:slug', getBlogPost);

// Protected routes (Admin/Staff only)
router.post('/', verifyToken, checkRole(['admin', 'staff']), upload.single('coverImage'), addBlogPost);
router.put('/:id', verifyToken, checkRole(['admin', 'staff']), upload.single('coverImage'), updateBlogPost);
router.delete('/:id', verifyToken, checkRole(['admin', 'staff']), deleteBlogPost);

export default router; 