import { useState, useEffect } from 'react';
import productsData from '../data/products.json';

function Admin() {
  const [products, setProducts] = useState([]);
  const [updatedJson, setUpdatedJson] = useState('');

  useEffect(() => {
    setProducts(productsData);
    setUpdatedJson(JSON.stringify(productsData, null, 2));
  }, []);

  const handleProductChange = (e, productId) => {
    const { name, value } = e.target;
    const updatedProducts = products.map(p => {
      if (p.id === productId) {
        return { ...p, [name]: value };
      }
      return p;
    });
    setProducts(updatedProducts);
    setUpdatedJson(JSON.stringify(updatedProducts, null, 2));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(updatedJson);
    alert('JSON data copied to clipboard!');
  };

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin - Manage Products</h1>
      
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-8" role="alert">
        <p className="font-bold">Important Note</p>
        <p>
          To save your changes, you must manually copy the JSON data from the textarea below and paste it into the 
          <code>front/src/data/products.json</code> file on your server.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Edit Products</h2>
          <div className="space-y-4">
            {products.map(product => (
              <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                      type="number"
                      name="price"
                      value={product.price}
                      onChange={(e) => handleProductChange(e, product.id)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Stock</label>
                    <input
                      type="number"
                      name="stock"
                      value={product.stock}
                      onChange={(e) => handleProductChange(e, product.id)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Updated JSON Data</h2>
          <textarea
            readOnly
            value={updatedJson}
            className="w-full h-96 p-4 border border-gray-300 rounded-md bg-gray-50"
          ></textarea>
          <button
            onClick={copyToClipboard}
            className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium transition-colors"
          >
            Copy JSON
          </button>
        </div>
      </div>
    </div>
  );
}

export default Admin;