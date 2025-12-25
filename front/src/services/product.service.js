/**
 * Product Service
 * Handles all product-related API calls
 */

import { get, post, put, del } from './api.service.js';
import { API_ENDPOINTS } from '../constants';
import { buildQueryString } from '../utils';

/**
 * Get all products with pagination and filters
 */
export const getProducts = async (params = {}) => {
  const queryString = buildQueryString(params);
  const url = queryString ? `${API_ENDPOINTS.PRODUCTS.BASE}?${queryString}` : API_ENDPOINTS.PRODUCTS.BASE;
  return await get(url);
};

/**
 * Get single product by ID
 */
export const getProductById = async (id) => {
  return await get(API_ENDPOINTS.PRODUCTS.BY_ID(id));
};

/**
 * Search products
 */
export const searchProducts = async (query, filters = {}) => {
  const params = { q: query, ...filters };
  const queryString = buildQueryString(params);
  return await get(`${API_ENDPOINTS.PRODUCTS.SEARCH}?${queryString}`);
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
export const getProductsByCategory = async (categoryId, params = {}) => {
  const queryString = buildQueryString(params);
  const url = queryString 
    ? `${API_ENDPOINTS.PRODUCTS.BY_CATEGORY(categoryId)}?${queryString}` 
    : API_ENDPOINTS.PRODUCTS.BY_CATEGORY(categoryId);
  return await get(url);
};

/**
 * Create new product (Seller only)
 */
export const createProduct = async (productData) => {
  return await post(API_ENDPOINTS.SELLER.ADD_PRODUCT, productData);
};

/**
 * Update product (Seller only)
 */
export const updateProduct = async (id, productData) => {
  return await put(API_ENDPOINTS.SELLER.UPDATE_PRODUCT(id), productData);
};

/**
 * Delete product (Seller only)
 */
export const deleteProduct = async (id) => {
  return await del(API_ENDPOINTS.SELLER.DELETE_PRODUCT(id));
};

/**
 * Get seller's products
 */
export const getSellerProducts = async (params = {}) => {
  const queryString = buildQueryString(params);
  const url = queryString 
    ? `${API_ENDPOINTS.SELLER.PRODUCTS}?${queryString}` 
    : API_ENDPOINTS.SELLER.PRODUCTS;
  return await get(url);
};