import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

export interface User {
  user_id: number;
  email: string;
  first_name: string
  surname: string
}

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => {}, 
    logout: () => Promise.resolve(),
  });
  

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    axios
      .get('https://be-exhibition-curation-platform.onrender.com/api/auth/me', { withCredentials: true })
      .then((response) => {
        setUser(response.data.user);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  const logout = (): Promise<void> => {
    return axios
      .post('https://be-exhibition-curation-platform.onrender.com/api/auth/logout', {}, { withCredentials: true })
      .then(() => {
        setUser(null);
        window.location.reload()
      })
      .catch((err) => {
        console.error('Logout failed:', err);
        return Promise.resolve();
      });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
