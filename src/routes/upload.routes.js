// routes/upload.js
import express from 'express';
import multer from 'multer';
import { uploadProfilePhoto } from '../controllers/upload.controllers.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/profile-photo', upload.single('photo'), uploadProfilePhoto);

export default router;
