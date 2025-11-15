import express from 'express';
import { getAdminStats , getGenderStats } from '../controllers/admin.controller.js';
import { auth } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/stats',auth(['admin']), getAdminStats);
router.get("/gender-stats", getGenderStats);

export default router;
