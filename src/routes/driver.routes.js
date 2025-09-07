import express from 'express';
import { assignedBus, updateDriver, listDrivers } from '../controllers/driver.controller.js';
import { auth } from '../middleware/auth.middleware.js';
import { permit } from '../middleware/role.middleware.js';

const router = express.Router();

router.put('/assign-bus/:id', auth, permit('admin'), assignedBus);
router.put('/update/:id', auth, permit('admin'), updateDriver);
router.get('/list', auth, permit('admin'), listDrivers);

export default router;
