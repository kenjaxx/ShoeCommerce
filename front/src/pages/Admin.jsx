import { useState, useEffect } from 'react';

function Admin() {
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    originalPrice: '',
    stock: '',
    imageUrl: '',
    category: 'sneakers',
    description: '',
    sizes: []
  });
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    // Load from localStorage if available, otherwise initialize with empty array
    const savedProducts = localStorage.getItem('shoeProducts');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts([]); // Initialize with empty array if no data in localStorage
      localStorage.setItem('shoeProducts', JSON.stringify([]));
    }
  }, []);

  const saveProducts = (updatedProducts) => {
    setProducts(updatedProducts);
    localStorage.setItem('shoeProducts', JSON.stringify(updatedProducts));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Update image preview
    if (name === 'imageUrl') {
      setImagePreview(value);
    }
  };

  const handleSizeToggle = (size) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      brand: '',
      price: '',
      originalPrice: '',
      stock: '',
      imageUrl: '',
      category: 'sneakers',
      description: '',
      sizes: []
    });
    setImagePreview('');
    setEditingProduct(null);
    setShowAddForm(false);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    
    const newProduct = {
      id: Date.now(),
      ...formData,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
      stock: parseInt(formData.stock)
    };

    const updatedProducts = [...products, newProduct];
    saveProducts(updatedProducts);
    resetForm();
    alert('Product added successfully!');
  };

  const handleEditProduct = (e) => {
    e.preventDefault();
    
    const updatedProducts = products.map(p => 
      p.id === editingProduct.id 
        ? {
            ...formData,
            id: editingProduct.id,
            price: parseFloat(formData.price),
            originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
            stock: parseInt(formData.stock)
          }
        : p
    );

    saveProducts(updatedProducts);
    resetForm();
    alert('Product updated successfully!');
  };

  const handleDelete = (productId) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(p => p.id !== productId);
      saveProducts(updatedProducts);
      alert('Product deleted successfully!');
    }
  };

  const startEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      brand: product.brand || '',
      price: product.price || '',
      originalPrice: product.originalPrice || '',
      stock: product.stock || '',
      imageUrl: product.imageUrl || '',
      category: product.category || 'sneakers',
      description: product.description || '',
      sizes: product.sizes || []
    });
    setImagePreview(product.imageUrl || '');
    setShowAddForm(true);
  };

  const calculateDiscount = (original, current) => {
    if (!original || !current) return 0;
    return Math.round(((original - current) / original) * 100);
  };

  const availableSizes = ['6', '7', '8', '9', '10', '11', '12'];
  const categories = [
    { id: 'sneakers', name: 'Sneakers' },
    { id: 'boots', name: 'Boots' },
    { id: 'sandals', name: 'Sandals' },
    { id: 'formal', name: 'Formal Shoes' },
    { id: 'sports', name: 'Sports Shoes' },
    { id: 'casual', name: 'Casual' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Product Management</h1>
              <p className="text-gray-600">Manage your shoe inventory</p>
            </div>
            <button
              onClick={() => {
                resetForm();
                setShowAddForm(!showAddForm);
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow-lg transition-all"
            >
              {showAddForm ? '← Back to Products' : '+ Add New Product'}
            </button>
          </div>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            
            <form onSubmit={editingProduct ? handleEditProduct : handleAddProduct}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Product Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nike Air Max 270"
                    />
                  </div>

                  {/* Brand */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Brand *
                    </label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nike"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Pricing */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Current Price (₱) *
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                        step="0.01"
                        min="0"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="1200.00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Original Price (₱)
                        <span className="text-gray-400 text-xs ml-1">(for discount)</span>
                      </label>
                      <input
                        type="number"
                        name="originalPrice"
                        value={formData.originalPrice}
                        onChange={handleInputChange}
                        step="0.01"
                        min="0"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="1500.00"
                      />
                    </div>
                  </div>

                  {/* Stock */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Stock Quantity *
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="50"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Image URL */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Image URL *
                    </label>
                    <input
                      type="url"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://example.com/image.jpg"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Tip: Upload to Imgur or use a direct image link
                    </p>
                  </div>

                  {/* Image Preview */}
                  {imagePreview && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Preview
                      </label>
                      <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = '/placeholder-shoe.jpg';
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Available Sizes */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Available Sizes
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {availableSizes.map(size => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => handleSizeToggle(size)}
                          className={`px-4 py-2 rounded-lg border-2 transition-all ${
                            formData.sizes.includes(size)
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Product description..."
                    />
                  </div>
                </div>
              </div>

              {/* Discount Preview */}
              {formData.originalPrice && formData.price && parseFloat(formData.originalPrice) > parseFloat(formData.price) && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-semibold">
                    💰 Discount: {calculateDiscount(parseFloat(formData.originalPrice), parseFloat(formData.price))}% OFF
                  </p>
                  <p className="text-sm text-green-600 mt-1">
                    Savings: ₱{(parseFloat(formData.originalPrice) - parseFloat(formData.price)).toFixed(2)}
                  </p>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex gap-4 mt-8">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-all shadow-lg"
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Products Grid */}
        {!showAddForm && (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                Total Products: <span className="font-semibold text-gray-900">{products.length}</span>
              </p>
            </div>

            {products.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <div className="text-6xl mb-4">👟</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products yet</h3>
                <p className="text-gray-600 mb-6">Add your first shoe product to get started!</p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                >
                  Add First Product
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => {
                  const discount = product.originalPrice 
                    ? calculateDiscount(product.originalPrice, product.price)
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

                        {/* Category */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            {categories.find(c => c.id === product.category)?.name || product.category}
                          </span>
                          {product.stock < 10 && product.stock > 0 && (
                            <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                              Only {product.stock} left
                            </span>
                          )}
                        </div>

                        {/* Sizes */}
                        {product.sizes && product.sizes.length > 0 && (
                          <div className="mb-3">
                            <p className="text-xs text-gray-500 mb-1">Sizes:</p>
                            <div className="flex flex-wrap gap-1">
                              {product.sizes.slice(0, 5).map(size => (
                                <span key={size} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                  {size}
                                </span>
                              ))}
                              {product.sizes.length > 5 && (
                                <span className="text-xs text-gray-500">+{product.sizes.length - 5}</span>
                              )}
                            </div>
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

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEdit(product)}
                            className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 font-semibold transition-all"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-semibold transition-all"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Admin;