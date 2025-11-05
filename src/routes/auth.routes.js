import express from 'express';
import { register, login, logout, resetpassword } from '../controllers/auth.controller.js';
import { auth } from '../middleware/auth.middleware.js';
import { permit } from '../middleware/role.middleware.js';
import validate from '../middleware/validate.middleware.js';
import { z } from 'zod';

const router = express.Router();

// Admin-only registration (requires JWT + admin role)
router.post(
  '/register',
  
  // permit('admin'),
  // validate(
  //   z.object({
  //     name: z.string().min(1),
  //     email: z.string().email(),
  //     password: z.string().min(6),
  //     role: z.enum(['admin', 'driver', 'student'])
  //   })
  // ),
  register
);

// Login (any user can login, but token is only issued for Admin)
router.post('/login', login);

// Logout (Admin only, requires token)
router.post('/logout', auth(['admin']), logout);

// Reset password (Admin only, requires token)
router.post('/reset-password', auth, permit('admin'), resetpassword);

export default router;
