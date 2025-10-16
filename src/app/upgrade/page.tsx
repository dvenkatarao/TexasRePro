'use client';

import React from 'react';
import { Star, Check, Zap, Crown, ArrowRight } from 'lucide-react';
import Link from 'next/link';
//import Header from '@/components/ui/header';
import { useAuth } from '@/contexts/auth-context';

export default function UpgradePage() {
  const { user } = useAuth();

  const features = {
    basic: [
      'Vetted Texas listings',
      'Basic deal analysis',
      '5 saved searches',
      'Texas education library',
      'Email support'
    ],
    professional: [
      'Everything in Basic',
      'Advanced analysis & BRRRR',
      'Unlimited searches',
      'Service provider access',
      'MLS listing submission',
      'Priority support'
    ],
    enterprise: [
      'Everything in Professional',
      'Portfolio tracking',
      'Team access (3 users)',
      'Custom reports',
      'Market data exports',
      'Concierge discounts'
    ]
  };

  return (
    <div className="min-h-screen  bg-background">
      {/* <Header /> */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full mb-4">
            <Crown className="w-4 h-4 mr-2" />
            <span className="text-sm font-semibold">Upgrade Required</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Unlock Premium Features
          </h1>
          <p className="text-xl ext-muted-foreground max-w-2xl mx-auto">
            Your current <span className="font-semibold capitalize">{user?.subscription}</span> plan doesn't include this feature. 
            Upgrade to access advanced tools and maximize your Texas real estate investments.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Professional Tier */}
          <div className="bg-card rounded-2xl border-2 border-blue-200 p-8 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-accent0 text-white px-4 py-1 rounded-full text-sm font-semibold">
                MOST POPULAR
              </span>
            </div>
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Professional</h3>
              <div className="flex items-baseline justify-center mb-4">
                <span className="text-4xl font-bold">$79</span>
                <span className="ext-muted-foreground ml-2">/month</span>
              </div>
              <p className="ext-muted-foreground">For serious investors building portfolios</p>
            </div>
            <ul className="space-y-3 mb-8">
              {features.professional.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="ext-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/dashboard?upgrade=professional"
              className="w-full bg-blue-600 dark:bg-blue-700text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center">
              Upgrade to Professional
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>

          {/* Enterprise Tier */}
          <div className="bg-card rounded-2xl border-2 border-purple-200 p-8 transform scale-105 shadow-xl">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Crown className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
              <div className="flex items-baseline justify-center mb-4">
                <span className="text-4xl font-bold">$149</span>
                <span className="ext-muted-foreground ml-2">/month</span>
              </div>
              <p className="ext-muted-foreground">For portfolio builders and teams</p>
            </div>
            <ul className="space-y-3 mb-8">
              {features.enterprise.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="ext-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/dashboard?upgrade=enterprise"
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition font-semibold flex items-center justify-center">
              Upgrade to Enterprise
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Current Plan Info */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4">Your Current Plan</h3>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold capitalize">{user?.subscription}</span>
              <p className="ext-muted-foreground">You're currently on the {user?.subscription} plan</p>
            </div>
            <Link
              href="/dashboard"
              className="text-primary hover:text-blue-700 font-semibold"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}