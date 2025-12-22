import React, { useState } from 'react';

const OrderForm = ({ orderingItems, onSave, onCancel }) => {
  const [customer_name, setCustomerName] = useState('');
  const [customer_phone, setCustomerPhone] = useState('');
  const [customer_address, setCustomerAddress] = useState('');
  const [error, setError] = useState('');

  // Tính tổng tiền
  const total_price = orderingItems.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!customer_name || !customer_phone || !customer_address) {
      setError('Vui lòng điền đầy đủ thông tin');
      return;
    }

    try {
      // Tạo dữ liệu chung cho tất cả đơn hàng
      const commonData = {
        customer_name,
        customer_phone,
        customer_address
      };

      // Gọi onSave từ App.jsx (sẽ xử lý tạo nhiều đơn)
      await onSave(commonData);

      // onSave đã xử lý thành công → đóng form
      onCancel();
    } catch (err) {
      setError('Có lỗi khi đặt hàng. Vui lòng thử lại.');
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl max-w-4xl mx-auto my-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">
        Xác nhận đặt hàng
      </h2>

      {/* Danh sách sản phẩm trong đơn */}
      <div className="mb-8 border-b-2 border-gray-200 pb-8">
        <h3 className="text-2xl font-semibold mb-6">Sản phẩm trong đơn hàng</h3>
        <div className="space-y-6">
          {orderingItems.map((item) => (
            <div key={item.product.id} className="flex items-center justify-between bg-gray-50 p-6 rounded-lg shadow">
              <div className="flex items-center gap-6">
                <img 
                  src={item.product.image_url || 'https://via.placeholder.com/120'} 
                  alt={item.product.name} 
                  className="w-28 h-28 object-cover rounded-lg"
                />
                <div>
                  <h4 className="text-xl font-bold">{item.product.name}</h4>
                  <p className="text-gray-600 text-lg">{item.product.team}</p>
                  <p className="text-lg text-gray-700 mt-2">
                    Số lượng: <strong>{item.quantity}</strong>
                  </p>
                </div>
              </div>
              <p className="text-2xl font-bold text-green-600">
                {(item.product.price * item.quantity).toLocaleString('vi-VN')} ₫
              </p>
            </div>
          ))}
        </div>

        <div className="text-right mt-8">
          <p className="text-3xl font-bold text-orange-600">
            Tổng tiền: {total_price.toLocaleString('vi-VN')} ₫
          </p>
        </div>
      </div>

      {/* Form thông tin khách hàng */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-lg font-medium mb-2">Họ và tên</label>
            <input
              type="text"
              value={customer_name}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Nhập họ và tên"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Số điện thoại</label>
            <input
              type="text"
              value={customer_phone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="Nhập số điện thoại"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg"
              required
            />
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-lg font-medium mb-2">Địa chỉ giao hàng</label>
          <textarea
            value={customer_address}
            onChange={(e) => setCustomerAddress(e.target.value)}
            placeholder="Nhập địa chỉ chi tiết"
            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg h-32 resize-none"
            required
          />
        </div>

        {error && (
          <p className="text-red-500 text-center font-medium text-lg mb-6">{error}</p>
        )}

        <div className="flex justify-end gap-6">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-10 py-4 rounded-lg hover:bg-gray-600 transition text-xl font-semibold"
          >
            Hủy bỏ
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white px-10 py-4 rounded-lg hover:bg-green-700 transition text-xl font-bold"
          >
            Xác nhận đặt hàng
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;