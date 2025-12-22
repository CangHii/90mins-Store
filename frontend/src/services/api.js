import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';

export const getProducts = () => axios.get(API_URL);
export const getProduct = (id) => axios.get(`${API_URL}/${id}`);
export const createProduct = (data) => axios.post(API_URL, data);
export const updateProduct = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteProduct = (id) => axios.delete(`${API_URL}/${id}`);
// Tạo đơn hàng mới
export const createOrder = (data) => axios.post(`${API_URL.replace('/products', '/orders')}`, data);
// Lấy tất cả đơn hàng
export const getOrders = () => axios.get('http://localhost:5000/api/orders');
// Xóa đơn hàng
export const deleteOrder = (id) => axios.delete(`http://localhost:5000/api/orders/${id}`);
// Xác nhận đơn hàng
export const confirmOrder = (id) => axios.put(`http://localhost:5000/api/orders/${id}/confirm`);