import { useAuth } from '@/contexts/auth-context';
import HomePage from './home';
import LandingPage from './landing';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Skeleton } from "@/components/ui/skeleton";

function LoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Skeleton */}
      <div className="mb-8 text-center">
        <Skeleton className="h-12 w-64 mx-auto mb-4" />
      </div>
      
      {/* Posts Skeleton */}
      <div className="max-w-2xl mx-auto space-y-6">
        {[1, 2, 3].map((index) => (
          <Card key={index} className="cursor-not-allowed">
            <CardHeader>
              <Skeleton className="h-8 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function IndexRoute() {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return user ? <HomePage /> : <LandingPage />;
}