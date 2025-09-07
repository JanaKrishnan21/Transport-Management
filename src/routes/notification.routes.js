import express from 'express';
import { sendNotification } from '../controllers/notification.controller.js';
import { auth } from '../middleware/auth.middleware.js';
import { permit } from '../middleware/role.middleware.js';

const router = express.Router();

router.post('/send', auth, permit('admin'), sendNotification);

export default router;
