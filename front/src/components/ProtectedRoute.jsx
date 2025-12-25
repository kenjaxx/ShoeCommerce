import { useEffect, useState } from 'react';
import { getStorageItem } from '../utils';
import { STORAGE_KEYS } from '../constants';

function ProtectedRoute({ children, requiredRole = null }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = getStorageItem(STORAGE_KEYS.AUTH_TOKEN);
    const userDataStr = getStorageItem(STORAGE_KEYS.USER_DATA);

    if (!token) {
      // Not logged in, redirect to login
      window.location.href = '/login';
      return;
    }

    if (requiredRole && userDataStr) {
      const userData = JSON.parse(userDataStr);
      
      if (userData.role !== requiredRole) {
        // User doesn't have required role
        if (userData.role === 'SELLER') {
          window.location.href = '/seller/dashboard';
        } else {
          window.location.href = '/';
        }
        return;
      }
    }

    setIsAuthorized(true);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return children;
}

export default ProtectedRoute;