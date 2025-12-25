/**
 * API Configuration Constants
 * Centralized configuration for all API endpoints
 */

// Base API URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
     LOGIN: '/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh',
    VERIFY_EMAIL: '/auth/verify-email',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },

  // Products
  PRODUCTS: {
    BASE: '/products',
    BY_ID: (id) => `/products/${id}`,
    SEARCH: '/products/search',
    CATEGORIES: '/products/categories',
    BY_CATEGORY: (categoryId) => `/products/category/${categoryId}`,
  },

  // Cart
  CART: {
    BASE: '/cart',
    ADD_ITEM: '/cart/items',
    UPDATE_ITEM: (itemId) => `/cart/items/${itemId}`,
    REMOVE_ITEM: (itemId) => `/cart/items/${itemId}`,
    CLEAR: '/cart/clear',
  },

  // Orders
  ORDERS: {
    BASE: '/orders',
    BY_ID: (id) => `/orders/${id}`,
    USER_ORDERS: '/orders/user',
    SELLER_ORDERS: '/orders/seller',
    UPDATE_STATUS: (id) => `/orders/${id}/status`,
  },

  // User Profile
  USER: {
    PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/profile',
    ADDRESSES: '/user/addresses',
    ADD_ADDRESS: '/user/addresses',
    UPDATE_ADDRESS: (id) => `/user/addresses/${id}`,
    DELETE_ADDRESS: (id) => `/user/addresses/${id}`,
  },

  // Seller
  SELLER: {
    DASHBOARD: '/seller/dashboard',
    PRODUCTS: '/seller/products',
    ADD_PRODUCT: '/seller/products',
    UPDATE_PRODUCT: (id) => `/seller/products/${id}`,
    DELETE_PRODUCT: (id) => `/seller/products/${id}`,
    ORDERS: '/seller/orders',
    STATISTICS: '/seller/statistics',
  },

  // Payment
  PAYMENT: {
    CREATE_INTENT: '/payment/create-intent',
    CONFIRM: '/payment/confirm',
    WEBHOOK: '/payment/webhook',
  },
};

// API Request Timeout
export const API_TIMEOUT = 30000; // 30 seconds

// API Headers
export const API_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};