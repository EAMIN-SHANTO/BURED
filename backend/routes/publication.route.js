import express from 'express';
import { getPublications, createPublication, deletePublication } from '../controllers/publication.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { checkRole } from '../middleware/role.middleware.js';
import { upload } from '../utils/multer.js';

const router = express.Router();

// Public routes
router.get('/', getPublications);

// Protected routes
router.post('/', 
  verifyToken, 
  checkRole(['admin', 'staff']), 
  upload.single('coverImage'), 
  createPublication
);

router.delete('/:id', 
  verifyToken, 
  checkRole(['admin', 'staff']), 
  deletePublication
);

export default router; 