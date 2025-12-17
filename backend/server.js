const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./db');
const Product = require('./models/Product');
const Order = require('./models/Order.js');

const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders.js');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

async function startServer() {
  try {
    await sequelize.authenticate();
    await Product.sync();
    await Order.sync();
    console.log('Database connected & synced');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Backend running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Unable to connect to DB:', err);
  }
}

startServer();