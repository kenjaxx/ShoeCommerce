/**
 * Route Constants
 * Centralized routing paths for the application
 */

// Public Routes
export const PUBLIC_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  VERIFY_EMAIL: '/verify-email',
};

// Product Routes
export const PRODUCT_ROUTES = {
  LIST: '/products',
  DETAIL: (id) => `/products/${id}`,
  CATEGORY: (category) => `/products/category/${category}`,
  SEARCH: '/products/search',
};

// Buyer Routes
export const BUYER_ROUTES = {
  CART: '/cart',
  CHECKOUT: '/checkout',
  ORDERS: '/orders',
  ORDER_DETAIL: (id) => `/orders/${id}`,
  PROFILE: '/profile',
  ADDRESSES: '/profile/addresses',
  WISHLIST: '/wishlist',
};

// Seller Routes
export const SELLER_ROUTES = {
  DASHBOARD: '/seller/dashboard',
  PRODUCTS: '/seller/products',
  ADD_PRODUCT: '/seller/products/add',
  EDIT_PRODUCT: (id) => `/seller/products/edit/${id}`,
  ORDERS: '/seller/orders',
  ORDER_DETAIL: (id) => `/seller/orders/${id}`,
  STATISTICS: '/seller/statistics',
  PROFILE: '/seller/profile',
};

// Admin Routes (for future use)
export const ADMIN_ROUTES = {
  DASHBOARD: '/admin/dashboard',
  USERS: '/admin/users',
  PRODUCTS: '/admin/products',
  ORDERS: '/admin/orders',
  SETTINGS: '/admin/settings',
};

// Error Routes
export const ERROR_ROUTES = {
  NOT_FOUND: '/404',
  UNAUTHORIZED: '/401',
  SERVER_ERROR: '/500',
};

// All Routes Combined
export const ROUTES = {
  ...PUBLIC_ROUTES,
  PRODUCTS: PRODUCT_ROUTES,
  BUYER: BUYER_ROUTES,
  SELLER: SELLER_ROUTES,
  ADMIN: ADMIN_ROUTES,
  ERROR: ERROR_ROUTES,
};

// Protected Routes
export const PROTECTED_ROUTES = [
  BUYER_ROUTES.CART,
  BUYER_ROUTES.CHECKOUT,
  BUYER_ROUTES.ORDERS,
  BUYER_ROUTES.PROFILE,
  BUYER_ROUTES.WISHLIST,
  SELLER_ROUTES.DASHBOARD,
  SELLER_ROUTES.PRODUCTS,
  SELLER_ROUTES.ORDERS,
  SELLER_ROUTES.STATISTICS,
];

// Seller Only Routes
export const SELLER_ONLY_ROUTES = [
  SELLER_ROUTES.DASHBOARD,
  SELLER_ROUTES.PRODUCTS,
  SELLER_ROUTES.ADD_PRODUCT,
  SELLER_ROUTES.ORDERS,
  SELLER_ROUTES.STATISTICS,
];

// Buyer Only Routes
export const BUYER_ONLY_ROUTES = [
  BUYER_ROUTES.CART,
  BUYER_ROUTES.CHECKOUT,
  BUYER_ROUTES.WISHLIST,
];