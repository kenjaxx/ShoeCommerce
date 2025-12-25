import { useState, useEffect } from 'react';
import { getStorageItem, removeStorageItem } from '../utils';
import { STORAGE_KEYS } from '../constants';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // Load user from localStorage
    const userData = getStorageItem(STORAGE_KEYS.USER_DATA);
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    removeStorageItem(STORAGE_KEYS.AUTH_TOKEN);
    removeStorageItem(STORAGE_KEYS.REFRESH_TOKEN);
    removeStorageItem(STORAGE_KEYS.USER_DATA);
    window.location.href = '/';
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="text-2xl font-bold text-primary-600 flex items-center">
            <span className="mr-2">👟</span>
            ShoeCommerce
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              Home
            </a>
            <a href="/products" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              Products
            </a>
            {user?.role === 'SELLER' && (
              <a href="/seller/dashboard" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                Dashboard
              </a>
            )}
            <a href="#" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              Categories
            </a>
            <a href="#" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              Contact
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                {user.role === 'BUYER' && (
                  <a href="/cart" className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      0
                    </span>
                  </a>
                )}
                
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-semibold">
                        {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                      </span>
                    </div>
                    <span className="font-medium">{user.firstName}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isDropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsDropdownOpen(false)}
                      ></div>
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-20">
                        <a
                          href="/profile"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          My Profile
                        </a>
                        {user.role === 'BUYER' && (
                          <>
                            <a
                              href="/orders"
                              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                              My Orders
                            </a>
                            <a
                              href="/cart"
                              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                              Shopping Cart
                            </a>
                          </>
                        )}
                        {user.role === 'SELLER' && (
                          <>
                            <a
                              href="/seller/dashboard"
                              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                              Dashboard
                            </a>
                            <a
                              href="/seller/products"
                              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                              My Products
                            </a>
                            <a
                              href="/seller/orders"
                              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                              Orders
                            </a>
                          </>
                        )}
                        <hr className="my-2" />
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <a
                  href="/login"
                  className="px-4 py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium transition-colors"
                >
                  Sign Up
                </a>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-2">
              <a href="/" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                Home
              </a>
              <a href="/products" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                Products
              </a>
              {user?.role === 'SELLER' && (
                <a href="/seller/dashboard" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                  Dashboard
                </a>
              )}
              <a href="#" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                Categories
              </a>
              <a href="#" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                Contact
              </a>
              
              {user ? (
                <>
                  <hr className="my-2" />
                  <a href="/profile" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                    My Profile
                  </a>
                  {user.role === 'BUYER' && (
                    <>
                      <a href="/orders" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                        My Orders
                      </a>
                      <a href="/cart" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                        Shopping Cart
                      </a>
                    </>
                  )}
                  {user.role === 'SELLER' && (
                    <>
                      <a href="/seller/products" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                        My Products
                      </a>
                      <a href="/seller/orders" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                        Orders
                      </a>
                    </>
                  )}
                  <button
                    onClick={handleLogout}
                    className="text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <hr className="my-2" />
                  <a href="/login" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                    Login
                  </a>
                  <a href="/register" className="px-4 py-2 bg-primary-600 text-white hover:bg-primary-700 rounded mx-4">
                    Sign Up
                  </a>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;