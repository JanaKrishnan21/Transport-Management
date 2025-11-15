import { Student, Bus, Route, User } from '../models/index.js';
import bcrypt from "bcrypt";


export const viewstudent = async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
};

export const addStudent = async (req, res) => {
  try {
    const { name, email, bus_id, roll_no, username, password, route_id,profile_photo, genter  } = req.body;

    if (!name || !email || !roll_no || !username || !password || !route_id || !genter) {
      return res.status(400).json({ error: "Name, email, roll_no, username,password , route_id and gender are required" });
    }

    // Check for duplicate username or email
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) return res.status(400).json({ error: "Username already exists" });

    const existingEmail = await Student.findOne({ where: { email } });
    if (existingEmail) return res.status(400).json({ error: "Email already assigned to a student" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({ name, email, password: hashedPassword, role: "student" });

    // Create student linked to user
    const student = await Student.create({
      name,
      email,
      bus_id,
      roll_no,
      route_id,
      gender,
      user_id: user.id,
      profile_photo: profile_photo || '/default-profile.png',
      
    });

    res.status(201).json({ student, user });
  } catch (err) {
    console.error("Create student error:", err);
    res.status(500).json({ error: "Failed to create student" });
  }
};


export const updatestudents = async (req, res) => {
  try {
    // Find student by primary key (id)
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(404).json({ error: `Student with id ${req.params.id} not found` });
    }

    await student.update(req.body);
    res.json(student);
  } catch (err) {
    console.error("Update student error:", err);
    res.status(400).json({ error: "Failed to update student", details: err.message });
  }
};



export const getTransportFee = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });

    res.json({
      studentId: student.id,
      amount: student.fee_amount,
      status: student.fee_status
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch fee' });
  }
};


export const getStudentWithBus = async (req, res) => {
  const userId = req.params.userId;
  try {
    const student = await Student.findOne({
      where: { user_id: userId },
      include: {
        model: Bus,
        as: 'bus',
        attributes: ['bus_no', 'route_id'],
        include: {
          model: Route,
          as: 'route',
          attributes: ['id', 'name']
        }
      }

    });

    if (!student) return res.status(404).json({ error: "Student not found" });

    res.json(student);
  } catch (err) {
    console.error("Fetch student bus error:", err);
    res.status(500).json({ error: "Failed to fetch student bus info" });
  }
};
export const getStudentProfile = async (req, res) => {
  const userId = req.params.userId;

  try {
    const student = await Student.findOne({
      where: { user_id: userId },
      attributes: ['id', 'name', 'email', 'roll_no', 'bus_id', 'route_id','gender']
    });

    if (!student) return res.status(404).json({ error: "Student not found" });

    res.json(student);
  } catch (err) {
    console.error("Fetch student profile error:", err);
    res.status(500).json({ error: "Failed to fetch student profile" });
  }
};


