const { Sequelize } = require('sequelize');

// Konfigurasi Sequelize
const sequelize = new Sequelize('videoplayerdb', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false // Menonaktifkan logging SQL
});

module.exports = sequelize;
