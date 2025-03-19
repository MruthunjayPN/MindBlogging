import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate } from '../middleware/auth.middleware';
import { handleZodError } from '../utils/error-handler';

const router = express.Router();
const prisma = new PrismaClient();

// Get user profile with their posts
router.get('/profilePosts', authenticate, async (req, res) => {
  if (!req.user?.id) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const userWithPosts = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        posts: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    if (!userWithPosts) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(userWithPosts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

// Update user profile
router.put('/profile', authenticate, async (req, res) => {
  try {
    const { name } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: req.user!.id },
      data: { name },
      select: {
        id: true,
        email: true,
        name: true,
        role: true
      }
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile' });
  }
});

// Delete user account
router.delete('/', authenticate, async (req, res) => {
  try {
    await prisma.post.deleteMany({
      where: { authorId: req.user!.id }
    });

    await prisma.user.delete({
      where: { id: req.user!.id }
    });

    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting account' });
  }
});

export default router; 
