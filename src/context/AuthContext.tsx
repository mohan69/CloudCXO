import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the shape of the context data
// In a real app, you would replace 'any' with a specific user type interface
interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: (userData: any) => void;
  logout: () => void;
}

// Create the context with a default undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  // Check localStorage on mount to persist authentication state
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    const userData = localStorage.getItem('userData');
    if (authStatus === 'true' && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        // If parsing fails, clear invalid data
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userData');
      }
    }
  }, []);

  // In a real app, you'd have more complex logic here, like API calls
  const login = (userData: any) => {
    setUser(userData);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userData');
  };

  const value = { isAuthenticated: !!user, user, login, logout };

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