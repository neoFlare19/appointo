import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User, LoginCredentials, RegisterCredentials } from '../types';
import { authService } from '../services/authService';

// Extended interface for professional registration
interface ProfessionalRegisterCredentials extends RegisterCredentials {
  profession: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  registerClient: (credentials: RegisterCredentials) => Promise<void>;
  registerProfessional: (credentials: ProfessionalRegisterCredentials) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  token: string | null;  // ADDED THIS LINE
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const initializeAuth = async () => {
      const currentUser = authService.getCurrentUser();
      const token = authService.getToken();
      
      if (currentUser && token) {
        // Optional: Verify token with backend
        const isValid = await authService.verifyToken();
        if (isValid) {
          setUser(currentUser);
        } else {
          // Token is invalid, clear storage
          authService.logout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    try {
      const response = await authService.login(credentials);
      setUser(response.user);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const registerClient = async (credentials: RegisterCredentials) => {
    setLoading(true);
    try {
      const response = await authService.registerClient(credentials);
      setUser(response.user);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const registerProfessional = async (credentials: ProfessionalRegisterCredentials) => {
    setLoading(true);
    try {
      const response = await authService.registerProfessional(credentials);
      setUser(response.user);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    registerClient,
    registerProfessional,
    logout,
    isAuthenticated: !!user,
    token: authService.getToken()  // ADDED THIS LINE
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};