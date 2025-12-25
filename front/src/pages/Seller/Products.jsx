import { useState, useEffect } from 'react';

function SellerProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, active, inactive

  useEffect(() => {
    loadProducts();
  }, [filter]);

  const loadProducts = async () => {
    try {
      // Mock data
      setProducts([
        {
          id: 1,
          name: 'Nike Air Max 270',
          brand: 'Nike',
          category: 'Sneakers',
          price: 7500,
          stock: 25,
          status: 'active',
          sales: 24,
          imageUrl: '/placeholder-shoe.jpg'
        },
        {
          id: 2,
          name: 'Adidas Ultraboost',
          brand: 'Adidas',
          category: 'Running',
          price: 8500,
          stock: 18,
          status: 'active',
          sales: 18,
          imageUrl: '/placeholder-shoe.jpg'
        },
        {
          id: 3,
          name: 'Puma RS-X',
          brand: 'Puma',
          category: 'Sneakers',
          price: 5500,
          stock: 0,
          status: 'inactive',
          sales: 15,
          imageUrl: '/placeholder-shoe.jpg'
        },
        {
          id: 4,
          name: 'New Balance 574',
          brand: 'New Balance',
          category: 'Casual',
          price: 4500,
          stock: 30,
          status: 'active',
          sales: 12,
          imageUrl: '/placeholder-shoe.jpg'
        }
      ]);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (productId) => {
    try {
      setProducts(products.map(p =>
        p.id === productId
          ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' }
          : p
      ));
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  const handleDelete = async (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      setProducts(products.filter(p => p.id !== productId));
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const filteredProducts = filter === 'all'
    ? products
    : products.filter(p => p.status === filter);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Products</h1>
            <p className="text-gray-600">{products.length} total products</p>
          </div>
          <a
            href="/seller/products/add"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            + Add Product
          </a>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({products.length})
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'active'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Active ({products.filter(p => p.status === 'active').length})
            </button>
            <button
              onClick={() => setFilter('inactive')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'inactive'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Inactive ({products.filter(p => p.status === 'inactive').length})
            </button>
          </div>
        </div>

        {/* Products Table */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">No products found</h2>
            <p className="text-gray-600 mb-6">Start adding products to your store</p>
            <a
              href="/seller/products/add"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Add Your First Product
            </a>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-gray-700">Product</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Category</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Price</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Stock</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Sales</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                    <th className="text-right py-3 px-6 text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{product.name}</h3>
                            <p className="text-sm text-gray-600">{product.brand}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {product.category}
                      </td>
                      <td className="py-4 px-4 text-sm font-semibold text-gray-900">
                        ₱{product.price.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-sm">
                        <span className={product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-orange-600' : 'text-red-600'}>
                          {product.stock} units
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {product.sales} sold
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleToggleStatus(product.id)}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            product.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {product.status === 'active' ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex justify-end gap-2">
                          <a
                            href={`/seller/products/edit/${product.id}`}
                            className="px-3 py-1 text-sm text-primary-600 hover:text-primary-700 font-medium"
                          >
                            Edit
                          </a>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="px-3 py-1 text-sm text-red-600 hover:text-red-700 font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Bulk Actions */}
        {filteredProducts.length > 0 && (
          <div className="mt-6 flex justify-between items-center">
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium">
                Export CSV
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium">
                Bulk Edit
              </button>
            </div>
            <p className="text-sm text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SellerProducts;