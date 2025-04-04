export interface User {
  id: string;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
  _count?: {
    posts: number;
  };
}

export interface Post {
  id: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  author: {
    id: string;
    name: string;
  };
}

export interface ProfileResponse {
  user: User;
  posts: Post[];
}

export interface AuthResponse {
  user: User;
  token: string;
}
