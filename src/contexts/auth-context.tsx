'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  investorType?: 'beginner' | 'experienced' | 'advanced';
  phoneNumber?: string;        // Add this
  avatar_url?: string;          // Add this
  subscription: 'basic' | 'professional' | 'enterprise';
  confidenceScore: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, firstName: string, lastName: string, investorType: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>; // Add this
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // Get user profile from database
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          setUser({
            id: profile.id,
            email: profile.email,
            name: `${profile.first_name} ${profile.last_name}`, // Combine first + last
            firstName: profile.first_name,    // Add this
            lastName: profile.last_name,      // Add this
            subscription: profile.subscription_tier as any,
            confidenceScore: profile.confidence_score,
            avatar_url: profile.avatar_url
          });
        }
      }
      setIsLoading(false);
    };

    getUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profile) {
            setUser({
              id: profile.id,
              email: profile.email,
              name: `${profile.first_name} ${profile.last_name}`,
              firstName: profile.first_name,
              lastName: profile.last_name,
              investorType: profile.investor_type as any, // Add this
              subscription: profile.subscription_tier as any,
              confidenceScore: profile.confidence_score,
              avatar_url: profile.avatar_url
            });
          }
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Handle specific Supabase auth errors
        if (error.message === 'Email not confirmed') {
          throw new Error('Please check your email and confirm your account before logging in.');}
        else if (error.message === 'Invalid login credentials') {
          throw new Error('Invalid email or password. Please check your credentials or sign up for an account.');
        } else if (error.message.includes('Email not confirmed')) {
          throw new Error('Please confirm your email address before logging in.');
        } else {
          throw new Error('Login failed. Please try again.');
        }
      }
      
      if (data.user) {
      // Check if email is confirmed and show appropriate message
      if (!data.user.email_confirmed_at) {
        // This shouldn't happen with the error handling above, but just in case
        console.warn('User logged in but email not confirmed');
      }        
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, firstName: string, lastName: string, investorType: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            investor_type: investorType,
          },
        },
      });

      if (error) {
        console.error('Supabase auth error:', error);
        throw new Error(error.message || 'Signup failed');
      }

      console.log('Auth signup successful, user:', data.user);

      if (data.user) {
        // ✅ Profile is automatically created by the trigger
        console.log('Profile will be auto-created by database trigger');
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Signup process failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resendConfirmationEmail = async (email: string) => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });

      if (error) throw error;
      
      // You can return a success message or handle it in the UI
      return 'Confirmation email sent! Please check your inbox.';
    } catch (error) {
      console.error('Resend confirmation failed:', error);
      throw error;
    }
  };

  // Add the resetPassword function
  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;
      
      // You might want to show a success message here
      console.log('Password reset email sent');
    } catch (error) {
      console.error('Password reset failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
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