import { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from '@tanstack/react-router';
import { userApi } from '@/lib/api/user';
import { blogApi } from '@/lib/api/blog';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { ProtectedRoute } from '@/components/protected-route';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Post } from '@/types/post';
import { motion } from 'framer-motion';
import { ShinyButton } from '@/components/magicui/shiny-button';
import { useToast } from '@/hooks/use-toast';
import { useOutsideClick } from '@/hooks/useOutsideClick';

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
  const { user, updateUser } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(user?.name || '');
  const [newPassword, setNewPassword] = useState('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [deletingPostIds, setDeletingPostIds] = useState<Set<string>>(new Set());
  const blogRef = useRef<HTMLDivElement>(null);
  
  useOutsideClick(blogRef as React.RefObject<HTMLDivElement>, () => {
    setSelectedPost(null);
  });

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await userApi.getProfile();
      return response.data;
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (data: { name: string; password?: string }) => {
      const response = await userApi.updateProfile(data);
      return response.data;
    },
    onSuccess: (updatedUser) => {
      updateUser(updatedUser);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      
      setIsEditing(false);
      setNewPassword('');
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: async (postId: string) => {
      setDeletingPostIds(prev => new Set(prev).add(postId));
      try {
        return await blogApi.deletePost(postId);
      } finally {
        setDeletingPostIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(postId);
          return newSet;
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      
      toast({
        title: "Success",
        description: "Post deleted successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete post",
        variant: "destructive",
      });
    },
  });

  const handleUpdateProfile = async () => {
    const updateData: { name: string; password?: string } = {
      name: newName,
    };

    if (newPassword.trim()) {
      updateData.password = newPassword;
    }

    await updateProfileMutation.mutate(updateData);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setNewName(user?.name || '');
    setNewPassword('');
    toast({
      description: "Edit cancelled",
    });
  };

  const handleDeletePost = async (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await deletePostMutation.mutate(postId);
    }
  };

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
  };

  return (
    <ProtectedRoute>
      <div className="relative">
        <div className={`grid grid-cols-2 gap-6 h-[calc(100vh-7rem)] ${selectedPost ? 'blur-sm' : ''}`}>
          {/* Left Side - Profile Settings (Fixed) */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Profile Settings</h2>
            {isLoading ? (
              <ProfileSkeleton />
            ) : (
              <Card className='bg-french dark:bg-onyx border border-french dark:border-space'>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your profile details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground font-medium">Name</label>
                    {isEditing ? (
                      <Input
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="Enter your name"
                        className='w-1/2'
                        disabled={updateProfileMutation.isPending}
                      />
                    ) : (
                      <p className="text-lg">{user?.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground font-medium">Email</label>
                    <p className="text-lg">{user?.email}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground font-medium">Role</label>
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
                        className="w-1/2"
                        disabled={updateProfileMutation.isPending}
                      />
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  {isEditing ? (
                    <div className="flex gap-2">
                      <ShinyButton 
                        onClick={handleUpdateProfile}
                        disabled={updateProfileMutation.isPending || !newName.trim()}
                      >
                        {updateProfileMutation.isPending ? 'Saving...' : 'Save'}
                      </ShinyButton>
                      <ShinyButton 
                        onClick={handleCancelEdit}
                        disabled={updateProfileMutation.isPending}
                      >
                        Cancel
                      </ShinyButton>
                    </div>
                  ) : (
                    <ShinyButton 
                      className='w-40' 
                      onClick={() => setIsEditing(true)}
                      disabled={updateProfileMutation.isPending}
                    >
                      Edit Profile
                    </ShinyButton>
                  )}
                </CardFooter>
              </Card>
            )}
          </div>

          {/* Right Side - Posts (Scrollable) */}
          <div className="space-y-6 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-slate-400 dark:scrollbar-thumb-slate-700">
            <h2 className="text-2xl font-bold sticky top-0 backdrop-blur-sm py-2 z-10">Your Posts</h2>
            {isLoading ? (
              <PostsSkeleton />
            ) : (
              <div className="space-y-4">
                {profile?.posts.map((post: Post) => (
                  <motion.div
                    key={post.id}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="relative group">
                      <Card 
                        className="transition-colors bg-french dark:bg-onyx border border-french dark:border-space hover:bg-muted/50 cursor-pointer"
                        onClick={() => handlePostClick(post)}
                      >
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
                        <div className="absolute bottom-1 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                          <Link 
                            to="/post/edit/$postId" 
                            params={{ postId: post.id }}
                            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                              e.stopPropagation();
                              navigate({ to: `/post/edit/${post.id}` });
                            }}
                          >
                            <Button 
                              size="sm" 
                              className="bg-eblack text-flashwhite dark:bg-flashwhite dark:text-eblack"
                              disabled={deletingPostIds.has(post.id)}
                            >
                              Edit
                            </Button>
                          </Link>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                              e.stopPropagation();
                              handleDeletePost(post.id);
                            }}
                            disabled={deletingPostIds.has(post.id)}
                          >
                            {deletingPostIds.has(post.id) ? 'Deleting...' : 'Delete'}
                          </Button>
                        </div>
                      </Card>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Selected post overlay */}
        {selectedPost && (
          <div className="fixed inset-0 bg-eblack/80  dark:bg-night/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div 
              ref={blogRef}
              className="bg-flashwhite dark:bg-onyx  rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border scrollbar-thin scrollbar-thumb-slate-400 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent  border-slategray dark:border-onyx "
              style={{ 
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgb(148 163 184) transparent'
              }}
            >
              <Card className="border-none shadow-none bg-transparent">
                <CardHeader className="px-10 pt-10">
                  <CardTitle className="text-3xl">
                    {selectedPost.title}
                  </CardTitle>
                  <CardDescription>
                    {new Date(selectedPost.createdAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-10 pb-10">
                  <div className="prose prose-lg max-w-none dark:prose-invert">
                    {selectedPost.content}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
} 
