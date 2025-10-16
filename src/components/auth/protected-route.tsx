'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context_original';
import LoadingSpinner from '@/components/ui/loading-spinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredSubscription?: 'basic' | 'professional' | 'enterprise';
}

export default function ProtectedRoute({ children, requiredSubscription }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      // Redirect to login if not authenticated
      router.push('/auth/login');
    }
    
    if (!isLoading && user && requiredSubscription) {
      // Check subscription level (simple tier comparison)
      const subscriptionTiers = {
        'basic': 1,
        'professional': 2,
        'enterprise': 3
      };
      
      const userTier = subscriptionTiers[user.subscription];
      const requiredTier = subscriptionTiers[requiredSubscription];
      
      if (userTier < requiredTier) {
        router.push('/upgrade');
      }
    }
  }, [user, isLoading, router, requiredSubscription]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="ext-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="ext-muted-foreground">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}