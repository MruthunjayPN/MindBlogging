import { useState, useEffect } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { blogApi } from '@/lib/api/blog';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ProtectedRoute } from '@/components/protected-route';
import { useToast } from '@/hooks/use-toast';
import { Spinner } from '@/components/ui/spinner';
// Remove unused import: blogSchema

type FormData = {
  title: string;
  content: string;
};

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

export default function EditPostPage() {
  const { postId } = useParams({ from: '/post/edit/$postId' });
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  useEffect(() => {
    const loadPost = async () => {
      try {
        const response = await blogApi.getPost(postId);
        form.reset({
          title: response.data.title,
          content: response.data.content,
        });
      } catch (error) {
        console.error('Error loading post:', error);
        toast({
          title: "Error",
          description: "Failed to load post",
          variant: "destructive",
        });
        navigate({ to: '/' });
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [postId, form, navigate, toast]);

  async function onSubmit(data: FormData) {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await blogApi.updatePost(postId, {
        title: data.title,
        content: data.content,
      });

      // Invalidate both profile and posts queries
      await queryClient.invalidateQueries({ queryKey: ['profile'] });
      await queryClient.invalidateQueries({ queryKey: ['posts'] });

      toast({
        title: "Success",
        description: "Post updated successfully",
      });

      navigate({ to: '/profile' });
    } catch (error) {
      console.error('Error updating post:', error);
      toast({
        title: "Error",
        description: "Failed to update post",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="max-w-3xl mx-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle>Edit Post</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }: { field: ControllerRenderProps<FormData, "title"> }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter post title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }: { field: ControllerRenderProps<FormData, "content"> }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Write your post content here" 
                          className="min-h-[300px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2">
                  <Button 
                    type="submit" 
                    className="bg-eblack dark:bg-flashwhite text-flashwhite dark:text-eblack"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      navigate({ to: '/profile' }); // Changed navigation to profile page
                      toast({
                        description: "Edit cancelled",
                      });
                    }}
                    className="bg-eblack dark:bg-flashwhite text-flashwhite dark:text-eblack"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
} 
