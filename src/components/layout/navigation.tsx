'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context_original';
import ThemeToggle from '@/components/ui/theme-toggle';
import { Home, User, LogOut } from 'lucide-react';

export default function Navigation() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-card border-b border-border dark:bg-gray-900 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3" >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl dark:text-white">TexasRE Pro</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/properties" className="ext-muted-foreground hover:text-primary dark:text-gray-300 dark:hover:text-blue-400 font-medium">Properties</Link>
            <Link href="/analysis" className="ext-muted-foreground hover:text-primary dark:text-gray-300 dark:hover:text-blue-400 font-medium">Analysis</Link>
            <Link href="/education" className="ext-muted-foreground hover:text-primary dark:text-gray-300 dark:hover:text-blue-400 font-medium">Education</Link>
            <Link href="/services" className="ext-muted-foreground hover:text-primary dark:text-gray-300 dark:hover:text-blue-400 font-medium">Services</Link>
            <Link href="/settings" className="ext-muted-foreground hover:text-primary">Settings</Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {user ? (
              <>
                <span className="ext-muted-foreground dark:text-gray-300">Hi, {user.name}</span>
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 ext-muted-foreground dark:text-gray-400" />
                </div>
                <button 
                  onClick={logout}
                  className="ext-muted-foreground hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400 transition"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="ext-muted-foreground hover:text-primary dark:text-gray-300 dark:hover:text-blue-400 font-medium">
                  Sign In
                </Link>
                <Link href="/auth/signup" className="bg-blue-600 dark:bg-blue-700text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
                  Start Free Trial
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}