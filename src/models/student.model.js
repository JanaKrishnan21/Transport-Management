import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
// import { User } from '../models/user.model.js';
// import { Bus } from '../models/bus.model.js';
// import { Route } from '../models/route.model.js';


export const Student = sequelize.define('Student', {
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
name: { type: DataTypes.STRING, allowNull: false },
email: { type: DataTypes.STRING, allowNull: false },
roll_no: { type: DataTypes.STRING, allowNull: false },
bus_id: { type: DataTypes.INTEGER, allowNull: true },
 route_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
profile_photo: {
  type: DataTypes.STRING,
  allowNull: true // optional if you want a default fallback
},
gender: {
  type: DataTypes.STRING,
  allowNull: false,
  validate: {
    isIn: [['male', 'female']]
  }
}

});

// Student.js
// Student.belongsTo(User, { foreignKey: "user_id" });
// Student.belongsTo(Bus, { foreignKey: "bus_id" });

// Student.belongsTo(Route, { as: 'route', foreignKey: 'route_id' });
// Route.hasMany(Student, { as: 'students', foreignKey: 'route_id' });

export default Student;
