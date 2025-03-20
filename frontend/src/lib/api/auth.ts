import api from '../api';

export const authApi = {
  signin: (data: { email: string; password: string }) => 
    api.post('/auth/login', data),
  signup: (data: { email: string; password: string; name: string }) => 
    api.post('/auth/register', data),
  verifyToken: () => api.get('/auth/verify'),
};
