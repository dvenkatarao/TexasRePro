// src/contexts/auth-context.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface User {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  investorType?: 'beginner' | 'intermediate' | 'experienced';
  phoneNumber?: string;
  avatar_url?: string;
  subscription: 'free' | 'basic' | 'professional' | 'enterprise';
  confidenceScore: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, firstName: string, lastName: string, investorType: string) => Promise<'SUCCESS' | 'CONFIRM_EMAIL'>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();

  const fetchProfile = async (userId: string): Promise<User | null> => {
    try {
      console.log('🔍 Fetching profile for user:', userId);
      
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle(); // Use maybeSingle() instead of single() to avoid errors when no rows

      // Check for actual errors (not just "no rows")
      if (profileError) {
        console.error('❌ Profile fetch error:', {
          message: profileError.message || 'Unknown error',
          details: profileError.details || 'No details',
          hint: profileError.hint || 'No hint',
          code: profileError.code || 'No code'
        });
        return null;
      }

      // If no profile exists, it's not an error - just no data yet
      if (!profile) {
        console.log('ℹ️ No profile found for user (will be created on first login)');
        return null;
      }

      console.log('✅ Profile found:', profile);
      
      return {
        id: profile.id,
        email: profile.email,
        name: `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || profile.email,
        firstName: profile.first_name,
        lastName: profile.last_name,
        investorType: profile.investor_type as any,
        subscription: profile.subscription_tier as any || 'free',
        confidenceScore: profile.confidence_score || 0,
        avatar_url: profile.avatar_url
      };
      
    } catch (error) {
      console.error('💥 Profile fetch exception:', error);
      return null;
    }
  };

  useEffect(() => {
    console.log('🔄 AuthProvider mounted');
    
    const initializeAuth = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('❌ Session error:', sessionError);
          setIsLoading(false);
          return;
        }

        if (session?.user) {
          console.log('📋 Session found for:', session.user.email);
          const userData = await fetchProfile(session.user.id);
          if (userData) {
            setUser(userData);
          }
        } else {
          console.log('📋 No active session');
        }
      } catch (error) {
        console.error('💥 Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 Auth event:', event);
        
        if (event === 'SIGNED_IN' && session?.user) {
          console.log('✅ User signed in:', session.user.email);
          
          // Wait a moment for trigger to create profile
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          const userData = await fetchProfile(session.user.id);
          setUser(userData);
          
          // Redirect to dashboard
          router.push('/dashboard');
          
        } else if (event === 'SIGNED_OUT') {
          console.log('🚫 User signed out');
          setUser(null);
          
        } else if (event === 'USER_UPDATED' && session?.user) {
          console.log('🔄 User updated');
          const userData = await fetchProfile(session.user.id);
          setUser(userData);
        }
        
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log('🔐 Attempting login for:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('❌ Login error:', error.message);
        
        // Provide user-friendly error messages
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('Invalid email or password. Please check your credentials and try again.');
        } else if (error.message.includes('Email not confirmed')) {
          throw new Error('Please confirm your email address before logging in.');
        } else {
          throw new Error(error.message);
        }
      }
      
      if (!data.user) {
        throw new Error('Login failed. Please try again.');
      }
      
      console.log('✅ Login successful for:', data.user.email);
      // The onAuthStateChange listener will handle profile fetch and redirect
      
    } catch (error: any) {
      console.error('💥 Login failed:', error.message);
      setIsLoading(false);
      throw error;
    }
  };

  const signup = async (
    email: string, 
    password: string, 
    firstName: string, 
    lastName: string, 
    investorType: string
  ): Promise<'SUCCESS' | 'CONFIRM_EMAIL'> => {
    setIsLoading(true);
    try {
      console.log('📝 Attempting signup for:', email);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            investor_type: investorType,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`
        },
      });

      if (error) {
        console.error('❌ Signup error:', error.message);
        setIsLoading(false);
        
        if (error.message.includes('already registered')) {
          throw new Error('This email is already registered. Please login instead.');
        } else {
          throw new Error(error.message || 'Signup failed');
        }
      }

      if (!data.user) {
        setIsLoading(false);
        throw new Error('Signup failed. Please try again.');
      }

      console.log('✅ Signup successful for:', data.user.email);
      console.log('🔍 User identities:', data.user.identities);
      
      setIsLoading(false);
      
      // Check if email confirmation is required
      // If identities array is empty, email confirmation is required
      if (!data.user.identities || data.user.identities.length === 0) {
        console.log('📧 Email confirmation required - returning CONFIRM_EMAIL');
        return 'CONFIRM_EMAIL';
      } else {
        console.log('✅ User auto-confirmed - returning SUCCESS');
        return 'SUCCESS';
      }
      
    } catch (error: any) {
      console.error('💥 Signup exception:', error.message);
      setIsLoading(false);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      console.log('🔐 Requesting password reset for:', email);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        console.error('❌ Password reset error:', error.message);
        throw new Error(error.message);
      }
      
      console.log('✅ Password reset email sent');
    } catch (error: any) {
      console.error('💥 Password reset failed:', error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      console.log('🔐 Logging out...');
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('❌ Logout error:', error);
        throw error;
      }
      
      console.log('✅ Logout successful');
      setUser(null);
      
      // Force complete page reload to clear all state
      window.location.href = '/';
      
    } catch (error: any) {
      console.error('💥 Logout failed:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, resetPassword, isLoading }}>
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