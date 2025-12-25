import { createContext, useState, useContext, useEffect } from 'react';
import { getStorageItem, setStorageItem, removeStorageItem } from '../utils';
import { STORAGE_KEYS } from '../constants';
import { authService } from '../services';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = getStorageItem(STORAGE_KEYS.AUTH_TOKEN);
    const userData = getStorageItem(STORAGE_KEYS.USER_DATA);

    if (token && userData) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
    }
    setLoading(false);
  };

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      
      // Store auth data
      setStorageItem(STORAGE_KEYS.AUTH_TOKEN, response.token);
      if (response.refreshToken) {
        setStorageItem(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken);
      }
      setStorageItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response.user));
      
      // Update state
      setUser(response.user);
      setIsAuthenticated(true);
      
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local data
      removeStorageItem(STORAGE_KEYS.AUTH_TOKEN);
      removeStorageItem(STORAGE_KEYS.REFRESH_TOKEN);
      removeStorageItem(STORAGE_KEYS.USER_DATA);
      
      // Update state
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    setStorageItem(STORAGE_KEYS.USER_DATA, JSON.stringify(updatedUser));
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;