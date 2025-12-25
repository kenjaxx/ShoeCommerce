/**
 * Main App Component
 * Root component of the application
 */

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            <div className="text-2xl font-bold text-primary-600">
              👟 ShoeCommerce
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-primary-600 transition-colors">Home</a>
              <a href="#" className="text-gray-700 hover:text-primary-600 transition-colors">Products</a>
              <a href="#" className="text-gray-700 hover:text-primary-600 transition-colors">Categories</a>
              <a href="#" className="text-gray-700 hover:text-primary-600 transition-colors">Contact</a>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="btn-outline px-4 py-2 text-sm">Login</button>
              <button className="btn-primary px-4 py-2 text-sm">Sign Up</button>
            </div>
            {/* Mobile menu button */}
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container-custom section-spacing">
        <div className="text-center slide-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Welcome to ShoeCommerce
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your one-stop shop for the best shoes. Browse our collection and find your perfect fit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              Shop Now
            </button>
            <button className="btn-secondary">
              Become a Seller
            </button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="card-hover p-6 text-center fade-in">
            <div className="text-5xl mb-4">👟</div>
            <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
            <p className="text-gray-600">
              Thousands of shoes from top brands and independent sellers
            </p>
          </div>
          
          <div className="card-hover p-6 text-center fade-in" style={{animationDelay: '0.1s'}}>
            <div className="text-5xl mb-4">🚚</div>
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">
              Quick shipping and reliable delivery to your doorstep
            </p>
          </div>
          
          <div className="card-hover p-6 text-center fade-in" style={{animationDelay: '0.2s'}}>
            <div className="text-5xl mb-4">💳</div>
            <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
            <p className="text-gray-600">
              Safe and secure payment options for your peace of mind
            </p>
          </div>
        </div>

        {/* Sample Product Grid */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Product Card 1 */}
            <div className="card-hover">
              <div className="aspect-square bg-gray-200 flex items-center justify-center">
                <span className="text-6xl">👟</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">Running Shoes</h3>
                <p className="text-gray-600 text-sm mb-3">Comfortable and lightweight</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary-600">₱2,499</span>
                  <button className="btn-primary px-4 py-2 text-sm">Add to Cart</button>
                </div>
              </div>
            </div>

            {/* Product Card 2 */}
            <div className="card-hover">
              <div className="aspect-square bg-gray-200 flex items-center justify-center">
                <span className="text-6xl">👞</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">Formal Shoes</h3>
                <p className="text-gray-600 text-sm mb-3">Perfect for business meetings</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary-600">₱3,999</span>
                  <button className="btn-primary px-4 py-2 text-sm">Add to Cart</button>
                </div>
              </div>
            </div>

            {/* Product Card 3 */}
            <div className="card-hover">
              <div className="aspect-square bg-gray-200 flex items-center justify-center">
                <span className="text-6xl">👟</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">Sneakers</h3>
                <p className="text-gray-600 text-sm mb-3">Stylish everyday wear</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary-600">₱1,899</span>
                  <button className="btn-primary px-4 py-2 text-sm">Add to Cart</button>
                </div>
              </div>
            </div>

            {/* Product Card 4 */}
            <div className="card-hover">
              <div className="aspect-square bg-gray-200 flex items-center justify-center">
                <span className="text-6xl">🥾</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">Boots</h3>
                <p className="text-gray-600 text-sm mb-3">Durable and rugged</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary-600">₱4,599</span>
                  <button className="btn-primary px-4 py-2 text-sm">Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Badges Demo */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Order Status Examples</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            <span className="badge-success">Delivered</span>
            <span className="badge-primary">Processing</span>
            <span className="badge-warning">Pending</span>
            <span className="badge-danger">Cancelled</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-20">
        <div className="container-custom py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-gray-400 text-sm">
                Your trusted shoe marketplace connecting buyers with quality sellers.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Products</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Categories</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sellers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Refund Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2024 ShoeCommerce Philippines. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;