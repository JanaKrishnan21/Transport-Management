import express from 'express';
import {getStudentByDriver,getAllDrivers, createDriver,  updateDriver } from '../controllers/driver.controller.js';
import { auth } from '../middleware/auth.middleware.js';
import { permit } from '../middleware/role.middleware.js';

const router = express.Router();

// router.get("/students",auth,getDriverStudents);
router.get("/list", getAllDrivers);
router.post("/create",auth(['admin']),createDriver);
router.put('/:id',auth(['admin']), updateDriver);
router.get('/students/:userId', getStudentByDriver);
// router.get('/admin/drivers', listDrivers);

export default router;
