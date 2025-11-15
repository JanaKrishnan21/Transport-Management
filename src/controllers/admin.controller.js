import { Bus, Route, Student, Driver } from '../models/index.js';

export const getAdminStats = async (req, res) => {
  try {
    if (!req.user || !req.user.role) {
      return res.status(401).json({ error: "Unauthorized: no role found" });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    const buses = await Bus.count();
    const routes = await Route.count();
    const students = await Student.count();
    const drivers = await Driver.count();

    res.json({ buses, routes, students, drivers });
    console.time("stats");
  } catch (err) {
    console.error("ADMIN STATS ERROR:", err);
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
};

export const getGenderStats = async (req, res) => {
  try {
    const male = await Student.count({ where: { gender: "male" } });
    const female = await Student.count({ where: { gender: "female" } });

    res.json({ male, female });
  } catch (err) {
    console.error("Gender stats error:", err);
    res.status(500).json({ error: "Failed to fetch gender stats" });
  }
};
