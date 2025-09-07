import { Bus,User } from "../models/index.js";

export const addBus = async (req, res) => {
    try {
        const bus = await Bus.create(req.body);
        res.status(201).json(bus);
    } catch (err) {
        res.status(500).json({ error: 'Bus creation failed' });
    }
};

export const updateBus = async (req, res) => {
    try {
        const bus = await Bus.findByPk(req.params.id);
        if (!bus) return res.status(404).json({ error: 'Bus not found' });
        await bus.update(req.body);
        res.json(bus);
    } catch (err) {
        res.status(500).json({ error: 'Bus update failed' });
    }
};

export const deleteBus = async (req, res) => {
    try {
        const bus = await Bus.findByPk(req.params.id);
        if (!bus) return res.status(404).json({ error: 'Bus not found' });
        await bus.destroy();
        res.json({ message: 'Bus deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Bus deletion failed' });
    }
};

export const listBuses = async (req, res) => {
    try {
        const buses = await Bus.findAll({ include: [{ model: User, as: 'driver', attributes: ['id', 'name', 'email'] }] });
        res.json(buses);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch buses' });
    }
};

