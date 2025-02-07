
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// Define the shape of a User object (customize as needed)
export interface User {
  user_id: number;
  email: string;
  first_name: string
  surname: string
  // add any other fields as needed
}

// Define the context type
export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

// Create the context (initially undefined)
export const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => {}, // Provide a dummy function as a default
    logout: () => Promise.resolve(),
  });
  

// AuthProvider component that wraps your app and provides auth state
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
//   const navigate = useNavigate();

  // On mount, attempt to fetch the current user from the backend.
  // If you have a /me endpoint, use it; otherwise, you can choose not to do this.
  useEffect(() => {
    axios
      .get('https://be-exhibition-curation-platform.onrender.com/api/auth/me', { withCredentials: true })
      .then((response) => {
        // Assuming the backend returns an object like: { user: { id: "...", email: "..." } }
        setUser(response.data.user);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  // Logout function: calls the backend logout endpoint and updates auth state
  const logout = (): Promise<void> => {
    return axios
      .post('https://be-exhibition-curation-platform.onrender.com/api/auth/logout', {}, { withCredentials: true })
      .then(() => {
        setUser(null);
        // navigate('/login');
        window.location.reload()
      })
      .catch((err) => {
        console.error('Logout failed:', err);
        // Even if logout fails, resolve the promise so the app can continue.
        return Promise.resolve();
      });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easier usage of the auth context
export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
