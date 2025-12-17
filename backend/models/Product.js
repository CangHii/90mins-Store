const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Product = sequelize.define('Product', {
  name: { type: DataTypes.STRING, allowNull: false },
  description: DataTypes.TEXT,
  price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  team: DataTypes.STRING,
  image_url: DataTypes.STRING
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

module.exports = Product;