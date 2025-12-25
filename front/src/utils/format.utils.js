/**
 * Format Utilities
 * Helper functions for formatting data
 */

/**
 * Format number as Philippine Peso currency
 * @param {number} amount - Amount to format
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
};

/**
 * Format number with thousand separators
 * @param {number} number - Number to format
 * @returns {string} - Formatted number string
 */
export const formatNumber = (number) => {
  return new Intl.NumberFormat('en-PH').format(number);
};

/**
 * Format date to readable string
 * @param {string|Date} date - Date to format
 * @param {string} format - Format type ('short', 'long', 'full')
 * @returns {string} - Formatted date string
 */
export const formatDate = (date, format = 'short') => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const options = {
    short: { year: 'numeric', month: 'short', day: 'numeric' },
    long: { year: 'numeric', month: 'long', day: 'numeric' },
    full: { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
  };
  
  return new Intl.DateTimeFormat('en-PH', options[format]).format(dateObj);
};

/**
 * Format date to relative time (e.g., "2 hours ago")
 * @param {string|Date} date - Date to format
 * @returns {string} - Relative time string
 */
export const formatRelativeTime = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now - dateObj) / 1000);
  
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  };
  
  for (const [unit, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / seconds);
    
    if (interval >= 1) {
      return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
    }
  }
  
  return 'just now';
};

/**
 * Format phone number to Philippine format
 * @param {string} phone - Phone number to format
 * @returns {string} - Formatted phone number
 */
export const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  
  // Format as: 0912 345 6789
  if (cleaned.length === 11 && cleaned.startsWith('0')) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }
  
  // Format as: +63 912 345 6789
  if (cleaned.length === 12 && cleaned.startsWith('63')) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
  }
  
  return phone;
};

/**
 * Format file size to human-readable string
 * @param {number} bytes - File size in bytes
 * @returns {string} - Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @param {string} suffix - Suffix to add (default: '...')
 * @returns {string} - Truncated text
 */
export const truncateText = (text, maxLength, suffix = '...') => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - suffix.length) + suffix;
};

/**
 * Format name to title case
 * @param {string} name - Name to format
 * @returns {string} - Title cased name
 */
export const formatName = (name) => {
  return name
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Format order ID
 * @param {number|string} id - Order ID
 * @returns {string} - Formatted order ID
 */
export const formatOrderId = (id) => {
  const year = new Date().getFullYear();
  return `ORD-${year}-${String(id).padStart(6, '0')}`;
};

/**
 * Format credit card number with masking
 * @param {string} cardNumber - Card number to format
 * @param {boolean} mask - Whether to mask digits
 * @returns {string} - Formatted card number
 */
export const formatCardNumber = (cardNumber, mask = true) => {
  const cleaned = cardNumber.replace(/\s/g, '');
  
  if (mask && cleaned.length === 16) {
    return `**** **** **** ${cleaned.slice(-4)}`;
  }
  
  return cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
};

/**
 * Format percentage
 * @param {number} value - Value to format as percentage
 * @param {number} decimals - Number of decimal places
 * @returns {string} - Formatted percentage
 */
export const formatPercentage = (value, decimals = 0) => {
  return `${value.toFixed(decimals)}%`;
};

/**
 * Format address
 * @param {object} address - Address object
 * @returns {string} - Formatted address
 */
export const formatAddress = (address) => {
  const parts = [
    address.address,
    address.city,
    address.province,
    address.postalCode
  ].filter(Boolean);
  
  return parts.join(', ');
};

/**
 * Slugify text
 * @param {string} text - Text to slugify
 * @returns {string} - Slugified text
 */
export const slugify = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};