import React, { useState, useEffect } from 'react';
import ProductCard from './components/ProductCard';
import ProductForm from './components/ProductForm';
import OrderForm from './components/OrderForm';
import OrderList from './components/OrderList';
import Login from './components/Login';
import CustomerAuth from './components/CustomerAuth';
import Cart from './components/Cart';
import { 
  getProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct, 
  createOrder,
  getOrders,
  deleteOrder,
  confirmOrder
} from './services/api';

function App() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderingItems, setOrderingItems] = useState([]);
  const [showOrders, setShowOrders] = useState(false);
  const [showMyOrders, setShowMyOrders] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUser, setCurrentUser] = useState(null); // Admin
  const [showLogin, setShowLogin] = useState(false);
  const [customerUser, setCustomerUser] = useState(null); // Khách
  const [showCustomerAuth, setShowCustomerAuth] = useState(false);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

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

  // Load giỏ hàng
  useEffect(() => {
    if (customerUser) {
      const savedCart = localStorage.getItem(`cart_${customerUser.username}`);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } else {
      setCart([]);
    }
  }, [customerUser]);

  // Lưu giỏ hàng
  useEffect(() => {
    if (customerUser && cart.length > 0) {
      localStorage.setItem(`cart_${customerUser.username}`, JSON.stringify(cart));
    }
  }, [cart, customerUser]);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.team && product.team.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const myOrders = orders.filter(order => customerUser);

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
    setShowMyOrders(false);
  };

  const requireCustomerLogin = () => {
    if (!customerUser) {
      setShowCustomerAuth(true);
      return false;
    }
    return true;
  };

  const addToCart = (product) => {
    if (!requireCustomerLogin()) return;

    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    alert('Đã thêm vào giỏ hàng!');
  };

  const handleOrder = (product) => {
    if (!requireCustomerLogin()) return;

    setOrderingItems([{ product, quantity: 1 }]);
    setShowOrderForm(true);
  };

  const updateCartQuantity = (id, quantity) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(item => item.id !== id));
    } else {
      setCart(prev => prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handlePlaceOrderFromCart = () => {
    if (cart.length === 0) {
      alert('Giỏ hàng trống!');
      return;
    }

    if (!requireCustomerLogin()) return;

    setOrderingItems(cart.map(item => ({ product: item, quantity: item.quantity })));
    setShowOrderForm(true);
    setShowCart(false);
  };

    const handleOrderSave = async (data) => {
    try {
      for (const item of orderingItems) {
        const orderData = {
          product_id: item.product.id,
          customer_name: data.customer_name, // ← Họ tên thật từ form (ví dụ "Trần Quang Huy")
          customer_phone: data.customer_phone,
          customer_address: data.customer_address,
          quantity: item.quantity,
          total_price: item.product.price * item.quantity
        };
        await createOrder(orderData);
      }

      alert('🎉 Đặt hàng thành công!');
      setShowOrderForm(false);
      setOrderingItems([]);
      setCart([]);
      if (customerUser) {
        localStorage.removeItem(`cart_${customerUser.username}`);
      }
      loadOrders();
    } catch (err) {
      alert('❌ Có lỗi khi đặt hàng. Vui lòng thử lại!');
      console.error(err);
    }
  };

  const handleDeleteOrder = async (id) => {
    const order = orders.find(o => o.id === id);
    const isOwner = customerUser && order.customer_name.toLowerCase().includes(customerUser.username.toLowerCase());
    const isAdmin = currentUser?.role === 'admin';

    if (isAdmin || (isOwner && order.status !== 'Đã xác nhận')) {
      const message = isAdmin ? 'Xóa đơn hàng này?' : 'Hủy đơn hàng này?';
      if (window.confirm(message)) {
        try {
          await deleteOrder(id);
          alert(isAdmin ? 'Xóa đơn hàng thành công!' : 'Hủy đơn hàng thành công!');
          loadOrders();
        } catch (err) {
          alert('Lỗi khi xử lý đơn hàng');
        }
      }
    } else {
      alert('Bạn không thể hủy đơn hàng đã được xác nhận!');
    }
  };

  const handleConfirmOrder = async (id) => {
    if (window.confirm('Xác nhận đơn hàng này? Sau khi xác nhận, khách không thể hủy.')) {
      try {
        await confirmOrder(id);
        alert('Đã xác nhận đơn hàng thành công!');
        loadOrders();
      } catch (err) {
        alert('Lỗi khi xác nhận đơn hàng');
        console.error(err);
      }
    }
  };

  const handleAdminLogin = (user) => {
    setCurrentUser(user);
    setShowLogin(false);
  };

  const handleAdminLogout = () => {
    setCurrentUser(null);
    setShowOrders(false);
    setShowForm(false);
    setShowMyOrders(false);
  };

  const handleCustomerLogin = (user) => {
    setCustomerUser(user);
    setShowCustomerAuth(false);
  };

  const handleCustomerLogout = () => {
    setCustomerUser(null);
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header 
        className="relative bg-cover bg-center bg-no-repeat py-24 md:py-32 shadow-2xl overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url('https://thumbs.dreamstime.com/b/nighttime-soccer-match-ball-hitting-goal-net-vibrant-football-stadium-scene-dynamic-sports-themed-nighttime-358371739.jpg')`
        }}
      >
        <div className="container mx-auto px-4 text-center">
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

      <main className="container mx-auto px-4 py-10">
        {/* Tiêu đề + Tìm kiếm + Auth + Nút */}
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
          <h2 className="text-3xl font-semibold text-gray-800">
            {showOrders ? 'Quản lý đơn hàng' : showMyOrders ? 'Đơn hàng của tôi' : 'Danh sách sản phẩm'}
          </h2>

          <div className="flex items-center gap-4">
            {/* Ô tìm kiếm */}
            {!showOrders && !showForm && !showOrderForm && !showMyOrders && (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm áo hoặc đội bóng..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-6 py-3 w-96 border border-gray-300 rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition text-lg"
                />
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-2xl">
                  🔍
                </span>
              </div>
            )}

            {/* Auth + Nút */}
            <div className="flex items-center gap-4">
              {customerUser && (
                <>
                  <span className="text-lg font-medium text-gray-700">
                    Xin chào, <strong>{customerUser.username}</strong>
                  </span>
                  <button
                    onClick={handleCustomerLogout}
                    className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition text-lg font-semibold"
                  >
                    Đăng xuất khách
                  </button>
                  <button
                    onClick={() => setShowCart(true)}
                    className="relative bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition text-lg font-semibold"
                  >
                    Giỏ hàng 🛒
                    {cart.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                        {cart.length}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => { setShowMyOrders(true); loadOrders(); setShowCart(false); }}
                    className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition text-lg font-semibold"
                  >
                    Đơn hàng của tôi
                  </button>
                </>
              )}

              {currentUser?.role === 'admin' && (
                <>
                  <span className="text-lg font-medium text-gray-700">
                    Xin chào, <strong>Admin</strong>
                  </span>
                  <button
                    onClick={handleAdminLogout}
                    className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition text-lg font-semibold"
                  >
                    Đăng xuất Admin
                  </button>
                </>
              )}

              {!currentUser && !customerUser && (
                <>
                  <button
                    onClick={() => setShowCustomerAuth(true)}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition text-lg font-semibold"
                  >
                    Đăng nhập / Đăng ký khách
                  </button>
                  <button
                    onClick={() => setShowLogin(true)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition text-lg font-semibold"
                  >
                    Đăng nhập Admin
                  </button>
                </>
              )}

              {currentUser?.role === 'admin' && (
                <>
                  <button
                    onClick={() => { setShowForm(true); setEditingProduct(null); setShowOrders(false); setShowMyOrders(false); }}
                    className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition text-lg font-semibold shadow-md"
                  >
                    + Thêm sản phẩm mới
                  </button>
                  <button
                    onClick={() => { setShowOrders(true); loadOrders(); setShowForm(false); setShowMyOrders(false); }}
                    className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition text-lg font-semibold shadow-md"
                  >
                    📋 Quản lý đơn hàng
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Modal Login Admin */}
        {showLogin && <Login onLogin={handleAdminLogin} />}

        {/* Modal Auth Khách */}
        {showCustomerAuth && (
          <CustomerAuth 
            onClose={() => setShowCustomerAuth(false)}
            onLogin={handleCustomerLogin}
          />
        )}

        {/* Giỏ hàng */}
        {showCart && (
          <Cart 
            cart={cart}
            onUpdateQuantity={updateCartQuantity}
            onRemoveItem={removeFromCart}
            onPlaceOrder={handlePlaceOrderFromCart}
            onClose={() => setShowCart(false)}
          />
        )}

        {/* Form thêm/sửa sản phẩm */}
        {showForm && (
          <ProductForm
            product={editingProduct}
            onSave={handleSave}
            onCancel={() => { setShowForm(false); setEditingProduct(null); }}
          />
        )}

        {/* Form đặt hàng */}
        {showOrderForm && (
          <OrderForm
            orderingItems={orderingItems}
            onSave={handleOrderSave}
            onCancel={() => { setShowOrderForm(false); setOrderingItems([]); }}
          />
        )}

        {/* Quản lý đơn hàng (admin) */}
        {showOrders && (
          <OrderList 
            orders={orders} 
            onDeleteOrder={handleDeleteOrder}
            onConfirmOrder={handleConfirmOrder}
            currentUser={currentUser}
          />
        )}

        {/* Đơn hàng của khách */}
        {showMyOrders && customerUser && (
          <div className="mt-10">
            <h2 className="text-3xl font-bold text-center mb-6 text-teal-600">
              Đơn hàng của {customerUser.username}
            </h2>
            {myOrders.length === 0 ? (
              <p className="text-center text-gray-600 text-xl py-10">Bạn chưa có đơn hàng nào.</p>
            ) : (
              <OrderList 
                orders={myOrders} 
                onDeleteOrder={handleDeleteOrder}
                onConfirmOrder={handleConfirmOrder}
                currentUser={currentUser}
                customerUser={customerUser}
              />
            )}
            <div className="text-center mt-6">
              <button 
                onClick={() => setShowMyOrders(false)}
                className="bg-gray-500 text-white px-8 py-3 rounded-lg hover:bg-gray-600 transition text-lg"
              >
                Quay lại mua sắm
              </button>
            </div>
          </div>
        )}

        {/* Danh sách sản phẩm */}
        {!showOrders && !showForm && !showOrderForm && !showMyOrders && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onAddToCart={addToCart}
                onOrder={handleOrder}
                currentUser={currentUser}
              />
            ))}
          </div>
        )}

        {/* Thông báo */}
        {filteredProducts.length === 0 && !showForm && !showOrderForm && !showOrders && !showMyOrders && searchTerm && (
          <p className="text-center text-gray-500 text-xl mt-20">
            Không tìm thấy sản phẩm nào phù hợp với "<strong>{searchTerm}</strong>"
          </p>
        )}

        {products.length === 0 && !showForm && !showOrderForm && !showOrders && !showMyOrders && !searchTerm && (
          <p className="text-center text-gray-500 text-xl mt-20">Chưa có sản phẩm nào. Hãy thêm sản phẩm đầu tiên!</p>
        )}
      </main>
    </div>
  );
}

export default App;