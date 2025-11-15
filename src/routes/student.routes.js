import express from 'express';
import { viewstudent, addStudent, updatestudents, getTransportFee, getStudentWithBus,getStudentProfile } from '../controllers/student.controller.js';
import { auth } from '../middleware/auth.middleware.js';
import { permit } from '../middleware/role.middleware.js';

const router = express.Router();

// ✅ Admin only
router.get("/list", viewstudent);
router.post('/create', auth(['admin']), addStudent);
router.put('/:id', updatestudents);


// ✅ Public (no token needed for student/driver)
router.get("/students/:id/fee", getTransportFee);
router.get('/:userId', getStudentWithBus);
router.get('/profile/:id', getStudentProfile);
export default router;
