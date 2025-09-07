import { Student } from '../models/student.model.js';

export const setFee = async (req, res) => {
  try {
    const { id } = req.params; 
    const { amount } = req.body;

    const student = await Student.findByPk(id);
    if (!student) return res.status(404).json({ error: 'Student not found' });

    student.fee_amount = amount;
    student.fee_status = 'unpaid';
    await student.save();

    res.json({ message: 'Fee set', studentId: student.id, amount });
  } catch (err) {
    res.status(500).json({ error: 'Failed to set fee' });
  }
};


export const payFee = async (req, res) => {
  try {
    const { id } = req.params; 

    const student = await Student.findByPk(id);
    if (!student) return res.status(404).json({ error: 'Student not found' });

    student.fee_status = 'paid';
    await student.save();

    res.json({ message: 'Payment successful', studentId: student.id, amount: student.fee_amount });
  } catch (err) {
    res.status(500).json({ error: 'Payment failed' });
  }
};

// Get fee details
export const getFee = async (req, res) => {
  try {
    const { id } = req.params; 

    const student = await Student.findByPk(id);
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