import {User ,Driver,Bus} from '../models/index.js';

export const assignedBus = async (req, res) => {
    try {
        const {id} = req.params;
        const {bus_id}= req.body;
const driverUser = await User.findByPk(id);
    if (!driverUser || driverUser.role !== 'driver') {
      return res.status(404).json({ error: 'Driver not found' });
    }

    // check if bus exists
    const bus = await Bus.findByPk(bus_id);
    if (!bus) {
      return res.status(404).json({ error: 'Bus not found' });
    }

    // either create or update driver entry
    let driver = await Driver.findOne({ where: { user_id: driverUser.id } });

    if (!driver) {
      driver = await Driver.create({ user_id: driverUser.id, bus_id });
    } else {
      driver.bus_id = bus_id;
      await driver.save();
    }

    res.json({ message: 'Bus assigned to driver', driver });
    } catch (err) {
        res.status(500).json({ error: 'Assignment failed' });
    }
};

export const updateDriver = async (req, res) => {
    try {
        const driver = await User.findByPk(req.params.id);
        if (!driver || driver.role !== 'driver') {
            return res.status(404).json({ error: 'Driver not found' });
        }
        await driver.update(req.body);
        res.json(driver);
    } catch (err) {
        res.status(500).json({ error: 'Driver update failed' });
    }
};
export const listDrivers = async (req, res) => {
    try {
        const drivers = await User.findAll({ where: { role: 'driver' } });
        res.json(drivers);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch drivers' });
    }
};

