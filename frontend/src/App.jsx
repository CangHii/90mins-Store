import React, { useState, useEffect } from 'react';
import ProductCard from './components/ProductCard';
import ProductForm from './components/ProductForm';
import OrderForm from './components/OrderForm';
import OrderList from './components/OrderList';
import Sidebar from './components/Sidebar';

import { 
  getProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct, 
  createOrder,
  getOrders,
  deleteOrder 
} from './services/api';

function App() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderingProduct, setOrderingProduct] = useState(null);
  const [showOrders, setShowOrders] = useState(false);

  const loadProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      console.error("Lỗi load sản phẩm:", err);
      alert("Không kết nối được backend. Kiểm tra backend có chạy không!");
    }
  };

  const loadOrders = async () => {
    try {
      const res = await getOrders();
      setOrders(res.data);
    } catch (err) {
      console.error("Lỗi load đơn hàng:", err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSave = async (data) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, data);
      } else {
        await createProduct(data);
      }
      loadProducts();
      setShowForm(false);
      setEditingProduct(null);
    } catch (err) {
      alert('Lỗi khi lưu sản phẩm');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn chắc chắn muốn xóa sản phẩm này?')) {
      await deleteProduct(id);
      loadProducts();
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
    setShowOrders(false);
  };

  const handleOrder = (product) => {
    setOrderingProduct(product);
    setShowOrderForm(true);
    setShowOrders(false);
  };

  const handleOrderSave = async (data) => {
    try {
      await createOrder(data);
      alert('🎉 Đặt hàng thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.');
      setShowOrderForm(false);
      setOrderingProduct(null);
    } catch (err) {
      alert('❌ Có lỗi khi đặt hàng. Vui lòng thử lại!');
      console.error(err);
    }
  };

  const handleDeleteOrder = async (id) => {
    if (window.confirm('Bạn chắc chắn muốn xóa đơn hàng này? Hành động không thể hoàn tác!')) {
      try {
        await deleteOrder(id);
        alert('Xóa đơn hàng thành công!');
        loadOrders();
      } catch (err) {
        alert('Lỗi khi xóa đơn hàng');
        console.error(err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header đẹp với nền bóng đá */}
      <header 
        className="relative bg-cover bg-center bg-no-repeat py-24 md:py-32 shadow-2xl overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url('https://thumbs.dreamstime.com/b/nighttime-soccer-match-ball-hitting-goal-net-vibrant-football-stadium-scene-dynamic-sports-themed-nighttime-358371739.jpg')`
        }}
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-2xl flex items-center justify-center gap-4 mb-4">
            ⚽ Shop Áo Đá Bóng Chính Hãng
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8">
            Quản lý sản phẩm & Đặt hàng online
          </p>
          <p className="text-6xl md:text-8xl font-black text-white tracking-wider drop-shadow-3xl" 
             style={{ fontFamily: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif', textShadow: '4px 4px 8px rgba(0,0,0,0.8)' }}>
            90mins Store
          </p>
        </div>
      </header>

      {/* Layout chính: Sidebar + Nội dung */}
      <div className="flex">
        {/* Sidebar cố định bên trái */}
        <Sidebar 
          setShowForm={setShowForm}
          setShowOrders={setShowOrders}
          setShowOrderForm={setShowOrderForm}
        />

        {/* Nội dung chính – dịch sang phải */}
        <main className="flex-1 ml-64 min-h-screen bg-gray-50">
          <div className="container mx-auto px-6 py-10">
            <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
              {showOrders ? 'Quản lý đơn hàng' : showForm ? 'Thêm / Sửa sản phẩm' : '90mins Store - Cửa hàng chính'}
            </h2>

            {/* Form thêm/sửa sản phẩm */}
            {showForm && (
              <ProductForm
                product={editingProduct}
                onSave={handleSave}
                onCancel={() => { setShowForm(false); setEditingProduct(null); }}
              />
            )}

            {/* Form đặt hàng khách */}
            {showOrderForm && (
              <OrderForm
                product={orderingProduct}
                onSave={handleOrderSave}
                onCancel={() => { setShowOrderForm(false); setOrderingProduct(null); }}
              />
            )}

            {/* Bảng quản lý đơn hàng */}
            {showOrders && (
              <OrderList 
                orders={orders} 
                onDeleteOrder={handleDeleteOrder}
              />
            )}

            {/* Danh sách sản phẩm (chỉ hiện khi không ở trang khác) */}
            {!showOrders && !showForm && !showOrderForm && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onOrder={handleOrder}
                  />
                ))}
              </div>
            )}

            {/* Thông báo khi chưa có sản phẩm */}
            {products.length === 0 && !showForm && !showOrderForm && !showOrders && (
              <p className="text-center text-gray-500 text-2xl mt-20">Chưa có sản phẩm nào. Hãy thêm sản phẩm đầu tiên!</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;