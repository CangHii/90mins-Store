import React, { useState, useEffect } from 'react';

const ProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    team: '',
    image_url: ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        team: product.team || '',
        image_url: product.image_url || ''
      });
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, price: parseFloat(formData.price) });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{product ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Tên áo"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Đội bóng"
          value={formData.team}
          onChange={(e) => setFormData({...formData, team: e.target.value})}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Giá (VND)"
          value={formData.price}
          onChange={(e) => setFormData({...formData, price: e.target.value})}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Link hình ảnh"
          value={formData.image_url}
          onChange={(e) => setFormData({...formData, image_url: e.target.value})}
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Mô tả"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          className="border p-2 rounded md:col-span-2"
          rows="3"
        />
      </div>
      <div className="mt-6 flex gap-4">
        <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
          Lưu
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600">
          Hủy
        </button>
      </div>
    </form>
  );
};

export default ProductForm;