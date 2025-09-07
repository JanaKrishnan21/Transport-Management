import express from 'express';
import { setFee, payFee, getFee } from '../controllers/payment.controller.js';
import { auth } from '../middleware/auth.middleware.js';
import { permit } from '../middleware/role.middleware.js';

const router = express.Router();

router.post('/set/:id', auth, permit('admin'), setFee);
router.post('/pay/:id', auth, permit('student'), payFee);
router.get('/fee/:id', auth, permit('admin', 'student'), getFee);

export default router;
