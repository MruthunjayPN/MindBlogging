import express, { Response } from 'express';
import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { userAuthSchema } from '../../../common/validations/auth.schema';
import { authenticate, AuthRequest } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/signup', async (req, res: Response) => {
  try {
    const validatedData = userAuthSchema.signup.parse(req.body);
    const { email, password, name } = validatedData;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
      }
    });

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' }
    );

    return res.json({ token, user });
  } catch (error) {
    if (error.errors) {
      return res.status(400).json({ errors: error.errors });
    }
    return res.status(400).json({ message: error.message || 'Invalid input' });
  }
});

router.post('/signin', async (req, res) => {
  try {
    const validatedData = userAuthSchema.signin.parse(req.body);
    const { email, password } = validatedData;

    const user = await prisma.user.findUnique({ 
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        password: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const { password: _, ...userWithoutPassword } = user;
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' }
    );

    return res.json({ token, user: userWithoutPassword });
  } catch (error) {
    if (error.errors) {
      return res.status(400).json({ errors: error.errors });
    }
    return res.status(400).json({ message: error.message || 'Invalid input' });
  }
});

router.get('/verify', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    res.json({ user: req.user });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying token' });
  }
});

export default router; 
