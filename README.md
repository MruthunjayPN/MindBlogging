# MindBlogging - Modern Blogging Platform

![MindBlogging Logo](frontend/public/brain.svg)

A minimalist blogging platform built for modern writers.

## 🚀 Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Routing**: TanStack Router
- **State Management**: TanStack Query
- **Styling**: 
  - Tailwind CSS
  - Radix UI
  - Shadcn/ui components
- **Build Tool**: Vite
- **Animation**: Framer Motion
- **Form Handling**: React Hook Form + Zod

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT
- **Validation**: Zod

### DevOps & Deployment
- **CI/CD**: GitHub Actions
- **Hosting**: Vercel (Frontend & Backend)
- **Containerization**: Docker
- **Database Hosting**: Vercel Postgres

## ✨ Features
### For Readers
- Clean, minimalist reading experience
- Fast loading times
- Mobile-responsive design
- Search functionality

### Technical Features
- JWT-based authentication
- Role-based access control (User/Admin)
- CORS protection
- Database migrations
- TypeScript type safety


## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/verify` - Verify JWT token

### Blog Endpoints
- `GET /api/blog/posts` - Get all posts
- `GET /api/blog/posts/:id` - Get single post
- `POST /api/blog/posts` - Create new post
- `PUT /api/blog/posts/:id` - Update post
- `DELETE /api/blog/posts/:id` - Delete post