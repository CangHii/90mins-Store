const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Product = require('./Product');

const Order = sequelize.define('Order', {
  customer_name: { type: DataTypes.STRING, allowNull: false },
  customer_phone: { type: DataTypes.STRING, allowNull: false },
  customer_address: { type: DataTypes.TEXT, allowNull: false },
  quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
  total_price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'Chờ xử lý' }
}, {
  timestamps: false  // ← Đúng vị trí: nằm trong object thứ 2
});

Order.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = Order;