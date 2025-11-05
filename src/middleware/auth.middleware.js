// middleware/auth.js
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

export const auth = (roles = []) => async (req, res, next) => {
  console.log("Auth middleware triggered")
  
  const header = req.header("Authorization");
  if (!header) return res.status(401).json({ error: "No token provided" });

  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) return res.status(401).json({ error: "User not found" });
    if (roles.length && !roles.includes(user.role)) {
      return res.status(403).json({ error: "Access denied" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log("Auth error:", err);
    
    res.status(401).json({ error: "Invalid token" });
  }
};
