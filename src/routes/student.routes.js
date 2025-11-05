import express from 'express';
import { viewstudent, addStudent, updatestudents, getTransportFee, getStudentWithBus } from '../controllers/student.controller.js';
import { auth } from '../middleware/auth.middleware.js';
import { permit } from '../middleware/role.middleware.js';

const router = express.Router();

// ✅ Admin only
router.get("/list", viewstudent);
router.post('/create', auth(['admin']), addStudent);
router.put('/students/:id',auth(['admin']), updatestudents);


// ✅ Public (no token needed for student/driver)
router.get("/students/:id/fee", getTransportFee);
router.get('/:userId', getStudentWithBus);

export default router;
