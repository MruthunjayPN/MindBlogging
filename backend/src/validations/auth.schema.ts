import { z } from 'zod';

export const userAuthSchema = {
  signup: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
  signin: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
};

export type SignupInput = z.infer<typeof userAuthSchema.signup>;
export type SigninInput = z.infer<typeof userAuthSchema.signin>;