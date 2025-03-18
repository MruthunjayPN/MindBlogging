import axios from 'axios';
import type { AuthResponse, User, Post, ProfileResponse } from '@/types/api';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
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

export const blogApi = {
  getPosts: () => 
    api.get<Post[]>('/blog/posts'),
  
  getPost: (id: string) => 
    api.get<Post>(`/blog/posts/${id}`),
  
  createPost: (data: { title: string; content: string; published: boolean }) =>
    api.post<Post>('/blog/posts', data),
  
  updatePost: (id: string, data: { title?: string; content?: string; published?: boolean }) =>
    api.put<Post>(`/blog/posts/${id}`, data),
  
  deletePost: (id: string) => 
    api.delete(`/blog/posts/${id}`),
};

export const userApi = {
  getProfile: () => 
    api.get<ProfileResponse>('/user/profilePosts'),
  
  updateProfile: (data: { name: string }) => 
    api.put<User>('/user/profile', data),
};

export const adminApi = {
  getUsers: () => 
    api.get<User[]>('/admin/users'),
  
  deleteUser: (id: string) => 
    api.delete(`/admin/users/${id}`),
};

export default api; 