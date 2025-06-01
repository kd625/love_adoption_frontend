import axios from 'axios';

// 创建 Axios 实例，设置基础 URL
export const http = axios.create({
  baseURL: 'http://localhost:8080/api', // 假设后端 API 的基础路径
  timeout: 5000
});

http.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export function register(data) {
  return http.post('/user/register', data);
}

export function login(data) {
  return http.post('/user/login', data);
}

export function getUserInfo() {
  return http.get('/user/me');
}

export function updateUserInfo(data) {
  return http.put('/user/me', data);
}

export function getAllUsers() {
  return http.get('/admin/users');
}

export function deleteUser(userId) {
  return http.delete(`/admin/users/${userId}`);
}
