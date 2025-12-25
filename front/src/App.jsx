import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Components
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages - Public
import Login from './pages/Login';
import ProductList from './pages/Products/ProductList';
import Admin from './pages/Admin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        
        {/* Routes with Layout */}
        <Route element={<Layout />}>
          {/* Public */}
          <Route path="/" element={<ProductList />} />
          
          {/* Protected Seller Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="SELLER">
                <Admin />
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