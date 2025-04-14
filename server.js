require('dotenv').config();
const { sequelize } = require('./models');
const app = require('./app');

const PORT = process.env.PORT || 5000;

// Sync database before starting server
sequelize.sync({ alter: true }) // Use { force: true } only when you want to drop tables
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Database: ${process.env.DB_NAME}`);
    });
  })
  .catch(err => {
    console.error('Database sync error:', err);
    process.exit(1);
  });
  