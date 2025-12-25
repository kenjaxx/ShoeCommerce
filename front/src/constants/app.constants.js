/**
 * Application Constants
 * General application-wide constants
 */

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  CART_DATA: 'cart_data',
};

// App Info
export const APP_NAME = 'ShoeCommerce';
export const APP_VERSION = '1.0.0';

// Pagination
export const DEFAULT_PAGE_SIZE = 12;
export const PAGE_SIZE_OPTIONS = [12, 24, 48, 96];

// Product Categories
export const PRODUCT_CATEGORIES = [
  { id: 'sneakers', name: 'Sneakers', icon: '👟' },
  { id: 'boots', name: 'Boots', icon: '🥾' },
  { id: 'sandals', name: 'Sandals', icon: '🩴' },
  { id: 'formal', name: 'Formal Shoes', icon: '👞' },
  { id: 'sports', name: 'Sports Shoes', icon: '⚽' },
  { id: 'casual', name: 'Casual', icon: '👟' },
];

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

// User Roles
export const USER_ROLES = {
  BUYER: 'BUYER',
  SELLER: 'SELLER',
  ADMIN: 'ADMIN',
};

// Payment Methods
export const PAYMENT_METHODS = {
  COD: 'cod',
  GCASH: 'gcash',
  CARD: 'card',
  BANK: 'bank',
};