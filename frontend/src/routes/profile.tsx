import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { userApi } from '@/lib/api';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { ProtectedRoute } from '@/components/protected-route';
import { Post } from '@/types/post';

export default function ProfilePage() {
  const { user } = useAuth();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await userApi.getProfile();
      return response.data;
    },
  });

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Your personal information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Name:</strong> {user?.name}</p>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Role:</strong> {user?.role}</p>
            </div>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-2xl font-bold mb-4">Your Posts</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {profile?.posts.map((post: Post) => (
              <Link key={post.id} to="/post/$postId" params={{ postId: post.id }}>
                <Card className="h-full hover:bg-muted/50 transition-colors">
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription>
                      {new Date(post.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-2">{post.content}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Status: {post.published ? 'Published' : 'Draft'}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 