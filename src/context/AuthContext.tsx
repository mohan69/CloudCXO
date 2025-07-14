import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase, SUPABASE_CONFIGURED } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { monitoring } from "@/lib/monitoring";

// Define the shape of the context data
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  loading: boolean;
}

// Create the context with a default undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Fallback credentials when Supabase is not configured
const FALLBACK_ADMIN_EMAIL = "cloudcxo@rightsense.in";
const FALLBACK_ADMIN_PASSWORD = "@R1ghts2025";

// Create the provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (SUPABASE_CONFIGURED) {
      // Get initial session from Supabase
      const getInitialSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user || null);
        setLoading(false);
      };

      getInitialSession();

             // Listen for auth state changes
       const { data: { subscription } } = supabase.auth.onAuthStateChange(
         async (event: any, session: any) => {
           setUser(session?.user || null);
           setLoading(false);
         }
       );

      return () => subscription.unsubscribe();
    } else {
      // Fallback: Check localStorage for simple authentication
      const authStatus = localStorage.getItem('fallback_auth');
      if (authStatus === 'true') {
        // Create a mock user object
        setUser({
          id: '1',
          email: FALLBACK_ADMIN_EMAIL,
          created_at: new Date().toISOString(),
          app_metadata: {},
          user_metadata: {},
          aud: 'authenticated',
          confirmation_sent_at: new Date().toISOString()
        } as User);
      }
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true);
      
      if (SUPABASE_CONFIGURED) {
        // Use Supabase authentication
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          monitoring.trackAuthEvent('login_failed');
          return { success: false, error: error.message };
        }

        monitoring.trackAuthEvent('login');
        return { success: true };
      } else {
        // Fallback authentication with hardcoded credentials
        if (email === FALLBACK_ADMIN_EMAIL && password === FALLBACK_ADMIN_PASSWORD) {
          localStorage.setItem('fallback_auth', 'true');
          setUser({
            id: '1',
            email: FALLBACK_ADMIN_EMAIL,
            created_at: new Date().toISOString(),
            app_metadata: {},
            user_metadata: {},
            aud: 'authenticated',
            confirmation_sent_at: new Date().toISOString()
          } as User);
          monitoring.trackAuthEvent('login');
          return { success: true };
        } else {
          monitoring.trackAuthEvent('login_failed');
          return { success: false, error: "Invalid email or password" };
        }
      }
    } catch (error) {
      return { success: false, error: "An unexpected error occurred" };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    
    if (SUPABASE_CONFIGURED) {
      await supabase.auth.signOut();
    } else {
      localStorage.removeItem('fallback_auth');
    }
    
    monitoring.trackAuthEvent('logout');
    setUser(null);
    setLoading(false);
  };

  const value = { 
    isAuthenticated: !!user, 
    user, 
    login, 
    logout, 
    loading 
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create a custom hook to use the auth context, which simplifies consumption
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};