// src/app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { PropertyCard } from '@/components/property/PropertyCard';
import { getAllProperties, type Property } from '@/lib/property-service';
import { 
  BarChart3, Home, TrendingUp, BookOpen, Users, Award, 
  Eye, Heart, DollarSign, MapPin, Calendar, Zap,
  ArrowUpRight, ArrowDownRight, Target
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeMetric, setActiveMetric] = useState('overview');
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
      return;
    }

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

  // Enhanced dashboard data with trends
  const dashboardStats = [
    { 
      label: 'Portfolio Value', 
      value: '$1.2M', 
      change: '+12.4%', 
      trend: 'up',
      icon: DollarSign,
      color: 'emerald',
      description: 'Total investment portfolio'
    },
    { 
      label: 'Active Deals', 
      value: '8', 
      change: '+2', 
      trend: 'up',
      icon: Target,
      color: 'blue',
      description: 'Properties in analysis'
    },
    { 
      label: 'Monthly Cash Flow', 
      value: '$4,280', 
      change: '+$420', 
      trend: 'up',
      icon: TrendingUp,
      color: 'purple',
      description: 'Net monthly income'
    },
    { 
      label: 'Avg. CAP Rate', 
      value: '8.2%', 
      change: '+0.4%', 
      trend: 'up',
      icon: Zap,
      color: 'orange',
      description: 'Portfolio average'
    },
  ];

  const quickActions = [
    {
      title: 'Find Properties',
      description: 'Browse vetted Texas deals',
      icon: Home,
      href: '/properties',
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Analyze Deal',
      description: 'Run investment calculations',
      icon: BarChart3,
      href: '/analysis',
      color: 'emerald',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'Market Insights',
      description: 'Texas market trends',
      icon: TrendingUp,
      href: '/reports',
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Learn & Grow',
      description: 'Investment education',
      icon: BookOpen,
      href: '/education',
      color: 'orange',
      gradient: 'from-orange-500 to-red-500'
    },
  ];

  const recentProperties = properties.slice(0, 3);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your investment dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">
                  Welcome back, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{user?.firstName}!</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Here's your investment overview for {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Investor Level</p>
                  <p className="font-semibold text-foreground capitalize">{user?.subscription}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {dashboardStats.map((stat, index) => {
              const Icon = stat.icon;
              const trendColor = stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600';
              const bgColor = `bg-${stat.color}-500/10`;
              const borderColor = `border-${stat.color}-200`;
              
              return (
                <div 
                  key={stat.label}
                  className="relative group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  <div className={`relative bg-background/80 backdrop-blur-sm border ${borderColor} rounded-2xl p-6 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl ${bgColor}`}>
                        <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                      </div>
                      <div className={`flex items-center space-x-1 text-sm ${trendColor}`}>
                        {stat.trend === 'up' ? (
                          <ArrowUpRight className="w-4 h-4" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4" />
                        )}
                        <span className="font-semibold">{stat.change}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
                      <p className="text-sm font-medium text-foreground mb-1">{stat.label}</p>
                      <p className="text-xs text-muted-foreground">{stat.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <div className="lg:col-span-1">
              <div className="bg-background/80 backdrop-blur-sm rounded-2xl border border-border/50 p-6">
                <h2 className="text-xl font-semibold text-foreground mb-6">Quick Actions</h2>
                <div className="space-y-4">
                  {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <Link
                        key={action.title}
                        href={action.href}
                        className="flex items-center space-x-4 p-4 rounded-xl border border-border/50 hover:border-border hover:shadow-lg transition-all duration-300 group"
                      >
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${action.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {action.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">{action.description}</p>
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Recent Properties & Activity */}
            <div className="lg:col-span-2 space-y-8">
              {/* Recent Properties */}
              <div className="bg-background/80 backdrop-blur-sm rounded-2xl border border-border/50 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Recently Viewed Properties</h2>
                  <Link 
                    href="/properties" 
                    className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 font-medium"
                  >
                    <span>View All</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="grid gap-6">
                  {recentProperties.length > 0 ? (
                    recentProperties.map((property) => (
                      <div key={property.id} className="border border-border/50 rounded-xl hover:shadow-lg transition-all duration-300">
                        <PropertyCard property={property} showAnalysis={true} />
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <Home className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">No properties viewed yet</h3>
                      <p className="text-muted-foreground mb-4">Start exploring Texas investment opportunities</p>
                      <Link
                        href="/properties"
                        className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                      >
                        <span>Browse Properties</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Market Insights Card */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Texas Market Pulse</h3>
                  <TrendingUp className="w-6 h-6 text-white/80" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-100">Austin Appreciation</span>
                    <span className="font-semibold">+12.5% YoY</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-100">Rental Demand</span>
                    <span className="font-semibold">Very High</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-100">Avg. Days on Market</span>
                    <span className="font-semibold">24 days</span>
                  </div>
                </div>
                <Link
                  href="/reports"
                  className="inline-flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white mt-4 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  <span>View Full Report</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}