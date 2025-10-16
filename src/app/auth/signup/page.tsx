'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Home, Shield, Check } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context_original';
import { useToast } from '@/hooks/use-toast';
import Toast from '@/components/ui/toast';
import LoadingSpinner from '@/components/ui/loading-spinner';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    //confirmPassword: '',
    investorType: 'beginner',
    agreeToTerms: false
  });

  const { signup, isLoading } = useAuth();
  const { toast, showToast, hideToast } = useToast();
  const router = useRouter();

  const investorTypes = [
    { value: 'beginner', label: 'First-Time Investor', description: 'New to real estate investing' },
    { value: 'experienced', label: 'Experienced Investor', description: 'Own 1-5 properties' },
    { value: 'advanced', label: 'Advanced Investor', description: 'Own 6+ properties' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreeToTerms) {
      showToast('Please agree to the terms and conditions', 'error');
      return;
    }
    
    try {
      await signup(formData.email, formData.password, formData.firstName, formData.lastName, formData.investorType);
      showToast('Account created successfully! Redirecting...', 'success');
      
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
      
    } catch (err: any) {
      console.error('Signup error:', err);
      // Show the actual error message from Supabase
      showToast(err.message || 'Error creating account. Please try again.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl">TexasRE Pro</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Start Your Texas Investment Journey</h1>
          <p className="ext-muted-foreground">Join 12,000+ successful Texas real estate investors</p>
        </div>

        {/* Signup Form */}
        <div className="bg-card rounded-2xl shadow-xl p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium ext-muted-foreground mb-2">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium ext-muted-foreground mb-2">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Doe"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium ext-muted-foreground mb-2">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="investor@example.com"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium ext-muted-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Create a strong password"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:ext-muted-foreground"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Investor Type */}
            <div>
              <label className="block text-sm font-medium ext-muted-foreground mb-3">
                Which best describes you?
              </label>
              <div className="grid gap-3">
                {investorTypes.map((type) => (
                  <label key={type.value} className="flex items-center p-4 border border-gray-300 rounded-lg hover:border-blue-300 hover:bg-accent cursor-pointer transition">
                    <input
                      type="radio"
                      name="investorType"
                      value={type.value}
                      checked={formData.investorType === type.value}
                      onChange={(e) => setFormData({...formData, investorType: e.target.value})}
                      className="text-primary border-gray-300 focus:ring-blue-500"
                      disabled={isLoading}
                    />
                    <div className="ml-3">
                      <div className="font-medium text-foreground">{type.label}</div>
                      <div className="text-sm ext-muted-foreground">{type.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start">
              <input
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={(e) => setFormData({...formData, agreeToTerms: e.target.checked})}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-blue-500 mt-1"
                required
                disabled={isLoading}
              />
              <label className="ml-2 text-sm ext-muted-foreground">
                I agree to the{' '}
                <a href="#" className="text-primary hover:text-blue-500">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-primary hover:text-blue-500">Privacy Policy</a>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 dark:bg-blue-700text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Creating Account...
                </>
              ) : (
                <>
                  Start 14-Day Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="ext-muted-foreground">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-primary hover:text-blue-500 font-semibold">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-card rounded-lg shadow-sm">
            <Check className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <div className="text-sm font-semibold">No Credit Card Required</div>
          </div>
          <div className="text-center p-4 bg-card rounded-lg shadow-sm">
            <Check className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <div className="text-sm font-semibold">14-Day Free Trial</div>
          </div>
          <div className="text-center p-4 bg-card rounded-lg shadow-sm">
            <Check className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <div className="text-sm font-semibold">Cancel Anytime</div>
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
}