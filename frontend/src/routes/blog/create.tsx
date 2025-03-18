import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { blogSchema } from '@/common/validations/blog.schema';
import { blogApi } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ProtectedRoute } from '@/components/protected-route';
import { z } from 'zod';

export default function CreatePostPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(blogSchema.create)
  });

  const onSubmit = async (data: z.infer<typeof blogSchema.create>) => {
    try {
      const response = await blogApi.createPost(data);
      navigate({ to: '/post/$postId', params: { postId: response.data.id } });
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Create New Post</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Input
                  placeholder="Title"
                  {...register('title')}
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title.message as string}</p>
                )}
              </div>
              <div>
                <Textarea
                  placeholder="Content"
                  className="min-h-[200px]"
                  {...register('content')}
                />
                {errors.content && (
                  <p className="text-sm text-red-500">{errors.content.message as string}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button type="submit">
                  Publish
                </Button>
                <Button type="button" className="bg-transparent hover:bg-transparent text-foreground border border-input" onClick={() => navigate({ to: '/' })}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
} 