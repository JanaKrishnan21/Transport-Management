import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, Driver, Student } from '../models/index.js'
import { error } from '../utils/response.js';

export const register = async (req, res) => {
  try {
    const { username, password, name, email, role, roll_no,bus_id,license_no } = req.body;

    // 1️⃣ Validate required fields
    if (!username || !password || !name || !email) {
      return res.status(400).json({
        error: "Username, password, name, and email are required"
      });
    }

    // 2️⃣ Check for duplicates
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) return res.status(400).json({ error: "Username already exists" });

    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) return res.status(400).json({ error: "Email already exists" });

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Create user with role
    const user = await User.create({
      username,
      password: hashedPassword,
      name,
      email,
      role: role || "student" // default to student if role missing
    });

    // 5️⃣ Create role-specific records
    if (role === "driver") {
      await Driver.create({ user_id: user.id,
        bus_id: bus_id || null,
        license_no, name,email  });
    } else if (role === "student") {
      await Student.create({  name,
        email,
        roll_no,
        bus_id: bus_id || null,
        user_id: user.id });
    }

    // 6️⃣ Send response once
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });

  } catch (err) {
    console.error("REGISTER ERROR:", err);

    // Handle Sequelize validation errors
    if (err.name === "SequelizeValidationError") {
      return res.status(400).json({ errors: err.errors.map(e => e.message) });
    }

    res.status(500).json({ error: "Registration failed" });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    console.log("Login request:", { email, password });
  
    if (!user) return res.status(400).json({error: 'Invalid credentials' });
    console.log(user);
    console.log("Email from request:", `"${req.body.email}"`);
    console.log("Password from request:", `"${req.body.password}"`);
    console.log("Hash from DB:", `"${user.password}"`);
    console.log(error);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("user.password:", user.password)
    console.log("Compare result:", isMatch);
    
    if (!isMatch) return res.status(400).json({error: 'Invalid credentials' });
    
    
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
    res.json({ 
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
     });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Login failed' });
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

