'use client';

import React, { useState } from 'react';
import { 
  TrendingUp, DollarSign, Home, BarChart3, BookOpen, Users, 
  MapPin, Calendar, Target, Award, ChevronRight,
  Plus, Search, Filter, Star, Eye, Calculator
} from 'lucide-react';
import { LineChart, Line, Area, AreaChart, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Link from 'next/link';
import Header from '@/components/ui/header';
import { useAuth } from '@/contexts/auth-context';
import ProtectedRoute from '@/components/auth/protected-route';

// Helper components
const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
  </svg>
);

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [confidenceScore, setConfidenceScore] = useState(65);
  const { user } = useAuth();

  const portfolioData = [
    { month: 'Jan', value: 450000, cashFlow: 2850 },
    { month: 'Feb', value: 467000, cashFlow: 2920 },
    { month: 'Mar', value: 485000, cashFlow: 3010 },
    { month: 'Apr', value: 502000, cashFlow: 3150 },
    { month: 'May', value: 520000, cashFlow: 3240 },
    { month: 'Jun', value: 545000, cashFlow: 3350 },
  ];

  const recentActivities = [
    { id: 1, type: 'analysis', property: '123 Oak St, Austin', time: '2 hours ago', icon: BarChart3 },
    { id: 2, type: 'education', property: 'Texas Tax Strategies', time: '1 day ago', icon: BookOpen },
    { id: 3, type: 'saved', property: '567 Main St, Dallas', time: '2 days ago', icon: Star },
  ];

  const quickActions = [
    { title: 'Analyze New Deal', description: 'Run financial analysis', icon: Calculator, color: 'blue', href: '/analysis' },
    { title: 'Find Properties', description: 'Browse vetted listings', icon: Search, color: 'green', href: '/listings' },
    { title: 'Continue Learning', description: 'Texas investor course', icon: BookOpen, color: 'purple', href: '/education' },
    { title: 'Find Services', description: 'Connect with providers', icon: Users, color: 'orange', href: '/services' },
  ];

  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.firstName || 'Investor'}! 👋
          </h1>
          <p className="text-gray-600">Here's your Texas investment overview</p>
        </div>

        {/* Confidence Score */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Your Investor Confidence</h2>
            <span className="text-blue-600 font-semibold">{user?.confidenceScore || confidenceScore}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-1000"
              style={{ width: `${user?.confidenceScore || confidenceScore}%` }}
            />
          </div>
          <p className="text-sm text-gray-600">
            Complete your learning path to unlock advanced features
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Portfolio Value</h3>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold">$1,245,000</div>
            <div className="text-sm text-green-600 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              +12.5% this year
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Monthly Cash Flow</h3>
              <DollarSign className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-2xl font-bold">$4,850</div>
            <div className="text-sm text-gray-600">From 3 properties</div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Average CAP Rate</h3>
              <BarChart3 className="w-5 h-5 text-purple-500" />
            </div>
            <div className="text-2xl font-bold">7.8%</div>
            <div className="text-sm text-green-600">Above market average</div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Next Learning</h3>
              <BookOpen className="w-5 h-5 text-orange-500" />
            </div>
            <div className="text-lg font-semibold">Texas Taxes</div>
            <div className="text-sm text-gray-600">65% completed</div>
          </div>
        </div>

        {/* Rest of your dashboard content remains the same */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Portfolio Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-6">Portfolio Performance</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={portfolioData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" stroke="#2563EB" fill="#3B82F6" fillOpacity={0.1} />
                  <Line type="monotone" dataKey="cashFlow" stroke="#10B981" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Actions & Activity */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    href={action.href}
                    className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition group"
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                      action.color === 'blue' ? 'bg-blue-100' :
                      action.color === 'green' ? 'bg-green-100' :
                      action.color === 'purple' ? 'bg-purple-100' : 'bg-orange-100'
                    }`}>
                      <action.icon className={`w-5 h-5 ${
                        action.color === 'blue' ? 'text-blue-600' :
                        action.color === 'green' ? 'text-green-600' :
                        action.color === 'purple' ? 'text-purple-600' : 'text-orange-600'
                      }`} />
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-semibold text-sm group-hover:text-blue-600">{action.title}</div>
                      <div className="text-xs text-gray-600">{action.description}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="flex items-center group cursor-pointer">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-100 transition">
                      <activity.icon className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium group-hover:text-blue-600">{activity.property}</div>
                      <div className="text-xs text-gray-500">{activity.time}</div>
                    </div>
                    <Eye className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}