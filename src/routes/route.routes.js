import express from 'express';
import { addRoute, assignedBusToRoute, listRoutes } from '../controllers/route.controller.js';
import { auth } from '../middleware/auth.middleware.js';
import { permit } from '../middleware/role.middleware.js';

const router = express.Router();

// Admin-only actions
router.post('/add', auth(['admin']), addRoute);
router.put('/assign-bus/:id', auth(['admin']), assignedBusToRoute);

// Route list → public for student & driver, secured for admin
router.get('/list', listRoutes);

export default router;
