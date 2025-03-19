import { useAuth } from '@/contexts/auth-context';
import HomePage from './home';
import { LandingPage } from './landing';
import { Skeleton } from '@/components/ui/skeleton';

export default function IndexRoute() {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <Skeleton />;
  }

  return user ? <HomePage /> : <LandingPage />;
}