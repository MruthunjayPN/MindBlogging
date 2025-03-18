import { z } from 'zod';

export const blogSchema = {
  create: z.object({
    title: z.string().min(1, 'Title is required').max(100),
    content: z.string().min(1, 'Content is required'),
    published: z.boolean().default(true),
  }),
  update: z.object({
    title: z.string().min(1, 'Title is required').max(100),
    content: z.string().min(1, 'Content is required'),
    published: z.boolean().optional(),
  }),
};

export type CreateBlogInput = z.infer<typeof blogSchema.create>;
export type UpdateBlogInput = z.infer<typeof blogSchema.update>; 