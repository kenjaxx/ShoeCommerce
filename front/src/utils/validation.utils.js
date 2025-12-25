/**
 * Validation Utilities
 * Helper functions for form validation
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} - Validation result with isValid and errors
 */
export const validatePassword = (password) => {
  const errors = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validate phone number (Philippine format)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid
 */
export const isValidPhoneNumber = (phone) => {
  // Accepts formats: 09123456789, +639123456789, 9123456789
  const phoneRegex = /^(\+63|0)?9\d{9}$/;
  return phoneRegex.test(phone.replace(/\s|-/g, ''));
};

/**
 * Validate required field
 * @param {any} value - Value to validate
 * @returns {boolean} - True if not empty
 */
export const isRequired = (value) => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

/**
 * Validate minimum length
 * @param {string} value - Value to validate
 * @param {number} minLength - Minimum length
 * @returns {boolean} - True if meets minimum length
 */
export const hasMinLength = (value, minLength) => {
  return value.length >= minLength;
};

/**
 * Validate maximum length
 * @param {string} value - Value to validate
 * @param {number} maxLength - Maximum length
 * @returns {boolean} - True if within maximum length
 */
export const hasMaxLength = (value, maxLength) => {
  return value.length <= maxLength;
};

/**
 * Validate number range
 * @param {number} value - Value to validate
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {boolean} - True if within range
 */
export const isInRange = (value, min, max) => {
  return value >= min && value <= max;
};

/**
 * Validate postal code (Philippine format)
 * @param {string} postalCode - Postal code to validate
 * @returns {boolean} - True if valid
 */
export const isValidPostalCode = (postalCode) => {
  // Philippine postal codes are 4 digits
  const postalCodeRegex = /^\d{4}$/;
  return postalCodeRegex.test(postalCode);
};

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} - True if valid
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate credit card number (basic Luhn algorithm)
 * @param {string} cardNumber - Card number to validate
 * @returns {boolean} - True if valid
 */
export const isValidCardNumber = (cardNumber) => {
  const cleaned = cardNumber.replace(/\s|-/g, '');
  
  if (!/^\d+$/.test(cleaned)) return false;
  
  let sum = 0;
  let isEven = false;
  
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i]);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
};

/**
 * Validate form data
 * @param {object} data - Form data to validate
 * @param {object} rules - Validation rules
 * @returns {object} - Validation result with isValid and errors
 */
export const validateForm = (data, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const fieldRules = rules[field];
    const value = data[field];
    
    if (fieldRules.required && !isRequired(value)) {
      errors[field] = `${field} is required`;
      return;
    }
    
    if (fieldRules.email && !isValidEmail(value)) {
      errors[field] = 'Invalid email format';
      return;
    }
    
    if (fieldRules.minLength && !hasMinLength(value, fieldRules.minLength)) {
      errors[field] = `Must be at least ${fieldRules.minLength} characters`;
      return;
    }
    
    if (fieldRules.maxLength && !hasMaxLength(value, fieldRules.maxLength)) {
      errors[field] = `Must be no more than ${fieldRules.maxLength} characters`;
      return;
    }
    
    if (fieldRules.phone && !isValidPhoneNumber(value)) {
      errors[field] = 'Invalid phone number';
      return;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};