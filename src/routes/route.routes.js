import express from 'express';
import { addRoute, assignedBusToRoute, listRoutes } from '../controllers/route.controller.js';
import { auth } from '../middleware/auth.middleware.js';
import { permit } from '../middleware/role.middleware.js';

const router = express.Router();

router.post('/add', auth, permit('admin'), addRoute);
router.put('/assign-bus/:id', auth, permit('admin'), assignedBusToRoute);
router.get('/list', auth, permit('admin', 'driver', 'student'), listRoutes);

export default router;
