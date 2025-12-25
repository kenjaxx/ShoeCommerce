import { useState, useEffect } from 'react';
import { productService } from '../../services/product.service.js';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    search: '',
    sort: 'newest'
  });
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalItems: 0
  });

  useEffect(() => {
    loadProducts();
  }, [filters, pagination.page]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const params = {
        ...filters,
        page: pagination.page,
        size: 12
      };
      
      const response = await productService.getProducts(params);
      setProducts(response.content);
      setPagination({
        page: response.page,
        totalPages: response.totalPages,
        totalItems: response.totalElements
      });
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
    setPagination({ ...pagination, page: 1 });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadProducts();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
          <p className="text-gray-600">
            Showing {products.length} of {pagination.totalItems} products
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              
              {/* Search */}
              <form onSubmit={handleSearch} className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <input
                  type="text"
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  placeholder="Search products..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
              </form>

              {/* Category */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">All Categories</option>
                  <option value="sneakers">Sneakers</option>
                  <option value="boots">Boots</option>
                  <option value="sandals">Sandals</option>
                  <option value="formal">Formal Shoes</option>
                  <option value="sports">Sports Shoes</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    placeholder="Min"
                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                  <input
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    placeholder="Max"
                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => setFilters({
                  category: '',
                  minPrice: '',
                  maxPrice: '',
                  search: '',
                  sort: 'newest'
                })}
                className="w-full px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {/* Sort */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-gray-600">
                {loading ? 'Loading...' : `${products.length} products`}
              </div>
              <select
                name="sort"
                value={filters.sort}
                onChange={handleFilterChange}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="newest">Newest First</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

            {/* Products */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-96"></div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <a
                      key={product.id}
                      href={`/products/${product.id}`}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="aspect-square bg-gray-100">
                        <img
                          src={product.imageUrl || '/placeholder-shoe.jpg'}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-1 truncate">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2 truncate">
                          {product.brand}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-primary-600">
                            ₱{product.price.toLocaleString()}
                          </span>
                          {product.rating && (
                            <div className="flex items-center text-sm">
                              <span className="text-yellow-400 mr-1">★</span>
                              <span className="text-gray-600">{product.rating}</span>
                            </div>
                          )}
                        </div>
                        {product.stock < 10 && product.stock > 0 && (
                          <p className="text-xs text-orange-600 mt-2">
                            Only {product.stock} left in stock
                          </p>
                        )}
                        {product.stock === 0 && (
                          <p className="text-xs text-red-600 mt-2">Out of stock</p>
                        )}
                      </div>
                    </a>
                  ))}
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-8">
                    <button
                      onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                      disabled={pagination.page === 1}
                      className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Previous
                    </button>
                    
                    <span className="px-4 py-2 text-gray-700">
                      Page {pagination.page} of {pagination.totalPages}
                    </span>
                    
                    <button
                      onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                      disabled={pagination.page === pagination.totalPages}
                      className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default ProductList;