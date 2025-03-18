import { ZodError } from 'zod';
import { Response } from 'express';

export function handleZodError(error: unknown, res: Response) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: 'Validation error',
      errors: error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }))
    });
  }
  
  return res.status(500).json({ message: 'Internal server error' });
} 