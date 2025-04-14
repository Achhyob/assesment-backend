const { Sequelize } = require('sequelize');
const sequelize = require('../config/db');

// Import model functions
const userModel = require('./user.model');
const taskModel = require('./task.model');

// Initialize models
const User = userModel(sequelize, Sequelize.DataTypes);
const Task = taskModel(sequelize, Sequelize.DataTypes);

// Define relationships
User.hasMany(Task, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});
Task.belongsTo(User, {
  foreignKey: 'userId'
});

// Sync models (for development)
sequelize.sync({ alter: true })
  .then(() => console.log('Database & tables synced'))
  .catch(err => console.error('Sync error:', err));

module.exports = {
  sequelize,
  User,
  Task
};