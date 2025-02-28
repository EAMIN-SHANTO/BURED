import express from 'express';
import { submitRegistration, getRegistrations, markAsRead } from '../controllers/registration.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { checkRole } from '../middleware/role.middleware.js';

const router = express.Router();

// Test route
router.get('/test', (req, res) => {
  res.json({ success: true, message: 'Registration API is working' });
});

// Public route for submitting registration
router.post('/', submitRegistration);

// Protected routes for admin/staff
router.get('/', verifyToken, checkRole(['admin', 'staff']), async (req, res) => {
  try {
    const registrations = await getRegistrations(req, res);
    console.log('Registrations fetched:', registrations);
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch registrations'
    });
  }
});

router.put('/:id/read', verifyToken, checkRole(['admin', 'staff']), markAsRead);

export default router; 