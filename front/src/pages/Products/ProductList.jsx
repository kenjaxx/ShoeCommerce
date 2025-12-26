import { useState, useEffect } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load from localStorage if available, otherwise initialize with empty array
    const savedProducts = localStorage.getItem('shoeProducts');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts([]); // Initialize with empty array if no data in localStorage
      localStorage.setItem('shoeProducts', JSON.stringify([]));
    }
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
          <p className="text-gray-600">
            Showing {products.length} of {products.length} products
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Products Grid */}
          <main className="flex-1">
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
                  {products.map((product) => {
                    const discount = product.originalPrice
                      ? Math.round(
                          ((product.originalPrice - product.price) /
                            product.originalPrice) *
                            100
                        )
                      : 0;

                    return (
                      <div
                        key={product.id}
                        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all group"
                      >
                        {/* Product Image */}
                        <div className="relative aspect-square bg-gray-100 overflow-hidden">
                          <img
                            src={product.imageUrl || '/placeholder-shoe.jpg'}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            onError={(e) => {
                              e.target.src = '/placeholder-shoe.jpg';
                            }}
                          />

                          {/* Discount Badge */}
                          {discount > 0 && (
                            <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                              -{discount}%
                            </div>
                          )}

                          {/* Stock Badge */}
                          {product.stock === 0 && (
                            <div className="absolute top-3 left-3 bg-gray-900 text-white px-3 py-1 rounded-full text-sm font-bold">
                              Out of Stock
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="p-5">
                          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                            {product.brand}
                          </p>
                          <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">
                            {product.name}
                          </h3>

                          {/* Stock Level */}
                          {product.stock > 0 && product.stock < 10 && (
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                                Only {product.stock} left
                              </span>
                            </div>
                          )}

                          {/* Pricing */}
                          <div className="mb-4">
                            <div className="flex items-baseline gap-2">
                              <span className="text-2xl font-bold text-blue-600">
                                ₱{product.price.toLocaleString()}
                              </span>
                              {product.originalPrice && (
                                <span className="text-sm text-gray-400 line-through">
                                  ₱{product.originalPrice.toLocaleString()}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default ProductList;