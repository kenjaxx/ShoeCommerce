import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAdminLoggedIn(localStorage.getItem('isAdminLoggedIn') === 'true');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    setIsAdminLoggedIn(false);
    navigate('/');
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
            <a href="/admin" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              Admin
            </a>
            {isAdminLoggedIn && (
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-red-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
              >
                Logout
              </button>
            )}
          </nav>

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
              <a href="/admin" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                Admin
              </a>
              {isAdminLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded"
                >
                  Logout
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;