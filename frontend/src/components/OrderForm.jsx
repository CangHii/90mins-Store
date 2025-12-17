import React, { useState } from 'react';

const OrderForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
    customer_address: '',
    quantity: 1
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Tính tổng tiền = giá sản phẩm * số lượng
    const total_price = product.price * formData.quantity;

    // Gửi dữ liệu lên backend
    onSave({
      product_id: product.id,
      ...formData,
      total_price
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl max-w-3xl mx-auto mb-12 border border-gray-200">
      <h2 className="text-3xl font-bold text-center mb-6 text-orange-600">
        Đặt hàng: {product.name}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="md:col-span-2">
          <img 
            src={product.image_url} 
            alt={product.name} 
            className="w-full h-80 object-cover rounded-lg shadow-md"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Họ và tên khách hàng <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.customer_name}
            onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
            className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:border-orange-500 transition"
            required
            placeholder="Nguyễn Văn A"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Số điện thoại <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={formData.customer_phone}
            onChange={(e) => setFormData({...formData, customer_phone: e.target.value})}
            className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:border-orange-500 transition"
            required
            placeholder="0901234567"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Địa chỉ giao hàng <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.customer_address}
            onChange={(e) => setFormData({...formData, customer_address: e.target.value})}
            className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:border-orange-500 transition"
            rows="3"
            required
            placeholder="123 Đường ABC, Quận 1, TP.HCM"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Số lượng
          </label>
          <input
            type="number"
            min="1"
            value={formData.quantity}
            onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value) || 1})}
            className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:border-orange-500 transition"
          />
        </div>

        <div className="flex items-end">
          <div className="bg-orange-100 p-4 rounded-lg w-full">
            <p className="text-lg font-semibold text-gray-700">Tổng tiền:</p>
            <p className="text-3xl font-bold text-orange-600">
              {(product.price * formData.quantity).toLocaleString('vi-VN')} ₫
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        <button
          type="submit"
          className="bg-orange-500 text-white px-10 py-4 rounded-lg hover:bg-orange-600 transition text-xl font-bold shadow-lg"
        >
          Xác nhận đặt hàng
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-10 py-4 rounded-lg hover:bg-gray-600 transition text-xl font-bold"
        >
          Hủy
        </button>
      </div>
    </form>
  );
};

export default OrderForm;