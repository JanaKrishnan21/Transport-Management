import express from 'express';
import { addStudent, assignRoute, getTransportFee, getStudentsByDriver } from '../controllers/student.controller.js';
import { auth } from '../middleware/auth.middleware.js';
import { permit } from '../middleware/role.middleware.js';

const router = express.Router();

router.post('/add', auth, permit('admin'), addStudent);
router.put('/assign-bus/:id', auth, permit('admin'), assignRoute);
router.get('/transport-fee/:id', auth, permit('admin', 'student'), getTransportFee);
router.get('/by-driver/:driverId', auth, permit('driver'), getStudentsByDriver);

export default router;
