// src/components/ui/header.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Home, Menu, X, User, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import LoadingSpinner from './loading-spinner';
import ThemeToggle from '@/components/ui/theme-toggle';


export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  // Navigation based on authentication state
  const publicNavigation = [
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
  ];

  const authenticatedNavigation = [
    { name: 'Properties', href: '/properties' },
    { name: 'Deal Analysis', href: '/analysis' },
    { name: 'Investment Reports', href: '/reports' }, // ← ADDED THIS LINE
    { name: 'Education', href: '/education' },
    { name: 'Services', href: '/services' },
    { name: 'Favorites', href: '/favorites' },
  ];

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    router.push('/');
  };

  // Determine logo link based on auth state
  const logoHref = user ? '/dashboard' : '/';
  const currentNavigation = user ? authenticatedNavigation : publicNavigation;

  if (isLoading) {
    return (
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl">TexasRE Pro</span>
            </div>
            <LoadingSpinner size="sm" />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Dynamic routing based on auth */}
          <Link href={logoHref} className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white">TexasRE Pro</span>
          </Link>

          {/* Desktop Navigation - Dynamic based on auth */}
          <nav className="hidden md:flex items-center space-x-8">
            {currentNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              // Authenticated User Menu
              <div className="flex items-center space-x-4">
                {/* Theme Toggle - Only show when authenticated */}
                <ThemeToggle />
                <div className="theme-toggle-container">
                  {/* Your ThemeToggle component will go here */}
                </div>
                
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {user.firstName?.charAt(0) || user.name?.charAt(0) || 'U'}
                    </div>
                    <span>{user.firstName || user.name}</span>
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50 transition-colors">
                      <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700 capitalize">
                        {user.subscription} plan
                      </div>
                      <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-gray-700">
                        {user.firstName} {user.lastName}
                      </div>
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Profile Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Public Auth Buttons
              <>
                <Link
                  href="/auth/login"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation - Dynamic based on auth */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg transition-colors">
            <div className="px-4 py-6 space-y-4">
              {/* Navigation Links */}
              {currentNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Auth Section */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4 transition-colors">
                {user ? (
                  <>
                    <div className="px-2 py-1 text-sm text-gray-500 dark:text-gray-400">
                      Signed in as {user.firstName || user.name}
                    </div>
                    <Link
                      href="/dashboard"
                      className="block text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left text-lg font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 py-2 transition-colors flex items-center"
                    >
                      <LogOut className="w-5 h-5 mr-2" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      className="block text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-center text-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}