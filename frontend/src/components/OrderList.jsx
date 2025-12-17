import React from 'react';

const OrderList = ({ orders, onDeleteOrder }) => {
  if (orders.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-gray-600">Chưa có đơn hàng nào.</p>
      </div>
    );
  }

  return (
    <div className="mt-10 bg-white rounded-lg shadow-lg overflow-hidden">
      <h2 className="text-3xl font-bold text-center py-6 bg-blue-600 text-white">
        Danh sách đơn hàng
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Khách hàng</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Sản phẩm</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">SL</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tổng tiền</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Ngày đặt</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Trạng thái</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm">{order.id}</td>
                <td className="px-6 py-4 text-sm">
                  <div>
                    <p className="font-medium">{order.customer_name}</p>
                    <p className="text-gray-600">{order.customer_phone}</p>
                    <p className="text-gray-600 text-xs">{order.customer_address}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  {order.Product ? order.Product.name : 'Sản phẩm đã xóa'}
                </td>
                <td className="px-6 py-4 text-sm text-center">{order.quantity}</td>
                <td className="px-6 py-4 text-sm font-semibold text-green-600">
                  {Number(order.total_price).toLocaleString('vi-VN')} ₫
                </td>
                <td className="px-6 py-4 text-sm">
                  {new Date(order.order_date).toLocaleString('vi-VN')}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-center">
                  <button
                    onClick={() => onDeleteOrder(order.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition text-sm font-medium shadow"
                  >
                    Xóa đơn
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;