import React, { useState } from 'react';

const CustomerAuth = ({ onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      // Đăng nhập
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        onLogin({ username: user.username, email: user.email, role: 'customer' });
        onClose();
      } else {
        setError('Tên đăng nhập hoặc mật khẩu sai!');
      }
    } else {
      // Đăng ký
      if (!username || !password || !email) {
        setError('Vui lòng điền đầy đủ thông tin');
        return;
      }

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.find(u => u.username === username)) {
        setError('Tên đăng nhập đã tồn tại!');
        return;
      }

      const newUser = { username, password, email };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      onLogin({ username, email, role: 'customer' });
      onClose();
      alert('Đăng ký thành công! Bạn đã được đăng nhập tự động.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-96 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl">
          ×
        </button>
        <h2 className="text-3xl font-bold text-center mb-6 text-orange-600">
          {isLogin ? 'Đăng nhập khách hàng' : 'Đăng ký tài khoản mới'}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Tên đăng nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          {!isLogin && (
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          )}
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          {error && <p className="text-red-500 text-center font-medium mb-4">{error}</p>}
          <button type="submit" className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition font-bold text-lg">
            {isLogin ? 'Đăng nhập' : 'Đăng ký'}
          </button>
        </form>
        <p className="text-center mt-6 text-gray-600">
          {isLogin ? 'Chưa có tài khoản? ' : 'Đã có tài khoản? '}
          <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-orange-600 underline font-medium">
            {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default CustomerAuth;