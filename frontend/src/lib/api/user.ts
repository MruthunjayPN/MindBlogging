import { api } from '../api';
import type { ProfileResponse, User } from '@/types/api';

interface UpdateProfileInput {
  name?: string;
  password?: string;
}

export const userApi = {
  getProfile: () => 
    api.get<ProfileResponse>('/user/profilePosts'),
    
  updateProfile: (data: UpdateProfileInput) => 
    api.put<User>('/user/profile', data),
};
