import { api } from '../api';

export const adminApi = {
  getUsers: () => api.get('/admin/users'),
  deleteUser: (userId: string) => api.delete(`/admin/users/${userId}`),
};
