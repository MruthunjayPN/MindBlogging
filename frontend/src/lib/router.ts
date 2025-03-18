import { Router, RootRoute, Route } from '@tanstack/react-router';
import Root from '../routes/root';
import IndexRoute from '../routes/index';
import LoginPage from '../routes/auth/login';
import RegisterPage from '../routes/auth/register';
import BlogPostPage from '../routes/blog/post';
import CreatePostPage from '../routes/blog/create';
import EditPostPage from '../routes/blog/edit';
import ProfilePage from '../routes/profile';
import AdminPage from '../routes/admin';

const rootRoute = new RootRoute({
  component: Root,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: IndexRoute
});

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
});

const registerRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: RegisterPage,
});

const postRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/post/$postId',
  component: BlogPostPage,
});

const createPostRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/post/create',
  component: CreatePostPage,
});

const editPostRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/post/edit/$postId',
  component: EditPostPage,
});

const profileRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: ProfilePage,
});

const adminRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  postRoute,
  createPostRoute,
  editPostRoute,
  profileRoute,
  adminRoute,
]);

export const router = new Router({
  routeTree,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
} 