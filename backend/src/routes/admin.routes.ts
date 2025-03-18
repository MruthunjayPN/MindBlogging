import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, isAdmin } from '../middleware/auth.middleware';
import { handleZodError } from '../utils/error-handler';

const router = express.Router();
const prisma = new PrismaClient();

// Get all users (Admin Only)
router.get('/users', authenticate, isAdmin, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        _count: {
          select: {
            posts: true
          }
        }
      }
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Delete user (Admin Only)
router.delete('/users/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Don't allow admin to delete themselves
    if (id === user?.id) {
      return res.status(400).json({ message: 'Cannot delete your own admin account' });
    }

    // Delete all posts by the user first
    await prisma.post.deleteMany({
      where: { authorId: id }
    });

    // Delete the user
    await prisma.user.delete({
      where: { id }
    });

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

export default router; 