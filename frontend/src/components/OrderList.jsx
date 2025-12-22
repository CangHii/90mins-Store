import React from 'react';

const OrderList = ({ orders, onDeleteOrder, onConfirmOrder, currentUser, customerUser }) => {
  const isAdmin = currentUser?.role === 'admin';

  if (orders.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-gray-600">Chưa có đơn hàng nào.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
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
            {orders.map((order) => {
              const isOwner = customerUser && order.customer_name.toLowerCase().includes(customerUser.username.toLowerCase());
              const rawStatus = order.status ? order.status.trim() : 'Chờ xác nhận';
              const status = rawStatus === 'Đã xác nhận' ? 'Đã xác nhận' : 'Chờ xác nhận';
              const canCancel = status === 'Chờ xác nhận';

              return (
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
                  <td className="px-6 py-4 text-sm text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      status === 'Chờ xác nhận' ? 'bg-yellow-100 text-yellow-800' :
                      status === 'Đã xác nhận' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-center space-y-2">
                    {/* Nút Xác nhận đơn - chỉ admin khi Chờ xác nhận */}
                    {isAdmin && status === 'Chờ xác nhận' && onConfirmOrder && (
                      <button
                        onClick={() => onConfirmOrder(order.id)}
                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition text-sm font-medium shadow w-full mb-2"
                      >
                        Xác nhận đơn
                      </button>
                    )}

                    {/* Nút Xóa/Hủy đơn */}
                    {(isAdmin || (isOwner && canCancel)) && onDeleteOrder && (
                      <button
                        onClick={() => onDeleteOrder(order.id)}
                        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition text-sm font-medium shadow w-full"
                      >
                        {isAdmin ? 'Xóa đơn' : 'Hủy đơn'}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;