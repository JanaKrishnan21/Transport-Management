import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

export const auth = async (req, res, next) => {
    const header = req.header('Authorization');
    if (!header)  return res.status(401).json({ error: 'No token provided' });

    const token = header.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);
        if (!user) return res.status(401).json({ error: 'User not found' });
        req.user = user; 
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};
