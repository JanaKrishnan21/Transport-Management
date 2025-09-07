import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { User } from '../models/user.model.js';
import { Route } from '../models/route.model.js';


export const Student = sequelize.define('Student', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    roll_no: { type: DataTypes.STRING, allowNull: false },
    fee_amount: { type: DataTypes.FLOAT, defaultValue: 0 },
    fee_status: { type: DataTypes.ENUM('unpaid', 'paid'), defaultValue: 'unpaid' }
});
Student.belongsTo(User, { as: 'profile', foreignKey: 'user_id' });
User.hasOne(Student, { as: 'studentProfile', foreignKey: 'user_id' });

Student.belongsTo(Route, { as: 'route', foreignKey: 'route_id' });
Route.hasMany(Student, { as: 'students', foreignKey: 'route_id' });

export default Student;
