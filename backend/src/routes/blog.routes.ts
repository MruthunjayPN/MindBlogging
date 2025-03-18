import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate } from '../middleware/auth.middleware';
import { blogSchema } from '../../../common/validations/blog.schema';
import { handleZodError } from '../utils/error-handler';

const router = express.Router();
const prisma = new PrismaClient();

// Create post
router.post('/posts', authenticate, async (req, res) => {
  try {
    const validatedData = blogSchema.create.parse(req.body);
    const post = await prisma.post.create({
      data: {
        ...validatedData,
        authorId: req.user!.id
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
    res.status(201).json(post);
  } catch (error) {
    handleZodError(error, res);
  }
});

// Get all posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true
      },
      include: {
        author: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

// Get single post
router.get('/posts/:id', async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: req.params.id
      },
      include: {
        author: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post' });
  }
});

// Update post
router.put('/posts/:id', authenticate, async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: req.params.id }
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.authorId !== req.user!.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const validatedData = blogSchema.update.parse(req.body);
    const updatedPost = await prisma.post.update({
      where: { id: req.params.id },
      data: validatedData,
      include: {
        author: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    res.json(updatedPost);
  } catch (error) {
    handleZodError(error, res);
  }
});

// Delete post
router.delete('/posts/:id', authenticate, async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: req.params.id }
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.authorId !== req.user!.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await prisma.post.delete({
      where: { id: req.params.id }
    });

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post' });
  }
});

export default router; 