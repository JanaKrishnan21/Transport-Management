import {User} from './user.model.js';
import Bus from './bus.model.js';
import Route from './route.model.js';
import Student from './student.model.js';
import Driver from './driver.model.js';
import BusStop from './busStop.model.js';

Bus.hasMany(Student, { foreignKey: "bus_id", as: 'students' });
Student.belongsTo(Bus, { foreignKey: "bus_id", as: 'bus' });

// Associations
Bus.belongsTo(User, { as: 'driver', foreignKey: 'driverId' }); // Each Bus has one driver
User.hasOne(Bus, { as: 'drivenBus', foreignKey: 'driverId' });

Bus.belongsTo(Driver, { foreignKey: 'driver_id' });
Driver.hasOne(Bus, { foreignKey: 'driver_id' });

Bus.hasOne(Driver, { foreignKey: "bus_id" });
Driver.belongsTo(Bus, { foreignKey: "bus_id" , as: 'bus' });

Route.hasMany(BusStop, { foreignKey: 'route_id', as: 'stops' });
BusStop.belongsTo(Route, { foreignKey: 'route_id', as: 'route' });

Bus.belongsTo(Route, {foreignKey: 'route_id',as: 'route'});
Route.hasMany(Bus, {foreignKey: 'route_id',as: 'buses'});
// Student.belongsTo(Bus, { foreignKey: 'bus_id', as: 'bus' });
// Route.hasMany(Student, { foreignKey: 'route_id', as: 'students' });



export { User, Bus, Route, Student, Driver, BusStop };
