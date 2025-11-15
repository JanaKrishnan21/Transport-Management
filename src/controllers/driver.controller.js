import {Driver,Student, Bus, Route, User } from '../models/index.js';
import { Op } from "sequelize";

export const getDriverStudents = async (req, res) => {
  try {
    const driverId = req.user.id; // Assuming you have JWT middleware

    // Get driver info including bus
    const driver = await Driver.findOne({
  where: { user_id: driverId, bus_id: { [Op.ne]: null } }
});
console.log("driver",driver);


    if (!driver || !driver.bus_id) {
      return res.status(404).json({ error: "Driver or assigned bus not found" });
    }

    // Get students in that bus
    const students = await Student.findAll({
      where: { bus_id: driver.bus_id },
      attributes: ["id", "name", "email", "roll_no", "profile_photo"]
    });

    res.json({ students });
  } catch (err) {
    console.error("Driver students error:", err);
    res.status(500).json({ error: "Failed to fetch students" });
  }
};

export const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.findAll();
    res.json(drivers);
  } catch (err) {
    console.error("Fetch drivers error:", err);
    res.status(500).json({ error: "Failed to fetch drivers" });
  }
};
export const  createDriver = async (req, res) => {
  try {
    const { name, email, license_no, bus_id,route_id,password,username,profile_photo} = req.body;
    const driver = await Driver.create({ name, email, license_no, bus_id ,route_id,password,username,profile_photo});
    res.status(201).json(driver);
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ error: "Email already exists" });
    }
    console.error("Create driver error:", err);
    res.status(500).json({ error: "Failed to create driver" });
  }
};
export const updateDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, license_no, bus_id,route_id ,password,username,profile_photo} = req.body;
    const driver = await Driver.findByPk(id);
    if (!driver) return res.status(404).json({ error: "Driver not found" });

    await driver.update({ name, email, license_no, bus_id,route_id,password,username,profile_photo });
    res.json(driver);
  } catch (err) {
    console.error("Update driver error:", err);
    res.status(500).json({ error: "Failed to update driver" });
  }
};

export const getStudentByDriver = async (req, res) => {
  const userId = req.params.userId;
  console.log('Received userId:', userId);

  try {
    const driver = await Driver.findOne({
      where: { user_id: userId },
      include: {
        model: Bus,
        as: 'bus',
        include: [
          {
            model: Student,
            as: 'students' 
          },
          {
            model: Route,
            as: 'route',
            attributes: ['id', 'name']
          }
        ]
      }
    });

    console.log(driver);
    res.json(driver);
  } catch (error) {
    console.error("Error fetching driver data:", error);
    res.status(500).json({ error: "Failed to fetch driver data" });
  }
};



// export const assignedBus = async (req, res) => {
//     try {
//         const {id} = req.params;
//         const {bus_id}= req.body;
// const driverUser = await User.findByPk(id);
//     if (!driverUser || driverUser.role !== 'driver') {
//       return res.status(404).json({ error: 'Driver not found' });
//     }

//     // check if bus exists
//     const bus = await Bus.findByPk(bus_id);
//     if (!bus) {
//       return res.status(404).json({ error: 'Bus not found' });
//     }

//     // either create or update driver entry
//     let driver = await Driver.findOne({ where: { user_id: driverUser.id } });

//     if (!driver) {
//       driver = await Driver.create({ user_id: driverUser.id, bus_id });
//     } else {
//       driver.bus_id = bus_id;
//       await driver.save();
//     }

//     res.json({ message: 'Bus assigned to driver', driver });
//     } catch (err) {
//         res.status(500).json({ error: 'Assignment failed' });
//     }
// };

// export const updateDriver = async (req, res) => {
//     try {
//         const driver = await User.findByPk(req.params.id);
//         if (!driver || driver.role !== 'driver') {
//             return res.status(404).json({ error: 'Driver not found' });
//         }
//         await driver.update(req.body);
//         res.json(driver);
//     } catch (err) {
//         res.status(500).json({ error: 'Driver update failed' });
//     }
// };
// export const listDrivers = async (req, res) => {
//     try {
//         const drivers = await User.findAll({ where: { role: 'driver' } });
//         res.json(drivers);
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to fetch drivers' });
//     }
// };

