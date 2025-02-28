import express from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';
import { checkRole } from '../middleware/role.middleware.js';
import { upload } from '../utils/multer.js';
import {
  getGalleryItems,
  addGalleryItem,
  updateGalleryItem,
  deleteGalleryItem
} from '../controllers/gallery.controller.js';

const router = express.Router();

// Public routes
router.get('/', getGalleryItems);

// Protected routes (Admin/Staff only)
router.post('/', verifyToken, checkRole(['admin', 'staff']), upload.single('image'), addGalleryItem);
router.put('/:id', verifyToken, checkRole(['admin', 'staff']), upload.single('image'), updateGalleryItem);
router.delete('/:id', verifyToken, checkRole(['admin', 'staff']), deleteGalleryItem);

export default router; 