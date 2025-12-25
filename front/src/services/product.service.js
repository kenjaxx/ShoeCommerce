/**
 * Product Service
 * Handles all product-related API calls
 */

import { get, post, put, del } from './api.service.js';
import { API_ENDPOINTS } from '../constants';

/**
 * Get all products with filters and pagination
 */
export const getProducts = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  return await get(`${API_ENDPOINTS.PRODUCTS.BASE}${queryString ? '?' + queryString : ''}`);
};

/**
 * Get product by ID
 */
export const getProductById = async (id) => {
  return await get(API_ENDPOINTS.PRODUCTS.BY_ID(id));
};

/**
 * Get all product categories
 */
export const getCategories = async () => {
  return await get(API_ENDPOINTS.PRODUCTS.CATEGORIES);
};

/**
 * Get products by category
 */
export const getProductsByCategory = async (categoryId) => {
  return await get(API_ENDPOINTS.PRODUCTS.BY_CATEGORY(categoryId));
};

/**
 * Search products
 */
export const searchProducts = async (query) => {
  return await get(`${API_ENDPOINTS.PRODUCTS.SEARCH}?q=${encodeURIComponent(query)}`);
};

/**
 * Get featured products
 */
export const getFeaturedProducts = async () => {
  return await get(`${API_ENDPOINTS.PRODUCTS.BASE}?featured=true&limit=8`);
};

/**
 * Create new product (Seller)
 */
export const createProduct = async (productData) => {
  return await post(API_ENDPOINTS.SELLER.ADD_PRODUCT, productData);
};

/**
 * Update product (Seller)
 */
export const updateProduct = async (id, productData) => {
  return await put(API_ENDPOINTS.SELLER.UPDATE_PRODUCT(id), productData);
};

/**
 * Delete product (Seller)
 */
export const deleteProduct = async (id) => {
  return await del(API_ENDPOINTS.SELLER.DELETE_PRODUCT(id));
};

/**
 * Get seller's products
 */
export const getSellerProducts = async () => {
  return await get(API_ENDPOINTS.SELLER.PRODUCTS);
};