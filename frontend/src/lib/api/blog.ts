import api from '../api';

export const blogApi = {
  createPost: (data: { title: string; content: string; published: boolean }) => 
    api.post('/blog/posts', data),
  deletePost: (postId: string) => api.delete(`/blog/posts/${postId}`),
  getPosts: () => api.get('/blog/posts'),
  getPost: (postId: string) => api.get(`/blog/posts/${postId}`),
  updatePost: (postId: string, data: { title: string; content: string }) => 
    api.put(`/blog/posts/${postId}`, data),
};
