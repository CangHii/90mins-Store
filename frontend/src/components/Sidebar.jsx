import React from 'react';

const Sidebar = ({ setShowForm, setShowOrders, setShowOrderForm }) => {
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-gray-100 shadow-2xl z-50 overflow-y-auto">
      <div className="p-6">
        <h2 className="text-3xl font-black text-center mb-12 tracking-wider">
          <span className="text-gray-100">90mins</span>
          <span className="text-gray-400"> Admin</span>
        </h2>

        <nav className="space-y-3">
          <button
            onClick={() => {
              setShowForm(true);
              setShowOrders(false);
              setShowOrderForm(false);
            }}
            className="w-full text-left px-6 py-4 rounded-lg bg-gray-800 hover:bg-gray-700 active:bg-gray-600 transition flex items-center gap-4 text-lg font-semibold shadow-lg border border-gray-700"
          >
            <span className="text-xl">➕</span>
            Thêm sản phẩm mới
          </button>

          <button
            onClick={() => {
              setShowOrders(true);
              setShowForm(false);
              setShowOrderForm(false);
              // loadOrders nếu cần reload mới nhất
            }}
            className="w-full text-left px-6 py-4 rounded-lg bg-gray-800 hover:bg-gray-700 active:bg-gray-600 transition flex items-center gap-4 text-lg font-semibold shadow-lg border border-gray-700"
          >
            <span className="text-xl">📦</span>
            Quản lý đơn hàng
          </button>

          <button
            onClick={() => {
              setShowOrders(false);
              setShowForm(false);
              setShowOrderForm(false);
            }}
            className="w-full text-left px-6 py-4 rounded-lg bg-gray-800 hover:bg-gray-700 active:bg-gray-600 transition flex items-center gap-4 text-lg font-semibold shadow-lg border border-gray-700"
          >
            <span className="text-xl">🏪</span>
            Xem cửa hàng
          </button>
        </nav>
      </div>

      <div className="absolute bottom-6 left-6 right-6 text-center text-sm opacity-70">
        <p>© 2025 90mins Store</p>
        <p className="text-xs mt-2">Hệ thống quản trị</p>
      </div>
    </div>
  );
};

export default Sidebar;