const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');

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
    console.error(err);
    res.status(500).json({ error: 'Lỗi khi tạo đơn hàng' });
  }
});

// Lấy tất cả đơn hàng (cho admin xem)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.findAll({ include: Product });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Xóa đơn hàng (admin)
router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: 'Đơn hàng không tồn tại' });

    await order.destroy();
    res.json({ message: 'Xóa đơn hàng thành công' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;