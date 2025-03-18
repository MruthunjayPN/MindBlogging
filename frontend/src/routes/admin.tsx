import { useQuery } from '@tanstack/react-query';
import { adminApi } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ProtectedRoute } from '@/components/protected-route';
import type { User } from '@/types/api';

export default function AdminPage() {
  const { data: users, isLoading, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await adminApi.getUsers();
      return response.data;
    },
  });

  const handleDeleteUser = async (userId: string) => {
    try {
      await adminApi.deleteUser(userId);
      refetch();
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  if (isLoading) {
    return <div>Loading users...</div>;
  }

  return (
    <ProtectedRoute requireAdmin>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="grid gap-4">
          {users?.map((user: User) => (
            <Card key={user.id}>
              <CardHeader>
                <CardTitle>{user.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                    <p><strong>Posts:</strong> {user._count?.posts}</p>
                  </div>
                  <Button 
                    variant="destructive"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete User
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
} 