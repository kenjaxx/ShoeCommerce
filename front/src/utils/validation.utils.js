/**
 * Validation Utilities
 * Common validation functions
 */

import { REGEX, VALIDATION_MESSAGES } from '../constants';

/**
 * Validate email format
 */
export const validateEmail = (email) => {
  if (!email || email.trim() === '') {
    return { isValid: false, message: VALIDATION_MESSAGES.REQUIRED };
  }
  
  if (!REGEX.EMAIL.test(email)) {
    return { isValid: false, message: VALIDATION_MESSAGES.INVALID_EMAIL };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Validate password strength
 */
export const validatePassword = (password) => {
  if (!password || password.trim() === '') {
    return { isValid: false, message: VALIDATION_MESSAGES.REQUIRED };
  }
  
  if (!REGEX.PASSWORD.test(password)) {
    return { isValid: false, message: VALIDATION_MESSAGES.INVALID_PASSWORD };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Validate password confirmation
 */
export const validatePasswordMatch = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return { isValid: false, message: VALIDATION_MESSAGES.PASSWORD_MISMATCH };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Validate phone number
 */
export const validatePhone = (phone) => {
  if (!phone || phone.trim() === '') {
    return { isValid: false, message: VALIDATION_MESSAGES.REQUIRED };
  }
  
  if (!REGEX.PHONE.test(phone)) {
    return { isValid: false, message: VALIDATION_MESSAGES.INVALID_PHONE };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Validate required field
 */
export const validateRequired = (value) => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return { isValid: false, message: VALIDATION_MESSAGES.REQUIRED };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Validate minimum length
 */
export const validateMinLength = (value, minLength) => {
  if (!value || value.length < minLength) {
    return { isValid: false, message: VALIDATION_MESSAGES.MIN_LENGTH(minLength) };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Validate maximum length
 */
export const validateMaxLength = (value, maxLength) => {
  if (value && value.length > maxLength) {
    return { isValid: false, message: VALIDATION_MESSAGES.MAX_LENGTH(maxLength) };
  }
  
  return { isValid: true, message: '' };
};