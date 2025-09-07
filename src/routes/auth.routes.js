import express from 'express';
import { register, login , logout, resetpassword} from '../controllers/auth.controller.js';
import { auth} from '../middleware/auth.middleware.js';
import { permit } from '../middleware/role.middleware.js';
import validate from '../middleware/validate.middleware.js';
import {z} from 'zod';

const router = express.Router();

router.post('/register', auth, permit('admin'), validate(z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['admin','driver','student'])
})), register);
router.post('/login', login);
router.post('/logout', auth, logout);
router.post('/reset-password', auth, resetpassword);

export default router;
