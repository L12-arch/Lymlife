import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the shape of the AuthContext
interface AuthContextType {
  isAuthenticated: boolean;
  userData: any | null;
  login: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

// Create the AuthContext with default undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * AuthProvider Component
 * @param children
 * @returns Provides authentication context to its children.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  async function checkAuthStatus() {
    try {
      const storedEmail = await AsyncStorage.getItem('id');
      const storedUserData = await AsyncStorage.getItem('userData');

      if (storedEmail && storedUserData) {
        setIsAuthenticated(true);
        setUserData(JSON.parse(storedUserData));
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setLoading(false);
    }
  }

  async function login(userData: any) {
    try {
      setIsAuthenticated(true);
      setUserData(userData);
      // Store user data in AsyncStorage for persistence
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async function logout() {
    try {
      setIsAuthenticated(false);
      setUserData(null);
      await AsyncStorage.removeItem('id');
      await AsyncStorage.removeItem('userData');
      await AsyncStorage.removeItem('token');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userData, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * useAuth Hook
 * @returns Custom hook to access authentication context.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
