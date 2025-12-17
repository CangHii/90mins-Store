import React from 'react';

const ProductCard = ({ product, onEdit, onDelete, onOrder }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <img 
        src={product.image_url || 'https://via.placeholder.com/300'} 
        alt={product.name} 
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
        <p className="text-gray-600">{product.team}</p>
        <p className="text-2xl font-bold text-green-600 mt-2">
          {Number(product.price).toLocaleString('vi-VN')} ₫
        </p>
        <p className="text-sm text-gray-500 mt-2 line-clamp-2">{product.description}</p>

        <div className="mt-6 flex gap-3">
          <button 
            onClick={() => onEdit(product)} 
            className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition font-medium"
          >
            Sửa
          </button>
          <button 
            onClick={() => onDelete(product.id)} 
            className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition font-medium"
          >
            Xóa
          </button>
          <button 
            onClick={() => onOrder(product)} 
            className="flex-1 bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition font-bold"
          >
            Đặt hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
