// src/app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { PropertyCard } from '@/components/property/PropertyCard';
import { getAllProperties, type Property} from '@/lib/property-service';
import { BarChart3, Home, TrendingUp, BookOpen, Users, Award } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context_original';
import { useRouter } from 'next/navigation';


export default function DashboardPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

useEffect(() => {
  console.log('🏠 Dashboard auth state:', { user, authLoading });
  
  // Only redirect if we're sure there's no user and loading is complete
  if (!authLoading && !user) {
    console.log('🚫 No user - redirecting to login');
    router.push('/auth/login');
    return;
  }

  // Load properties if authenticated
  if (user) {
    console.log('✅ User authenticated, loading properties...');
    const loadProperties = async () => {
      try {
        const props = await getAllProperties();
        setProperties(props);
      } catch (error) {
        console.error('Failed to load properties:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProperties();
  }
}, [user, authLoading, router]);

  // Mock dashboard data
  const dashboardStats = [
    { label: 'Properties Viewed', value: '12', icon: Home, color: 'blue' },
    { label: 'Deals Analyzed', value: '8', icon: BarChart3, color: 'green' },
    { label: 'Education Progress', value: '65%', icon: BookOpen, color: 'purple' },
    { label: 'Confidence Score', value: '78%', icon: TrendingUp, color: 'orange' },
  ];

  const recentProperties = properties.slice(0, 3);

  // Show loading state
  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Show dashboard content
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back{user?.firstName ? `, ${user.firstName}` : ''}!
          </h1>
          <p className="text-muted-foreground">Here's your investment overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div key={stat.label} className="bg-card rounded-lg shadow-sm border border-border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-${stat.color}-100 dark:bg-${stat.color}-900 text-${stat.color}-600 dark:text-${stat.color}-400`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Properties */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Recently Viewed Properties</h2>
            <div className="space-y-4">
              {recentProperties.length > 0 ? (
                recentProperties.map((property) => (
                  <div key={property.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <PropertyCard property={property} />
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">No properties viewed yet</p>
              )}
            </div>
            <Link 
              href="/properties" 
              className="block text-center mt-4 text-primary hover:text-primary/80 font-medium"
            >
              View All Properties →
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link 
                href="/properties" 
                className="bg-accent dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-center hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
              >
                <Home className="w-8 h-8 text-primary dark:text-blue-400 mx-auto mb-2" />
                <span className="font-medium text-blue-900 dark:text-blue-100">Browse Properties</span>
              </Link>
              <Link 
                href="/analysis" 
                className="bg-accent dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center hover:bg-green-100 dark:bg-green-900 dark:hover:bg-green-900 transition-colors"
              >
                <BarChart3 className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                <span className="font-medium text-green-900 dark:text-green-100">Analyze Deal</span>
              </Link>
              <Link 
                href="/education" 
                className="bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-lg p-4 text-center hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors"
              >
                <BookOpen className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                <span className="font-medium text-purple-900 dark:text-purple-100">Continue Learning</span>
              </Link>
              <Link 
                href="/services" 
                className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg p-4 text-center hover:bg-orange-100 dark:hover:bg-orange-900 transition-colors"
              >
                <Users className="w-8 h-8 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
                <span className="font-medium text-orange-900 dark:text-orange-100">Find Services</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}