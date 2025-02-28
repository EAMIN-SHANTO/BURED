import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  fullName?: string;
  position?: string;
  img?: string;
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
  API_URL: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  console.log('API URL:', API_URL);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Checking auth at:', `${API_URL}/api/auth/profile`);
        const res = await fetch(`${API_URL}/api/auth/profile`, {
          credentials: 'include',
        });
        
        if (!res.ok) {
          setUser(null);
          setLoading(false);
          return;
        }

        const data = await res.json();
        
        if (data.success) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [API_URL]);

  const login = (token: string) => {
    // Implementation of login
  };

  const logout = () => {
    // Implementation of logout
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout, API_URL }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 