import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
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

// Hardcoded admin credentials for immediate access
const ADMIN_EMAIL = "cloudcxo@rightsense.in";
const ADMIN_PASSWORD = "@R1ghts2025";

// Create the provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for existing authentication
    const authStatus = localStorage.getItem('admin_authenticated');
    if (authStatus === 'true') {
      // Create a mock user object
      setUser({
        id: '1',
        email: ADMIN_EMAIL,
        created_at: new Date().toISOString(),
        app_metadata: {},
        user_metadata: {},
        aud: 'authenticated',
        confirmation_sent_at: new Date().toISOString()
      } as User);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true);
      
      // Check credentials
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Set authentication
        localStorage.setItem('admin_authenticated', 'true');
        
        // Create user object
        const mockUser = {
          id: '1',
          email: ADMIN_EMAIL,
          created_at: new Date().toISOString(),
          app_metadata: {},
          user_metadata: {},
          aud: 'authenticated',
          confirmation_sent_at: new Date().toISOString()
        } as User;
        
        setUser(mockUser);
        monitoring.trackAuthEvent('login');
        
        return { success: true };
      } else {
        monitoring.trackAuthEvent('login_failed');
        return { success: false, error: "Invalid email or password" };
      }
    } catch (error) {
      monitoring.trackAuthEvent('login_failed');
      return { success: false, error: "An unexpected error occurred" };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    localStorage.removeItem('admin_authenticated');
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