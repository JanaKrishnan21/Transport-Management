import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from '../models/user.model.js';
import Bus from '../models/bus.model.js';

const Driver = sequelize.define('Driver', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  bus_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Bus,
      key: 'id',
    },
  }
}, {
  tableName: 'drivers',
  timestamps: true,
});

// Associations
Driver.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Driver.belongsTo(Bus, { foreignKey: 'bus_id', as: 'bus' });

export default Driver;
