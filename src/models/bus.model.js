import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
// import { Student } from '../models/student.model.js';
// import { Driver } from '../models/driver.model.js';
// import { User } from '../models/user.model.js';

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
    },
     route_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
},{
  tableName: 'buses',
  timestamps: true,
});
   // Bus.js
// Bus.hasMany(Student, { foreignKey: "bus_id" });
// Bus.hasOne(Driver, { foreignKey: "bus_id" });


    export default Bus; 