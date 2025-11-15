import {Route,BusStop} from '../models/index.js';


export const addRoute = async (req, res) => {
  const { name, stops,  } = req.body;

  if (!name || !Array.isArray(stops)) {
    return res.status(400).json({ error: "Route name and stops[] are required" });
  }

  const route = await Route.create({ name });

  const stopEntries = stops.map(stop => ({
    stop_name: stop,
    route_id: route.id
  }));

  await BusStop.bulkCreate(stopEntries);

  res.status(201).json({ route, stops: stopEntries });
};


export const assignedBusToRoute = async (req, res) => {
  const { name, stops } = req.body;
  const { id } = req.params;

  try {
    const route = await Route.findByPk(id);
    if (!route) {
      return res.status(404).json({ error: 'Route not found' });
    }

    // Update route name only
    await route.update({ name });

    // Remove old stops
    await BusStop.destroy({ where: { route_id: id } });

    // Add new stops (supports both string and object format)
    const stopEntries = stops.map(stop => ({
      stop_name: typeof stop === 'string' ? stop : stop.stop_name,
      route_id: id
    }));
    await BusStop.bulkCreate(stopEntries);

    res.json({ route, stops: stopEntries });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const listRoutes = async (req, res) => {
    try {
        const routes = await Route.findAll({
            include: [{ model: BusStop, as: 'stops', attributes: ['id', 'stop_name'] }]
        });
        res.json(routes);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch routes' });
    }
};

