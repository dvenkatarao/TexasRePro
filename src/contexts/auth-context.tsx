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
  phoneNumber?: string;
  avatar_url?: string;
  subscription: 'basic' | 'professional' | 'enterprise';
  confidenceScore: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, firstName: string, lastName: string, investorType: string) => Promise<void>;
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

  useEffect(() => {
    console.log('🔄 AuthProvider mounted - checking session...');
    
    const getUser = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('❌ Session error:', sessionError);
          setIsLoading(false);
          return;
        }

        console.log('📋 Initial session check:', session);
        
        if (session?.user) {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profileError) {
            console.error('❌ Profile fetch error:', profileError);
            // Don't set user if profile fetch fails
          } else if (profile) {
            console.log('👤 Profile data found:', profile);
            setUser({
              id: profile.id,
              email: profile.email,
              name: `${profile.first_name} ${profile.last_name}`,
              firstName: profile.first_name,
              lastName: profile.last_name,
              subscription: profile.subscription_tier as any,
              confidenceScore: profile.confidence_score,
              avatar_url: profile.avatar_url
            });
          }
        }
      } catch (error) {
        console.error('💥 Auth initialization error:', error);
      } finally {
        setIsLoading(false);
        console.log('✅ Auth loading complete');
      }
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 Auth state changed:', event, session);
        
        if (session?.user) {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profileError) {
            console.error('❌ Profile fetch error in listener:', profileError);
            setUser(null);
          } else if (profile) {
            setUser({
              id: profile.id,
              email: profile.email,
              name: `${profile.first_name} ${profile.last_name}`,
              firstName: profile.first_name,
              lastName: profile.last_name,
              investorType: profile.investor_type as any,
              subscription: profile.subscription_tier as any,
              confidenceScore: profile.confidence_score,
              avatar_url: profile.avatar_url
            });
          }
        } else {
          console.log('🚫 No session - setting user to null');
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
      console.log('🔐 Attempting login for:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('❌ Login error:', error);
        // Remove the manual redirect - let onAuthStateChange handle it
        throw new Error(error.message);
      }
      
      console.log('✅ Login successful, user:', data.user);
      // DO NOT redirect here - the onAuthStateChange will handle it
      
    } catch (error) {
      console.error('💥 Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // ... keep your existing signup, logout, resetPassword functions
  // BUT REMOVE any router.push from signup too

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
        console.log('Profile will be auto-created by database trigger');
        // Remove: router.push('/dashboard');
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
      
      return 'Confirmation email sent! Please check your inbox.';
    } catch (error) {
      console.error('Resend confirmation failed:', error);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;
      
      console.log('Password reset email sent');
    } catch (error) {
      console.error('Password reset failed:', error);
      throw error;
    }
  };

  const logout = async () => {
  try {
      console.log('🔐 Starting logout process...');
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
      console.error('❌ Supabase logout error:', error);
      throw error;
      }
      
      console.log('✅ Supabase logout successful');
      setUser(null);
      console.log('✅ User state cleared');
      
      // Force hard redirect - this is crucial
      window.location.href = '/';
      
  } catch (error) {
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