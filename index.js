import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { sequelize } from "./src/config/db.js";

// Import routes
import driverRoutes from "./src/routes/driver.routes.js";
import routeRoutes from "./src/routes/route.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import studentRoutes from "./src/routes/student.routes.js";
import notificationRoutes from "./src/routes/notification.routes.js";
import paymentRoutes from "./src/routes/payment.routes.js";
import busRoutes from "./src/routes/bus.routes.js";

// Load environment variables
dotenv.config();

// Initialize app
const app = express();
app.use(express.json());

// Allow frontend connections (CORS)
app.use(
  cors({
    origin: [
      "http://localhost:3000", // local frontend
      "https://transport-management-frontend.vercel.app", // deployed frontend
    ],
    credentials: true,
  })
);

// Register API routes
app.use("/auth", authRoutes);
app.use("/students", studentRoutes);
app.use("/drivers", driverRoutes);
app.use("/routes", routeRoutes);
app.use("/notifications", notificationRoutes);
app.use("/payments", paymentRoutes);
app.use("/buses", busRoutes);

// Path setup for serving frontend in production
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve frontend build files if in production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "./frontend/build");
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// Database sync and server start
const PORT = process.env.PORT || 5000;

sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`✅ Server running at http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ Failed to connect to DB:", err);
  });
