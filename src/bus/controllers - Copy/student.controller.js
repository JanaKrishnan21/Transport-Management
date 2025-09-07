import { Student, Bus, Route, User } from '../models/index.js';


export const addStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add student' });
  }
};


import { Student, Bus } from '../models/index.js';

export const assignRoute = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });

    const bus = await Bus.findByPk(req.body.bus_id);
    if (!bus) return res.status(404).json({ error: 'Bus not found' });

    // Assign bus to student
    student.bus_id = bus.id;
    await student.save();

    res.json({ message: 'Bus successfully assigned to student', student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to assign bus' });
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


export const getStudentsByDriver = async (req, res) => {
  try {
    const { driverId } = req.params;

    if (req.user.role === 'driver' && req.user.id !== parseInt(driverId)) {
      return res.status(403).json({ error: 'Forbidden: not your bus' });
    }

    const bus = await Bus.findOne({ where: { driver_id: driverId }, include: [Route] });
    if (!bus || !bus.route) return res.status(404).json({ error: 'No route assigned to this bus' });

    const students = await Student.findAll({
      where: { route_id: bus.route.id },
      include: [{ model: User, as: 'profile', attributes: ['id', 'name', 'email'] }]
    });

    res.json(students);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
};
