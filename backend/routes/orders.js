const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');

// Lấy tất cả đơn hàng
router.get('/', async (req, res) => {
  try {
    const orders = await Order.findAll({ include: Product });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Tạo đơn hàng mới
router.post('/', async (req, res) => {
  try {
    const { product_id, customer_name, customer_phone, customer_address, quantity = 1 } = req.body;
    const product = await Product.findByPk(product_id);
    if (!product) return res.status(404).json({ message: 'Sản phẩm không tồn tại' });

    const total_price = product.price * quantity;

    const order = await Order.create({
      product_id,
      customer_name,
      customer_phone,
      customer_address,
      quantity,
      total_price
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Xóa đơn hàng
router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: 'Đơn hàng không tồn tại' });

    await order.destroy();
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Xác nhận đơn hàng (admin only)
router.put('/:id/confirm', async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Đơn hàng không tồn tại' });
    }

    order.status = 'Đã xác nhận'; // Hoặc 'Đã xác nhận'
    await order.save();

    res.json({ message: 'Đã xác nhận đơn hàng', order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// Xác nhận đơn hàng
router.put('/:id/confirm', async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });

    order.status = 'Đã xác nhận';
    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server' });
  }
});
module.exports = router;