import { useState, useEffect } from 'react';
import productsData from '../../data/products.json';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProducts(productsData);
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
                  {products.map((product) => (
                    <div
                      key={product.id}
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
                    </div>
                  ))}
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