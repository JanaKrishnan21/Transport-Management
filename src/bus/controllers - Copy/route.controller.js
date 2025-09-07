import {Route} from '../models/index.js';

export const addRoute = async (req, res) => {
    try {
        const route = await Route.create(req.body);
        res.status(201).json(route);
    } catch (err) {
        res.status(500).json({ error: 'Route creation failed' });
    }
};

export const assignedBusToRoute = async (req, res
) => {
    try {
        const { id } = req.params;
        const { bus_id } = req.body;
        const route = await Route.findByPk(id);
        if (!route) {
            return res.status(404).json({ error: 'Route not found' });
        }
        route.busId = bus_id;
        await route.save();
        res.json({ message: 'Bus assigned to route', route });
    } catch (err) {
        res.status(500).json({ error: 'Assignment failed' });
    }
};

export const listRoutes = async (req, res) => {
    try {
        const routes = await Route.findAll();
        res.json(routes);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch routes' });
    }
};

