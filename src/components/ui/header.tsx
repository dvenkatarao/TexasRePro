'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Home, Menu, X, User, LogOut, Search, BarChart3, BookOpen, Users, FileText, Star } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import LoadingSpinner from './loading-spinner';
import ThemeToggle from '@/components/ui/theme-toggle';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  const navigation = [
    { name: 'Properties', href: '/properties', icon: Home },
    { name: 'Deal Analysis', href: '/analysis', icon: BarChart3 },
    { name: 'Investment Reports', href: '/reports', icon: FileText },
    { name: 'Education', href: '/education', icon: BookOpen },
    { name: 'Services', href: '/services', icon: Users },
    { name: 'Favorites', href: '/favorites', icon: Star },
  ];

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // ← ADD THIS
    
    try {
      console.log('🚪 Attempting logout...');
      await logout();
      setIsUserMenuOpen(false);
      setIsMobileMenuOpen(false);
      console.log('✅ Logout successful');
      // Use hard redirect
      window.location.href = '/';
    } catch (error) {
      console.error('❌ Logout failed:', error);
    }
  };

  if (isLoading) {
    return (
      <header className="bg-background/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TexasRE Pro
              </span>
            </div>
            <LoadingSpinner size="sm" />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-background/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={user ? '/dashboard' : '/'} className="flex items-center space-x-3 group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
              <Home className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-foreground">
                TexasRE Pro
              </span>
              <span className="text-xs text-muted-foreground -mt-1 leading-tight">
                Premium Investments
              </span>
            </div>
          </Link>
          {/* Desktop Navigation - ONLY show when logged in */}
          {user && (
            <nav className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-accent/50 transition-all duration-200 group"
                  >
                    <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="font-medium text-sm">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            
            {user ? (
              <div className="flex items-center space-x-3">
                {/* Quick Search */}
                <button className="p-2 rounded-lg bg-accent/50 hover:bg-accent transition-colors duration-200">
                  <Search className="w-5 h-5 text-muted-foreground" />
                </button>

                {/* USER MENU - THIS WAS MISSING! */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 px-4 py-2 rounded-xl border border-border/50 transition-all duration-200 group"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-lg">
                      {user.firstName?.charAt(0) || user.name?.charAt(0) || 'U'}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-foreground">{user.firstName || user.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{user.subscription} Plan</p>
                    </div>
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-background/95 backdrop-blur-lg rounded-xl shadow-2xl border border-border/50 py-2 z-50 animate-in fade-in duration-200">
                      <div className="px-4 py-3 border-b border-border/50">
                        <p className="text-sm font-semibold text-foreground">{user.firstName} {user.lastName}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                      
                      <Link
                        href="/dashboard"
                        className="flex items-center space-x-3 px-4 py-3 text-sm text-foreground hover:bg-accent/50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <BarChart3 className="w-4 h-4" />
                        <span>Dashboard</span>
                      </Link>
                      
                      <Link
                        href="/profile"
                        className="flex items-center space-x-3 px-4 py-3 text-sm text-foreground hover:bg-accent/50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        <span>Profile Settings</span>
                      </Link>
                      
                      <div className="border-t border-border/50 mt-2 pt-2">
                        <button
                          onClick={(e) => handleLogout(e)}
                          className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Clean, minimal logged-out buttons
              <div className="flex items-center space-x-3">
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-accent/50 hover:bg-accent transition-colors duration-200"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-lg border-t border-border/50 shadow-2xl animate-in slide-in-from-top duration-200">
            <div className="py-4 space-y-1">
              {/* Only show navigation when logged in */}
              {user && navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 px-4 py-3 text-foreground hover:bg-accent/50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
              
              <div className="border-t border-border/50 pt-4 mt-2">
                {user ? (
                  <>
                    <div className="px-4 py-2 text-sm text-muted-foreground">
                      Signed in as {user.firstName || user.name}
                    </div>
                    <Link
                      href="/dashboard"
                      className="flex items-center space-x-3 px-4 py-3 text-foreground hover:bg-accent/50 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <BarChart3 className="w-5 h-5" />
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      href="/profile"
                      className="flex items-center space-x-3 px-4 py-3 text-foreground hover:bg-accent/50 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User className="w-5 h-5" />
                      <span>Profile Settings</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      className="flex items-center space-x-3 px-4 py-3 text-foreground hover:bg-accent/50 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User className="w-5 h-5" />
                      <span>Sign In</span>
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-colors mx-4 rounded-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span>Get Started</span>
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