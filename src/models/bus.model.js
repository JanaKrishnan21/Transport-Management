import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { User } from '../models/user.model.js';

export const Bus = sequelize.define('Bus', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    bus_no: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }},{
  tableName: 'buses',
  timestamps: true,
});
    Bus.belongsTo(User, { as: 'driver', foreignKey: 'driver_id' });
    User.hasOne(Bus, { as: 'assignedBus', foreignKey: 'driver_id' });

    export default Bus; 