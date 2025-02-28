import express from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';
import { checkRole } from '../middleware/role.middleware.js';
import {
  getPanelMembers,
  addPanelMember,
  updatePanelMember,
  deletePanelMember,
  updateOrder
} from '../controllers/panel.controller.js';

const router = express.Router();

// Public routes
router.get('/', getPanelMembers);

// Protected routes (Admin/Staff only)
router.post('/', verifyToken, checkRole(['admin', 'staff']), addPanelMember);
router.put('/:id', verifyToken, checkRole(['admin', 'staff']), updatePanelMember);
router.delete('/:id', verifyToken, checkRole(['admin', 'staff']), deletePanelMember);
router.put('/order/update', verifyToken, checkRole(['admin', 'staff']), updateOrder);

export default router; 