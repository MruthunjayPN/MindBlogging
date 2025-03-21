import { api } from '../api';

export const userApi = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data: { name: string; password?: string }) => 
    api.put('/user/profile', data),
};
