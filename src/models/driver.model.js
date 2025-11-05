import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { User } from '../models/user.model.js';
import { Bus } from '../models/bus.model.js';

export const Driver = sequelize.define('Driver', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'id'
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  license_no: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  bus_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'Buses', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  route_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  
});

// Associations
Driver.belongsTo(User, { foreignKey: "user_id" });
Driver.belongsTo(Bus, { foreignKey: "bus_id" });

export default Driver;

