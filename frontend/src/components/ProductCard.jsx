import React from 'react';

const ProductCard = ({ product, onEdit, onDelete, onAddToCart, onOrder, currentUser, customerUser }) => {
  const isAdmin = currentUser?.role === 'admin';
  const isCustomer = customerUser?.role === 'customer' || !currentUser; // Khách hoặc chưa login admin

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img 
        src={product.image_url || 'https://via.placeholder.com/300'} 
        alt={product.name} 
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-1">{product.team}</p>
        <p className="text-2xl font-bold text-green-600 mb-3">
          {Number(product.price).toLocaleString('vi-VN')} ₫
        </p>
        <p className="text-sm text-gray-500 line-clamp-2 mb-6">{product.description}</p>

        <div className="grid grid-cols-2 gap-3">
          {/* Nút Sửa - chỉ admin */}
          {isAdmin && onEdit && (
            <button 
              onClick={() => onEdit(product)} 
              className="bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition font-medium shadow col-span-1"
            >
              Sửa
            </button>
          )}

          {/* Nút Xóa - chỉ admin */}
          {isAdmin && onDelete && (
            <button 
              onClick={() => onDelete(product.id)} 
              className="bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition font-medium shadow col-span-1"
            >
              Xóa
            </button>
          )}

          {/* Nút Thêm vào giỏ - chỉ khách */}
          {isCustomer && onAddToCart && (
            <button 
              onClick={() => onAddToCart(product)} 
              className="bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition font-bold shadow flex items-center justify-center gap-2 col-span-1"
            >
              <span className="text-xl">🛒</span>
              Thêm vào giỏ
            </button>
          )}

          {/* Nút Đặt hàng ngay - chỉ khách */}
          {isCustomer && onOrder && (
            <button 
              onClick={() => onOrder(product)} 
              className="bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition font-bold shadow col-span-1"
            >
              Đặt hàng ngay
            </button>
          )}
        </div>

        {/* Nếu là admin và không có nút nào (tránh trống) */}
        {isAdmin && !onEdit && !onDelete && (
          <p className="text-center text-gray-500 py-4">Chỉ xem (admin)</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;