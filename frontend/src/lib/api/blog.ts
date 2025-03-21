import { api } from '../api';
import type { Post } from '@/types/api';

export const blogApi = {
  createPost: (data: { title: string; content: string; published: boolean }) => 
    api.post<Post>('/blog/posts', data),
  deletePost: (postId: string) => 
    api.delete(`/blog/posts/${postId}`),
  getPosts: () => 
    api.get<Post[]>('/blog/posts'),
  getPost: (postId: string) => 
    api.get<Post>(`/blog/posts/${postId}`),
  updatePost: (postId: string, data: { title: string; content: string }) => 
    api.put<Post>(`/blog/posts/${postId}`, data),
};
