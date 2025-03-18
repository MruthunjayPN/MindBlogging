import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from '@tanstack/react-router';
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

export default function EditPostPage() {
  const { postId } = useParams({ from: '/post/$postId' });
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(blogSchema.update)
  });

  const { data: post, isLoading } = useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      const response = await blogApi.getPost(postId);
      reset(response.data);
      return response.data;
    },
  });

  const onSubmit = async (data: z.infer<typeof blogSchema.update>) => {
    try {
      await blogApi.updatePost(postId, data);
      navigate({ to: '/post/$postId', params: { postId } });
    } catch (error) {
      console.error('Failed to update post:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Edit Post</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Input
                  placeholder="Title"
                  defaultValue={post?.title}
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
                  defaultValue={post?.content}
                  {...register('content')}
                />
                {errors.content && (
                  <p className="text-sm text-red-500">{errors.content.message as string}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button type="submit">
                  Update
                </Button>
                <Button 
                  type="button" 
                  onClick={() => navigate({ to: '/post/$postId', params: { postId } })}
                >
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