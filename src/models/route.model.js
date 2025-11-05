import {DataTypes} from 'sequelize';
import {sequelize} from '../config/db.js';
import {User} from '../models/user.model.js';

export const Route = sequelize.define('Route', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }

});
// Route.belongsTo(User, { as: 'driver', foreignKey: 'driver_id' });
// User.hasMany(Route, { as: 'assignedRoutes', foreignKey: 'driver_id' });
export default Route;
