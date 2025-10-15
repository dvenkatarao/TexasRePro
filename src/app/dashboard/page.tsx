// src/app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { PropertyCard } from '@/components/property/PropertyCard';
import { getAllProperties } from '@/lib/property-service';
import { BarChart3, Home, TrendingUp, BookOpen, Users, Award } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if not authenticated
    if (!authLoading && !user) {
      router.push('/auth/login');
      return;
    }

    // Load properties if authenticated
    if (user) {
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Show dashboard content
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back{user?.firstName ? `, ${user.firstName}` : ''}!
          </h1>
          <p className="text-gray-600">Here's your investment overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat) => {
            const IconComponent = stat.icon;
            const colorClass = `bg-${stat.color}-100 text-${stat.color}-600`;
            return (
              <div key={stat.label} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${colorClass}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Properties */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4">Recently Viewed Properties</h2>
            <div className="space-y-4">
              {recentProperties.length > 0 ? (
                recentProperties.map((property) => (
                  <div key={property.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <PropertyCard property={property} />
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No properties viewed yet</p>
              )}
            </div>
            <Link 
              href="/properties" 
              className="block text-center mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              View All Properties →
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link 
                href="/properties" 
                className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center hover:bg-blue-100 transition-colors"
              >
                <Home className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <span className="font-medium text-blue-900">Browse Properties</span>
              </Link>
              <Link 
                href="/analysis" 
                className="bg-green-50 border border-green-200 rounded-lg p-4 text-center hover:bg-green-100 transition-colors"
              >
                <BarChart3 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <span className="font-medium text-green-900">Analyze Deal</span>
              </Link>
              <Link 
                href="/education" 
                className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center hover:bg-purple-100 transition-colors"
              >
                <BookOpen className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <span className="font-medium text-purple-900">Continue Learning</span>
              </Link>
              <Link 
                href="/services" 
                className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center hover:bg-orange-100 transition-colors"
              >
                <Users className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <span className="font-medium text-orange-900">Find Services</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}