import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Components
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages - Public
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ProductList from './pages/Products/ProductList';
import ProductDetail from './pages/Products/ProductDetail';

// Pages - Buyer
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Profile from './pages/Profile';

// Pages - Seller
import SellerDashboard from './pages/Seller/Dashboard';
import SellerProducts from './pages/Seller/Products';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Routes with Layout */}
        <Route element={<Layout />}>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          
          {/* Protected Buyer Routes */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute requiredRole="BUYER">
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute requiredRole="BUYER">
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute requiredRole="BUYER">
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders/:id"
            element={
              <ProtectedRoute requiredRole="BUYER">
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          
          {/* Protected Seller Routes */}
          <Route
            path="/seller/dashboard"
            element={
              <ProtectedRoute requiredRole="SELLER">
                <SellerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/seller/products"
            element={
              <ProtectedRoute requiredRole="SELLER">
                <SellerProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/seller/products/add"
            element={
              <ProtectedRoute requiredRole="SELLER">
                <SellerProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/seller/products/edit/:id"
            element={
              <ProtectedRoute requiredRole="SELLER">
                <SellerProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/seller/orders"
            element={
              <ProtectedRoute requiredRole="SELLER">
                <Orders />
              </ProtectedRoute>
            }
          />
          
          {/* 404 Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;