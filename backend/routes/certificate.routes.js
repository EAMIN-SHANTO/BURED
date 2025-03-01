import express from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';
import { checkRole } from '../middleware/role.middleware.js';
import * as certificateController from '../controllers/certificate.controller.js';

const router = express.Router();

// Public verification route
router.get('/verify/:certificateId', certificateController.verifyCertificate);

// Admin routes (protected)
router.post('/', verifyToken, checkRole(['admin', 'staff']), certificateController.createCertificate);
router.get('/', verifyToken, checkRole(['admin', 'staff']), certificateController.getAllCertificates);
router.get('/:id', verifyToken, checkRole(['admin', 'staff']), certificateController.getCertificateById);
router.put('/:id', verifyToken, checkRole(['admin', 'staff']), certificateController.updateCertificate);
router.delete('/:id', verifyToken, checkRole(['admin', 'staff']), certificateController.deleteCertificate);
router.get('/download/:id', verifyToken, checkRole(['admin', 'staff']), certificateController.generateCertificatePDF);

export default router; 