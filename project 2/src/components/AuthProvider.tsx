import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session and set up refresh
    const initSession = async () => {
      try {
        // Get current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Failed to get initial session:', sessionError);
          throw sessionError;
        }

        if (session?.user) {
          console.log('Initial session found:', session.user.id);
          setUser(session.user);
          
          // Set up periodic session refresh
          const refreshInterval = setInterval(async () => {
            const { data: { session: refreshedSession }, error: refreshError } = 
              await supabase.auth.refreshSession();
            
            if (refreshError) {
              console.error('Session refresh failed:', refreshError);
              clearInterval(refreshInterval);
              setUser(null);
              window.location.href = '/';
              return;
            }

            if (refreshedSession?.user) {
              console.log('Session refreshed:', refreshedSession.user.id);
              setUser(refreshedSession.user);
            }
          }, 4 * 60 * 1000); // Refresh every 4 minutes

          return () => clearInterval(refreshInterval);
        } else {
          console.log('No initial session found');
          setUser(null);
        }
      } catch (err) {
        console.error('Session initialization error:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.id);
      
      if (event === 'SIGNED_IN') {
        console.log('User signed in:', session?.user?.id);
        setUser(session?.user || null);
      } else if (event === 'SIGNED_OUT') {
        console.log('User signed out');
        setUser(null);
        window.location.href = '/';
      } else if (event === 'TOKEN_REFRESHED') {
        console.log('Token refreshed:', session?.user?.id);
        setUser(session?.user || null);
      } else if (event === 'USER_UPDATED') {
        console.log('User updated:', session?.user?.id);
        setUser(session?.user || null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []); // Removed navigate dependency

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};