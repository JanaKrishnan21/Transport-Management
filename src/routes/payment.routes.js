import express from 'express';
import { setFee, payFee, getFee } from '../controllers/payment.controller.js';
import { auth } from '../middleware/auth.middleware.js';
import { permit } from '../middleware/role.middleware.js';

const router = express.Router();

// Admin-only: set fee for student
router.post('/set/:id', auth, permit('admin'), setFee);

// Student-only: pay fee (requires token if you enforce student login)
router.post('/pay/:id', payFee);

// Fee details: public for student, token required for admin
router.get('/fee/:id', getFee);

export default router;
