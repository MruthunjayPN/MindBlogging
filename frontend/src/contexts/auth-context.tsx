import { createContext, useState, useEffect, useContext } from 'react';
import { authApi } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import type { User, AuthResponse } from '@/types/api';

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const updateUser = (updatedUser: User): void => {
    setUser(updatedUser);
  };

  const verifyToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await authApi.verifyToken();
      setUser(response.data.user);
    } catch (error) {
      localStorage.removeItem('token');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await authApi.signin({ email, password });
      const { token, user } = response.data as AuthResponse;
      localStorage.setItem('token', token);
      setUser(user);
      toast({
        title: "Success",
        description: "Logged in successfully",
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to login";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await authApi.signup({ email, password, name });
      const { token, user } = response.data as AuthResponse;
      localStorage.setItem('token', token);
      setUser(user);
      toast({
        title: "Success",
        description: "Account created successfully",
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to register";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    setIsLoading(true);
    localStorage.removeItem('token');
    setUser(null);
    setIsLoading(false);
    toast({
      title: "Success",
      description: "Logged out successfully",
    });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 
