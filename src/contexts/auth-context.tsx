'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  subscription: 'basic' | 'professional' | 'enterprise';
  confidenceScore: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, firstName?: string, lastName?: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Key for localStorage
const AUTH_STORAGE_KEY = 'texasrepro-auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const loadAuthFromStorage = async () => {
      try {
        const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
        if (storedAuth) {
          const userData = JSON.parse(storedAuth);
          setUser(userData);
        }
      } catch (error) {
        console.error('Error loading auth from storage:', error);
        // Clear corrupted data
        localStorage.removeItem(AUTH_STORAGE_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthFromStorage();
  }, []);

  const login = async (email: string, password: string, firstName?: string, lastName?: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const user: User = {
        id: '1',
        firstName: firstName || email.split('@')[0],
        lastName: lastName || 'User',
        email: email,
        subscription: 'professional',
        confidenceScore: 75
      };
      
      setUser(user);
      // Save to localStorage
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    // Clear from localStorage
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}