'use client';

import React, { useState } from 'react';
import { 
  BookOpen, GraduationCap, Play, Star, Clock, CheckCircle, 
  Lock, Award, Users, TrendingUp, Home, ChevronRight,
  BarChart3, Calculator, Shield, MapPin, DollarSign, Building
} from 'lucide-react';
import Link from 'next/link';
import ProtectedRoute from '@/components/auth/protected-route';


export default function EducationPage() {
  const [activeCategory, setActiveCategory] = useState('beginner');
  const [completedModules, setCompletedModules] = useState<number[]>([1, 2]); // Sample completed modules

  const learningPaths = {
    beginner: {
      title: 'First-Time Investor Path',
      description: 'Start your Texas real estate journey with confidence',
      progress: 65,
      modules: [
        {
          id: 1,
          title: 'Texas Real Estate Basics',
          description: 'Understanding the Texas market and investment fundamentals',
          duration: '45 min',
          lessons: 6,
          progress: 100,
          icon: BookOpen,
          color: 'blue',
          isPremium: false,
          badges: ['Market Understanding']
        },
        {
          id: 2,
          title: 'Understanding CAP Rates & Cash Flow',
          description: 'Master the key metrics that drive investment decisions',
          duration: '60 min',
          lessons: 8,
          progress: 100,
          icon: Calculator,
          color: 'green',
          isPremium: false,
          badges: ['Financial Analysis']
        },
        {
          id: 3,
          title: 'Texas Property Taxes Explained',
          description: 'How to estimate, protest, and save on Texas property taxes',
          duration: '30 min',
          lessons: 5,
          progress: 65,
          icon: DollarSign,
          color: 'purple',
          isPremium: false,
          badges: ['Tax Strategy']
        },
        {
          id: 4,
          title: 'Landlord-Tenant Laws in Texas',
          description: 'Your legal rights and responsibilities as a Texas landlord',
          duration: '50 min',
          lessons: 7,
          progress: 0,
          icon: Shield,
          color: 'orange',
          isPremium: true,
          badges: ['Legal Knowledge']
        },
        {
          id: 5,
          title: 'Financing Texas Investment Properties',
          description: 'DSCR loans, portfolio lenders, and Texas-specific financing',
          duration: '55 min',
          lessons: 6,
          progress: 0,
          icon: TrendingUp,
          color: 'red',
          isPremium: true,
          badges: ['Financing Mastery']
        }
      ]
    },
    advanced: {
      title: 'Advanced Investor Path',
      description: 'Scale your portfolio with sophisticated Texas strategies',
      progress: 25,
      modules: [
        {
          id: 6,
          title: 'BRRRR Method in Texas',
          description: 'Buy, rehab, rent, refinance, repeat - Texas style',
          duration: '75 min',
          lessons: 9,
          progress: 25,
          icon: BarChart3,
          color: 'purple',
          isPremium: true,
          badges: ['BRRRR Expert']
        },
        {
          id: 7,
          title: 'Texas Market Cycle Analysis',
          description: 'When to buy in different Texas markets for maximum returns',
          duration: '60 min',
          lessons: 7,
          progress: 0,
          icon: TrendingUp,
          color: 'blue',
          isPremium: true,
          badges: ['Market Timing']
        },
        {
          id: 8,
          title: 'Portfolio Optimization',
          description: 'Managing multiple properties across Texas markets',
          duration: '80 min',
          lessons: 8,
          progress: 0,
          icon: Building,
          color: 'green',
          isPremium: true,
          badges: ['Portfolio Management']
        }
      ]
    },
    specialized: {
      title: 'Specialized Topics',
      description: 'Deep dives into niche Texas investment strategies',
      progress: 10,
      modules: [
        {
          id: 9,
          title: 'Texas Short-Term Rental Investing',
          description: 'Airbnb and VRBO strategies for Texas markets',
          duration: '65 min',
          lessons: 7,
          progress: 10,
          icon: Home,
          color: 'orange',
          isPremium: true,
          badges: ['STR Expert']
        },
        {
          id: 10,
          title: 'Texas New Construction Investing',
          description: 'Working with builders and buying pre-construction',
          duration: '70 min',
          lessons: 8,
          progress: 0,
          icon: Building,
          color: 'red',
          isPremium: true,
          badges: ['New Construction']
        },
        {
          id: 11,
          title: 'Texas 1031 Exchange Strategies',
          description: 'Tax-deferred exchanges specific to Texas properties',
          duration: '50 min',
          lessons: 6,
          progress: 0,
          icon: DollarSign,
          color: 'purple',
          isPremium: true,
          badges: ['Tax Advantaged']
        }
      ]
    }
  };

  const featuredCourses = [
    {
      id: 12,
      title: 'Texas Property Tax Protest Masterclass',
      description: 'Step-by-step guide to reducing your property taxes by 15-30%',
      instructor: 'Sarah Johnson, Texas Tax Consultant',
      rating: 4.9,
      students: 1247,
      duration: '2 hours',
      price: '$149',
      image: '📊',
      isFeatured: true
    },
    {
      id: 13,
      title: 'Austin Market Deep Dive',
      description: 'Complete analysis of Austin neighborhoods and investment opportunities',
      instructor: 'Mike Chen, Austin Market Expert',
      rating: 4.8,
      students: 892,
      duration: '3 hours',
      price: '$199',
      image: '🏙️',
      isFeatured: true
    }
  ];

  const userStats = {
    confidenceScore: 75,
    badgesEarned: 3,
    coursesCompleted: 2,
    hoursLearned: 3.5,
    nextMilestone: 'Complete 5 courses to unlock Advanced Tools'
  };

  const toggleModuleCompletion = (moduleId: number) => {
    setCompletedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const currentPath = learningPaths[activeCategory as keyof typeof learningPaths];

  return (
    <ProtectedRoute>

    <div className="min-h-screen bg-background">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Texas Investor Education Center</h1>
          <p className="text-muted-foreground">Build confidence and expertise with Texas-specific real estate knowledge</p>
        </div>

        {/* User Progress Overview */}
        <div className="bg-card rounded-2xl shadow-sm p-6 mb-8">
          <div className="grid md:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{userStats.confidenceScore}%</div>
              <div className="text-sm text-muted-foreground">Confidence Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{userStats.badgesEarned}</div>
              <div className="text-sm text-muted-foreground">Badges Earned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{userStats.coursesCompleted}</div>
              <div className="text-sm text-muted-foreground">Courses Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{userStats.hoursLearned}h</div>
              <div className="text-sm text-muted-foreground">Hours Learned</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-foreground">{userStats.nextMilestone}</div>
              <div className="text-xs text-muted-foreground">Next Milestone</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Learning Paths */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl shadow-sm p-6 sticky top-8">
              <h3 className="text-lg font-semibold mb-4">Learning Paths</h3>
              <div className="space-y-2">
                {Object.entries(learningPaths).map(([key, path]) => (
                  <button
                    key={key}
                    onClick={() => setActiveCategory(key)}
                    className={`w-full text-left p-3 rounded-lg transition ${
                      activeCategory === key
                        ? 'bg-accent border border-blue-200 text-blue-700'
                        : 'hover:bg-background text-muted-foreground'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium capitalize">{key}</span>
                      <span className="text-sm text-muted-foreground">{path.progress}%</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{path.modules.length} modules</div>
                  </button>
                ))}
              </div>

              {/* Badges Earned */}
              <div className="mt-8">
                <h4 className="font-semibold mb-3">Your Badges</h4>
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <Award className="w-5 h-5 text-yellow-600 mr-2" />
                    <div>
                      <div className="text-sm font-semibold">Market Understanding</div>
                      <div className="text-xs text-yellow-700">Completed Texas Basics</div>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-accent rounded-lg border border-green-200">
                    <Award className="w-5 h-5 text-green-600 mr-2" />
                    <div>
                      <div className="text-sm font-semibold">Financial Analysis</div>
                      <div className="text-xs text-green-700">Mastered CAP Rates</div>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <Award className="w-5 h-5 text-purple-600 mr-2" />
                    <div>
                      <div className="text-sm font-semibold">Tax Strategy</div>
                      <div className="text-xs text-purple-700">Tax Protest Expert</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Path Header */}
            <div className="bg-card rounded-2xl shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-foreground">{currentPath.title}</h2>
                  <p className="text-muted-foreground">{currentPath.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{currentPath.progress}%</div>
                  <div className="text-sm text-muted-foreground">Overall Progress</div>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 dark:bg-blue-700h-2 rounded-full transition-all duration-500"
                  style={{ width: `${currentPath.progress}%` }}
                />
              </div>
            </div>

            {/* Modules Grid */}
            <div className="grid gap-6 mb-8">
              {currentPath.modules.map(module => {
                const isCompleted = completedModules.includes(module.id);
                const IconComponent = module.icon;
                
                return (
                  <div key={module.id} className="bg-card rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition">
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            module.color === 'blue' ? 'bg-blue-100' :
                            module.color === 'green' ? 'bg-green-100 dark:bg-green-900' :
                            module.color === 'purple' ? 'bg-purple-100' :
                            module.color === 'orange' ? 'bg-orange-100' : 'bg-red-100 dark:bg-red-900'
                          }`}>
                            <IconComponent className={`w-6 h-6 ${
                              module.color === 'blue' ? 'text-primary' :
                              module.color === 'green' ? 'text-green-600' :
                              module.color === 'purple' ? 'text-purple-600' :
                              module.color === 'orange' ? 'text-orange-600' : 'text-red-600'
                            }`} />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold text-lg">{module.title}</h3>
                              {module.isPremium && (
                                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                                  PREMIUM
                                </span>
                              )}
                            </div>
                            <p className="text-muted-foreground mb-3">{module.description}</p>
                            
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {module.duration}
                              </div>
                              <div className="flex items-center">
                                <BookOpen className="w-4 h-4 mr-1" />
                                {module.lessons} lessons
                              </div>
                              <div className="flex items-center space-x-1">
                                {module.badges.map((badge, index) => (
                                  <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                                    {badge}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          {isCompleted ? (
                            <div className="flex items-center text-green-600">
                              <CheckCircle className="w-5 h-5 mr-1" />
                              <span className="text-sm font-semibold">Completed</span>
                            </div>
                          ) : (
                            <button
                              onClick={() => toggleModuleCompletion(module.id)}
                              className={`px-4 py-2 rounded-lg font-semibold transition ${
                                module.isPremium
                                  ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                  : 'bg-blue-600 dark:bg-blue-700text-white hover:bg-blue-700'
                              }`}
                            >
                              {module.isPremium ? (
                                <div className="flex items-center">
                                  <Lock className="w-4 h-4 mr-1" />
                                  Upgrade
                                </div>
                              ) : (
                                'Start Learning'
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      {!isCompleted && module.progress > 0 && (
                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="text-primary">{module.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 dark:bg-blue-700h-2 rounded-full transition-all duration-500"
                              style={{ width: `${module.progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Featured Courses */}
            <div>
              <h3 className="text-xl font-bold mb-6">Featured Texas Courses</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {featuredCourses.map(course => (
                  <div key={course.id} className="bg-card rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition">
                    <div className="bg-gradient-to-br from-blue-100 to-green-100 h-32 flex items-center justify-center">
                      <span className="text-4xl">{course.image}</span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">
                          FEATURED
                        </span>
                        <div className="flex items-center text-yellow-500">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-sm font-semibold ml-1">{course.rating}</span>
                        </div>
                      </div>
                      <h4 className="font-bold text-lg mb-2">{course.title}</h4>
                      <p className="text-muted-foreground text-sm mb-4">{course.description}</p>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {course.students} students
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {course.duration}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-muted-foreground">Instructor</div>
                          <div className="font-semibold">{course.instructor}</div>
                        </div>
                        <button className="bg-blue-600 dark:bg-blue-700text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
                          Enroll - {course.price}
                        </button>
                      </div>
                    </div>
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