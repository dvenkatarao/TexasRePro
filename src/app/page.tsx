'use client';

import React, { useState, useEffect } from 'react';
import { 
  Star, Home, TrendingUp, Calculator, GraduationCap, Shield, 
  Users, MapPin, Check, ChevronRight, Award, BarChart3, 
  BookOpen, DollarSign, Building, Briefcase, Phone, Mail, 
  Calendar, ArrowRight, Play, Eye, Lock, Zap, Target, 
  FileText, MessageSquare, CheckCircle, XCircle 
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Link from 'next/link';

// Clock icon component
const Clock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" strokeWidth="2"/>
    <path strokeLinecap="round" strokeWidth="2" d="M12 6v6l4 2"/>
  </svg>
);

// User icon component
const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
  </svg>
);

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTier, setSelectedTier] = useState('professional');
  const [dealAnalysisValues, setDealAnalysisValues] = useState({
    purchasePrice: 350000,
    downPayment: 70000,
    rentalIncome: 3200,
    propertyTax: 583,
    insurance: 145,
    management: 256
  });
  const [confidenceScore, setConfidenceScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setConfidenceScore(75), 500);
    return () => clearTimeout(timer);
  }, []);

  const monthlyNetIncome = dealAnalysisValues.rentalIncome - dealAnalysisValues.propertyTax - dealAnalysisValues.insurance - dealAnalysisValues.management;
  const annualCashFlow = monthlyNetIncome * 12;
  const capRate = ((annualCashFlow / dealAnalysisValues.purchasePrice) * 100).toFixed(2);

  const portfolioData = [
    { month: 'Jan', value: 320000 },
    { month: 'Feb', value: 335000 },
    { month: 'Mar', value: 342000 },
    { month: 'Apr', value: 358000 },
    { month: 'May', value: 375000 },
    { month: 'Jun', value: 390000 },
  ];

  const marketData = [
    { name: 'Austin', growth: 12.5, color: '#2563EB' },
    { name: 'Dallas', growth: 9.8, color: '#10B981' },
    { name: 'Houston', growth: 8.2, color: '#F59E0B' },
    { name: 'San Antonio', growth: 11.3, color: '#8B5CF6' },
  ];

  const properties = [
    { id: 1, address: '1234 Oak Street', city: 'Austin', price: 425000, beds: 3, baths: 2, sqft: 1850, rent: 3200, cap: 7.8, type: 'Single Family', status: 'Deal Coach Approved', image: '🏡' },
    { id: 2, address: '5678 Main Ave', city: 'Dallas', price: 380000, beds: 4, baths: 2.5, sqft: 2200, rent: 2900, cap: 7.2, type: 'Single Family', status: 'Hot Deal', image: '🏠' },
    { id: 3, address: '910 Elm Duplex', city: 'Houston', price: 520000, beds: 6, baths: 4, sqft: 3100, rent: 4500, cap: 8.5, type: 'Duplex', status: 'BRRRR Ready', image: '🏘️' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-500 to-transparent animate-pulse"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center bg-red-600 text-white px-4 py-2 rounded-full mb-6">
              <Star className="w-4 h-4 mr-2" />
              <span className="text-sm font-semibold">Texas-Only Focus • Deep Market Knowledge</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Stop Being Afraid to Start<br />Investing in Texas Real Estate
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              The only platform built exclusively for Texas single-family & 1-4 unit investors.
              From your first property to your entire portfolio — we guide you every step.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/auth/signup"
                className="bg-card text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent transition flex items-center gap-2"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/auth/login"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-card hover:text-blue-900 transition flex items-center gap-2"
              >
                Sign In
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-card/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold mb-1">$2.4B+</div>
                <div className="text-sm text-blue-200">Properties Analyzed</div>
              </div>
              <div className="bg-card/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold mb-1">12,000+</div>
                <div className="text-sm text-blue-200">Texas Investors</div>
              </div>
              <div className="bg-card/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold mb-1">85%</div>
                <div className="text-sm text-blue-200">Deal Success Rate</div>
              </div>
              <div className="bg-card/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold mb-1">4.9★</div>
                <div className="text-sm text-blue-200">Investor Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Confidence Builder Section */}
      <section className="py-16 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-card-foreground mb-4">Your Investment Confidence Journey</h2>
              <p className="text-muted-foreground">We transform beginners into confident Texas real estate investors</p>
            </div>
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-card-foreground">Your Confidence Score</span>
                <span className="text-sm font-semibold text-primary">{confidenceScore}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-4">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-4 rounded-full transition-all duration-1000"
                  style={{ width: `${confidenceScore}%` }}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-accent dark:bg-blue-950 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <BookOpen className="w-5 h-5 text-primary dark:text-blue-400 mr-2" />
                  <span className="font-semibold text-card-foreground">Learn</span>
                </div>
                <p className="text-sm text-muted-foreground">Texas-specific education modules</p>
                <div className="mt-2">
                  <div className="flex items-center text-green-600 dark:text-green-400">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    <span className="text-xs">3 modules completed</span>
                  </div>
                </div>
              </div>
              <div className="bg-accent dark:bg-green-950 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Calculator className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                  <span className="font-semibold text-card-foreground">Analyze</span>
                </div>
                <p className="text-sm text-muted-foreground">Practice with real Texas deals</p>
                <div className="mt-2">
                  <div className="flex items-center text-green-600 dark:text-green-400">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    <span className="text-xs">5 deals analyzed</span>
                  </div>
                </div>
              </div>
              <div className="bg-amber-50 dark:bg-amber-950 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Users className="w-5 h-5 text-amber-600 dark:text-amber-400 mr-2" />
                  <span className="font-semibold text-card-foreground">Connect</span>
                </div>
                <p className="text-sm text-muted-foreground">Vetted Texas service providers</p>
                <div className="mt-2">
                  <div className="flex items-center text-amber-600 dark:text-amber-400">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="text-xs">2 providers contacted</span>
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-950 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Award className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" />
                  <span className="font-semibold text-card-foreground">Achieve</span>
                </div>
                <p className="text-sm text-muted-foreground">Earn investor badges</p>
                <div className="mt-2">
                  <div className="flex items-center text-purple-600 dark:text-purple-400">
                    <Award className="w-4 h-4 mr-1" />
                    <span className="text-xs">2 badges earned</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card text-card-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl">TexasRE Pro</span>
              </div>
              <p className="text-muted-foreground text-sm">The only platform built exclusively for Texas real estate investors.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-card-foreground">Platform</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>
                  <Link href="/properties" className="hover:text-primary transition-colors">
                    Properties
                  </Link>
                </li>
                <li>
                  <Link href="/analysis" className="hover:text-primary transition-colors">
                    Deal Analysis
                  </Link>
                </li>
                <li>
                  <Link href="/education" className="hover:text-primary transition-colors">
                    Education
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-primary transition-colors">
                    Services
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-card-foreground">Company</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Success Stories</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-card-foreground">Legal</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Fair Housing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">TREC Info</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground text-sm">
            <p>© 2024 TexasRE Pro. All rights reserved. | Licensed Texas Real Estate Brokerage</p>
          </div>
        </div>
      </footer>
    </div>
  );
}