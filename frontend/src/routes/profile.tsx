import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { userApi } from '@/lib/api';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { ProtectedRoute } from '@/components/protected-route';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Post } from '@/types/post';
import { motion } from 'framer-motion';

const ProfileSkeleton = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-8 w-[200px]" />
      <Skeleton className="h-4 w-[300px]" />
    </CardHeader>
    <CardContent className="space-y-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </CardContent>
  </Card>
);

const PostsSkeleton = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((index) => (
      <Card key={index}>
        <CardHeader>
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    ))}
  </div>
);

export default function ProfilePage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(user?.name || '');
  const [newPassword, setNewPassword] = useState('');

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await userApi.getProfile();
      return response.data;
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (data: { name: string }) => {
      return await userApi.updateProfile(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      setIsEditing(false);
    },
  });

  const handleUpdateProfile = async () => {
    await updateProfileMutation.mutate({ name: newName });
  };

  return (
    <ProtectedRoute>
      <div className="grid grid-cols-2 gap-6 h-[calc(100vh-7rem)]">
        {/* Left Side - Profile Settings (Fixed) */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Profile Settings</h2>
          {isLoading ? (
            <ProfileSkeleton />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your profile details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  {isEditing ? (
                    <Input
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Enter your name"
                    />
                  ) : (
                    <p className="text-lg">{user?.name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <p className="text-lg">{user?.email}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Role</label>
                  <p className="text-lg">{user?.role}</p>
                </div>
                {isEditing && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">New Password (optional)</label>
                    <Input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                    />
                  </div>
                )}
              </CardContent>
              <CardFooter>
                {isEditing ? (
                  <div className="flex gap-2">
                    <Button onClick={handleUpdateProfile}>Save Changes</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                  </div>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                )}
              </CardFooter>
            </Card>
          )}
        </div>

        {/* Right Side - Posts (Scrollable) */}
        <div className="space-y-6 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-slate-400 dark:scrollbar-thumb-slate-700">
          <h2 className="text-2xl font-bold sticky top-0 bg-background/95 backdrop-blur-sm py-2 z-10">Your Posts</h2>
          {isLoading ? (
            <PostsSkeleton />
          ) : (
            <div className="space-y-4">
              {profile?.posts.map((post: Post) => (
                <motion.div
                  key={post.id}
                  whileHover={{ scale: 1.02 }}
                  className="relative group"
                >
                  <Card className="transition-colors hover:bg-muted/50">
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
                    <CardFooter className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex gap-2">
                        <Link to="/post/edit/$postId" params={{ postId: post.id }}>
                          <Button variant="outline" size="sm">Edit</Button>
                        </Link>
                        <Button variant="destructive" size="sm">Delete</Button>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
} 
