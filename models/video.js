// models/video.js
const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // Assume you have a sequelize instance

const Video = sequelize.define('Video', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Video;
