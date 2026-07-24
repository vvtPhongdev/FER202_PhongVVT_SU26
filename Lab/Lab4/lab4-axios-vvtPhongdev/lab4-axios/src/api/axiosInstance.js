import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:3001',  // json-server with explicit IPv4 to avoid localhost IPv6 resolution conflicts
  timeout: 8000,                     // hủy sau 8 giây
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor: tự gắn token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor: xử lý lỗi tập trung
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;
