import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, University, Course, Level } from '../types';

interface AuthContextType {
  user: User | null;
  login: (name: string, email: string) => void;
  logout: () => void;
  updateProfile: (details: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage for persistent login
    const storedUser = localStorage.getItem('unipal_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user data");
        localStorage.removeItem('unipal_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (name: string, email: string) => {
    // Simulate login by creating a basic user object
    // In a real app, this would hit an API
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      hasCompletedOnboarding: false,
    };
    setUser(newUser);
    localStorage.setItem('unipal_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('unipal_user');
  };

  const updateProfile = (details: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...details };
      // If essential fields are filled, mark onboarding as complete
      if (updated.university && updated.course && updated.level) {
        updated.hasCompletedOnboarding = true;
      }
      localStorage.setItem('unipal_user', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};