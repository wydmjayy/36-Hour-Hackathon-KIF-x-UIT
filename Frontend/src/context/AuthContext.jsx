import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('auth_user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setIsInitialized(true);
  }, []);

  // Login function
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call with 2 second delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Validate inputs
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // Mock JWT token generation
      const mockToken = `jwt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const userData = {
        id: `user_${Date.now()}`,
        email,
        name: email.split('@')[0],
      };

      // Store in localStorage
      localStorage.setItem('auth_token', mockToken);
      localStorage.setItem('auth_user', JSON.stringify(userData));

      // Update state
      setToken(mockToken);
      setUser(userData);
      setIsAuthenticated(true);
      setError(null);

      return { success: true, user: userData };
    } catch (err) {
      const errorMessage = err.message || 'Login failed. Please try again.';
      setError(errorMessage);
      setIsAuthenticated(false);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Signup function
  const signup = async (name, email, password, confirmPassword) => {
    setIsLoading(true);
    setError(null);

    try {
      // Validate inputs
      if (!name || !email || !password || !confirmPassword) {
        throw new Error('All fields are required');
      }

      if (name.length < 2) {
        throw new Error('Name must be at least 2 characters');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Simulate API call with 2 second delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock JWT token generation
      const mockToken = `jwt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const userData = {
        id: `user_${Date.now()}`,
        email,
        name,
      };

      // Store in localStorage
      localStorage.setItem('auth_token', mockToken);
      localStorage.setItem('auth_user', JSON.stringify(userData));

      // Update state
      setToken(mockToken);
      setUser(userData);
      setIsAuthenticated(true);
      setError(null);

      return { success: true, user: userData };
    } catch (err) {
      const errorMessage = err.message || 'Signup failed. Please try again.';
      setError(errorMessage);
      setIsAuthenticated(false);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Google login function (mocked)
  const loginWithGoogle = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate Google OAuth delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock successful Google login
      const mockToken = `jwt_google_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const userData = {
        id: `google_user_${Date.now()}`,
        email: `user${Math.random().toString(36).substr(2, 5)}@gmail.com`,
        name: 'Google User',
        provider: 'google',
      };

      // Store in localStorage
      localStorage.setItem('auth_token', mockToken);
      localStorage.setItem('auth_user', JSON.stringify(userData));

      // Update state
      setToken(mockToken);
      setUser(userData);
      setIsAuthenticated(true);
      setError(null);

      return { success: true, user: userData };
    } catch (err) {
      const errorMessage = 'Google login failed. Please try again.';
      setError(errorMessage);
      setIsAuthenticated(false);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    isInitialized,
    login,
    signup,
    logout,
    loginWithGoogle,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
