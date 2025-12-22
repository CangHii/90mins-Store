import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

        // Tài khoản admin mới (bạn tự đổi thoải mái)
    if (username === '90mins' && password === 'store2025') {
      onLogin({ username: '90mins', role: 'admin' });
    } else {
      setError('Tên đăng nhập hoặc mật khẩu sai!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Đăng nhập Admin</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Tên đăng nhập (admin)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Mật khẩu (123456)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Đăng nhập
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Gợi ý: admin / 123456
        </p>
      </div>
    </div>
  );
};

export default Login;
