import axios from 'axios';
import { API_BASE_URL } from '../config';

// Criação da instância do axios com configurações base
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação, se necessário
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Interceptor para tratamento global de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Tratamento global de erros (ex: redirecionar para login se 401)
    if (error.response && error.response.status === 401) {
      // Lógica para token expirado/inválido
      localStorage.removeItem('token');
      // Redirecionar para página de login, se necessário
    }
    return Promise.reject(error);
  },
);
