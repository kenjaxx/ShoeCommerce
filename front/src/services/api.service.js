/**
 * API Service
 * Base HTTP client configuration using axios
 */

import axios from 'axios';
import { API_BASE_URL, API_TIMEOUT, STORAGE_KEYS } from '../constants';
import { getStorageItem, removeStorageItem } from '../utils';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor - Add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = getStorageItem(STORAGE_KEYS.AUTH_TOKEN);
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle common errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      const { status } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - clear auth data and redirect to login
          removeStorageItem(STORAGE_KEYS.AUTH_TOKEN);
          removeStorageItem(STORAGE_KEYS.REFRESH_TOKEN);
          removeStorageItem(STORAGE_KEYS.USER_DATA);
          window.location.href = '/login';
          break;
          
        case 403:
          // Forbidden - user doesn't have permission
          console.error('Access forbidden');
          break;
          
        case 404:
          // Not found
          console.error('Resource not found');
          break;
          
        case 500:
          // Server error
          console.error('Server error occurred');
          break;
          
        default:
          console.error('An error occurred:', error.response.data);
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('Network error - no response received');
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

/**
 * HTTP Methods
 */

/**
 * GET request
 */
export const get = async (url, config = {}) => {
  try {
    const response = await apiClient.get(url, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * POST request
 */
export const post = async (url, data = {}, config = {}) => {
  try {
    const response = await apiClient.post(url, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * PUT request
 */
export const put = async (url, data = {}, config = {}) => {
  try {
    const response = await apiClient.put(url, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * PATCH request
 */
export const patch = async (url, data = {}, config = {}) => {
  try {
    const response = await apiClient.patch(url, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * DELETE request
 */
export const del = async (url, config = {}) => {
  try {
    const response = await apiClient.delete(url, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Upload file(s)
 */
export const upload = async (url, formData, onUploadProgress = null) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    
    if (onUploadProgress) {
      config.onUploadProgress = onUploadProgress;
    }
    
    const response = await apiClient.post(url, formData, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default apiClient;