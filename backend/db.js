const { Sequelize } = require('sequelize');

// Hardcode trực tiếp (bỏ dotenv để tránh lỗi load .env)
const sequelize = new Sequelize('football_shop', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

module.exports = sequelize;