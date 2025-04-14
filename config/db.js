const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Helper to safely remove a constraint
async function safeRemoveConstraint(tableName, constraintName) {
  try {
    const [results] = await sequelize.query(`
      SELECT CONSTRAINT_NAME
      FROM information_schema.KEY_COLUMN_USAGE
      WHERE TABLE_NAME = '${tableName}' AND CONSTRAINT_NAME = '${constraintName}'
    `);

    if (results.length > 0) {
      await sequelize.getQueryInterface().removeConstraint(tableName, constraintName);
      console.log(`Removed constraint: ${constraintName}`);
      return true;
    } else {
      console.log(`Constraint "${constraintName}" does not exist, skipping.`);
      return true;
    }
  } catch (err) {
    console.error(`Error checking/removing constraint "${constraintName}":`, err.message);
    return false; // Return false on failure like deadlock
  }
}

sequelize.authenticate()
  .then(async () => {
    console.log('Database connected successfully');

    const removed1 = await safeRemoveConstraint('tasks', 'tasks_ibfk_1');
    const removed2 = await safeRemoveConstraint('tasks', 'tasks_ibfk_2');

    if (removed1 && removed2) {
      console.log('Constraint removal (if any) complete');

      // Now attempt to sync only if removal succeeded
      try {
        await sequelize.sync({ alter: true }); // Or { force: true } if you want to rebuild
        console.log('Database synced successfully');
      } catch (syncErr) {
        console.error('Database sync error:', syncErr);
      }
    } else {
      console.warn('Skipping database sync due to unresolved constraint removal');
    }
  })
  .catch(err => console.error('Unable to connect to database:', err));

module.exports = sequelize;
