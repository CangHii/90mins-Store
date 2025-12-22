import React from 'react';

const Cart = ({ cart, onUpdateQuantity, onRemoveItem, onPlaceOrder, onClose }) => {
  if (!cart || cart.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="bg-white p-12 rounded-xl shadow-2xl text-center max-w-lg w-full">
          <p className="text-3xl font-bold text-gray-700 mb-8">Giỏ hàng trống</p>
          <button 
            onClick={onClose}
            className="bg-orange-600 text-white px-10 py-4 rounded-lg hover:bg-orange-700 transition text-xl font-bold"
          >
            Tiếp tục mua sắm
          </button>
        </div>
      </div>
    );
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-2xl bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out translate-x-0">
      <div className="h-full flex flex-col">
        <div className="bg-orange-600 text-white p-6 flex justify-between items-center">
          <h2 className="text-3xl font-bold">Giỏ hàng ({cart.length} sản phẩm)</h2>
          <button onClick={onClose} className="text-4xl hover:text-gray-200">&times;</button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-6 bg-gray-50 p-6 rounded-xl">
              <img 
                src={item.image_url || 'https://via.placeholder.com/120'} 
                alt={item.name} 
                className="w-32 h-32 object-cover rounded-lg shadow"
              />
              <div className="flex-1">
                <h4 className="text-2xl font-bold">{item.name}</h4>
                <p className="text-gray-600 text-lg">{item.team}</p>
                <p className="text-2xl font-bold text-green-600 mt-2">
                  {Number(item.price).toLocaleString('vi-VN')} ₫
                </p>
              </div>
              <div className="flex flex-col items-end gap-4">
                <button 
                  onClick={() => onRemoveItem(item.id)}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  Xóa
                </button>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="bg-gray-300 w-10 h-10 rounded-full hover:bg-gray-400 disabled:opacity-50 text-xl font-bold"
                  >
                    -
                  </button>
                  <span className="text-xl font-bold w-12 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-300 w-10 h-10 rounded-full hover:bg-gray-400 text-xl font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t p-8 bg-gray-50">
          <div className="flex justify-between items-center mb-6">
            <p className="text-2xl font-semibold">Tổng tiền:</p>
            <p className="text-4xl font-bold text-orange-600">
              {total.toLocaleString('vi-VN')} ₫
            </p>
          </div>
          <button 
            onClick={onPlaceOrder}
            className="w-full bg-green-600 text-white py-5 rounded-lg hover:bg-green-700 transition text-2xl font-bold"
          >
            Đặt hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;