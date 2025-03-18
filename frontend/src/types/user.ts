export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  _count: {
    posts: number;
  };
}