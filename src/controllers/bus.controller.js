import { Bus,User,Route } from "../models/index.js";

export const addBus = async (req, res) => {
   const { bus_no, capacity, route_id } = req.body; 
    if (!bus_no || !capacity) {
    return res.status(400).json({ error: "bus_no and capacity are required" });
  }
    try {
      const bus = await Bus.create({ bus_no, capacity, route_id });

        res.status(201).json(bus);
    } catch (err) {
      console.error("Add bus error:", err);
        res.status(500).json({ error:err.message });
    }
};

export const updateBus = async (req, res) => {
    const { bus_no, capacity, route_id } = req.body;
  const { id } = req.params;
    try {
        const bus = await Bus.findByPk(id);
        if (!bus) return res.status(404).json({ error: 'Bus not found' });
        await bus.update({ bus_no, capacity, route_id });
        res.json(bus);
    } catch (err) {
        console.log(err);
        
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
    const buses = await Bus.findAll({
      include: [
        {
          model: Route,
          as: "route",
          attributes: ["id", "name"]
        },
        {
          model: User,
          as: "driver",
          attributes: ["id", "name", "email", "username"],
          where: { role: "driver" },
          required: false
        }
      ]
    });

    res.status(200).json(buses); // ✅ send the data
  } catch (error) {
    console.error("Error fetching buses:", error);
    res.status(500).json({ message: "Failed to fetch buses" });
  }
};

