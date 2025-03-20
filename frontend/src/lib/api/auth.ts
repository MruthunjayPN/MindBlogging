import api from '../api';

export const authApi = {
  signin: (data: { email: string; password: string }) => 
    api.post('/auth/signin', data),
  signup: (data: { email: string; password: string; name: string }) => 
    api.post('/auth/signup', data),
  verifyToken: () => api.get('/auth/verify'),
};