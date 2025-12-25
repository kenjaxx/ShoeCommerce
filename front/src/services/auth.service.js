/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

import { get, post } from './api.service.js';
import { API_ENDPOINTS } from '../constants';

/**
 * User login
 */
export const login = async (credentials) => {
  return await post(API_ENDPOINTS.AUTH.LOGIN, credentials);
};

/**
 * User registration
 */
export const register = async (userData) => {
  return await post(API_ENDPOINTS.AUTH.REGISTER, userData);
};

/**
 * User logout
 */
export const logout = async () => {
  return await post(API_ENDPOINTS.AUTH.LOGOUT);
};

/**
 * Refresh authentication token
 */
export const refreshToken = async (refreshToken) => {
  return await post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, { refreshToken });
};

/**
 * Verify email address
 */
export const verifyEmail = async (token) => {
  return await post(API_ENDPOINTS.AUTH.VERIFY_EMAIL, { token });
};

/**
 * Request password reset
 */
export const forgotPassword = async (email) => {
  return await post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
};

/**
 * Reset password with token
 */
export const resetPassword = async (data) => {
  return await post(API_ENDPOINTS.AUTH.RESET_PASSWORD, data);
};