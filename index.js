import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import { sequelize } from './src/config/db.js';

import driverRoutes from './src/routes/driver.routes.js';
import routeRoutes from './src/routes/route.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import studentRoutes from './src/routes/student.routes.js';
import notificationRoutes from './src/routes/notification.routes.js';
import paymentRoutes from './src/routes/payment.routes.js';
import busRoutes from './src/routes/bus.routes.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());


app.use('/auth', authRoutes);
app.use('/students', studentRoutes);
app.use('/drivers', driverRoutes);
app.use('/routes', routeRoutes);
app.use('/notifications', notificationRoutes);
app.use('/payments', paymentRoutes);
app.use('/buses', busRoutes);

const PORT = process.env.PORT || 5000;

sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`✅ Server running at http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error('❌ Failed to connect to DB:', err);
  });