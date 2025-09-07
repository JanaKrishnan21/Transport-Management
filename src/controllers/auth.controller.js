import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, Driver,Student } from '../models/index.js'

export const register = async (req, res) => {
  try {
    const { name, email, password, role ,roll_no} = req.body;

    // check if first admin
    const adminExists = await User.findOne({ where: { role: 'admin' } });
    if (role === 'admin' && !adminExists) {
      const hash = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hash, role });
      return res.status(201).json({ id: user.id, name: user.name, email: user.email, role: user.role });
    }

    // for all other users, require admin
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Only admins can register new users' });
    }

    // check duplicate
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(400).json({ error: 'User already exists' });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash, role });

    // if driver, create driver entry
    if (role === 'driver') {
      await Driver.create({ user_id: user.id, bus_id: null });
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,});
    }
    else if (role === 'student') {
      await Student.create({ user_id: user.id, route_id: null,roll_no });
    }

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    console.error('REGISTER ERROR:', err); // ✅ log actual error
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Login failed' });
    }
};
export const logout = (req, res) => {
    res.json({ message: 'Logged out successfully' });
};

export const resetpassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = await User.findByPk(req.user.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Old password is incorrect' });
        const hash = await bcrypt.hash(newPassword, 10);
        user.password = hash;
        await user.save();
        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Password reset failed' });
    }
};

