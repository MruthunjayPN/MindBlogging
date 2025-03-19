import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';
import type { User, Role } from '@prisma/client';

// Define the decoded JWT token type
interface JwtPayload {
  userId: string;
  role: Role;
}

// Define custom user type for the request
interface RequestUser {
  id: string;
  email: string;
  name: string;
  role: Role;
}

export interface AuthRequest extends Omit<Request, 'user'> {
  user?: RequestUser;
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as JwtPayload;
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (req.user?.role !== 'ADMIN') {
    res.status(403).json({ message: 'Admin access required' });
    return;
  }
  next();
}; 
