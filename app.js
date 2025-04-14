const express = require('express');
const { sequelize } = require('./models');

const app = express();

// Sync database models
sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Database sync error:', err));

module.exports = app;