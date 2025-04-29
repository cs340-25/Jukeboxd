import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the context
const AuthContext = createContext(null);

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    checkLoginState();
    setLoading(false);
  }, []);

  // Function to check login state from localStorage
  const checkLoginState = () => {
    const loginState = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loginState);
    
    if (loginState) {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        setUser(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
        // Handle invalid user data by logging out
        logout();
      }
    } else {
      setUser(null);
    }
  };

  // Login function
  const login = (userData) => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
    setIsLoggedIn(true);
    setUser(userData);
  };

  // Register function (same as login for demo)
  const register = (userData) => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
    setIsLoggedIn(true);
    setUser(userData);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
  };

  // Context value
  const value = {
    isLoggedIn,
    user,
    loading,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 