/**
 * Storage Utilities
 * Helper functions for localStorage operations
 */

/**
 * Get item from localStorage
 * @param {string} key - Storage key
 * @returns {string|null} - Stored value or null
 */
export const getStorageItem = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error('Error getting storage item:', error);
    return null;
  }
};

/**
 * Set item in localStorage
 * @param {string} key - Storage key
 * @param {string} value - Value to store
 */
export const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error('Error setting storage item:', error);
  }
};

/**
 * Remove item from localStorage
 * @param {string} key - Storage key
 */
export const removeStorageItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing storage item:', error);
  }
};

/**
 * Clear all items from localStorage
 */
export const clearStorage = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing storage:', error);
  }
};

/**
 * Get item from sessionStorage
 * @param {string} key - Storage key
 * @returns {string|null} - Stored value or null
 */
export const getSessionItem = (key) => {
  try {
    return sessionStorage.getItem(key);
  } catch (error) {
    console.error('Error getting session item:', error);
    return null;
  }
};

/**
 * Set item in sessionStorage
 * @param {string} key - Storage key
 * @param {string} value - Value to store
 */
export const setSessionItem = (key, value) => {
  try {
    sessionStorage.setItem(key, value);
  } catch (error) {
    console.error('Error setting session item:', error);
  }
};

/**
 * Remove item from sessionStorage
 * @param {string} key - Storage key
 */
export const removeSessionItem = (key) => {
  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing session item:', error);
  }
};