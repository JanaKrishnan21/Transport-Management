import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const BusStop = sequelize.define('BusStop', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  stop_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
export default BusStop;