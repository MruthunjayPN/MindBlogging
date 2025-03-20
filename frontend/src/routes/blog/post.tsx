import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams, useNavigate } from '@tanstack/react-router';
import { useAuth } from '@/contexts/auth-context';
import { blogApi } from '@/lib/api/blog';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { useToast } from '@/hooks/use-toast';


export default function BlogPostPage() {
  const { postId } = useParams({ from: '/post/$postId' });
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      const response = await blogApi.getPost(postId);
      return response.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const response = await blogApi.deletePost(postId);
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Post deleted successfully",
      });
      navigate({ to: '/' });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete post",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">Failed to load post</p>
        <Button 
          variant="outline" 
          onClick={() => navigate({ to: '/' })}
          className="mt-4"
        >
          Go back home
        </Button>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">{post.title}</CardTitle>
        <CardDescription>
          By {post.author.name} • {new Date(post.createdAt).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="prose max-w-none">
          {post.content}
        </div>
      </CardContent>
      {user?.id === post.author.id && (
        <CardFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => navigate({ to: '/post/edit/$postId', params: { postId } })}
          >
            Edit
          </Button>
          <Button 
            variant="destructive" 
            onClick={() => deleteMutation.mutate()}
          >
            Delete
          </Button>
        </CardFooter>
      )}
    </Card>
  );
} 
