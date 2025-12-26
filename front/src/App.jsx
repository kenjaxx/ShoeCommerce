import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Components
import Layout from './components/Layout';

// Pages
import AdminLogin from './pages/AdminLogin'; // Import the new AdminLogin component
import ProductList from './pages/Products/ProductList';
import Admin from './pages/Admin';

// A simple client-side ProtectedRoute
const ProtectedRoute = ({ children }) => {
  const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');
  if (!isAdminLoggedIn) {
    return <Navigate to="/admin-login" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Login Route (outside layout) */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Routes with Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<ProductList />} />
          
          {/* Protected Admin Route */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
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