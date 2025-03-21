import axios from 'axios';
import type { AuthResponse, User } from '@/types/api';

const baseURL = import.meta.env.PROD 
  ? 'https://mind-blogging-api.vercel.app/api'
  : 'http://localhost:3000/api';

export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Request interceptor for adding auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  signup: (data: { email: string; password: string; name: string }) =>
    api.post<AuthResponse>('/auth/signup', data),
  
  signin: (data: { email: string; password: string }) =>
    api.post<AuthResponse>('/auth/signin', data),
  
  verifyToken: () => 
    api.get<{ user: User }>('/auth/verify'),
  
  logout: () => 
    api.post('/auth/logout'),
}; 
