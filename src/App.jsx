import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import ItemPreview from "./components/ItemPreview";
import Login from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import Register from './components/Register';
import Checkout from './pages/Checkout';

import { CartProvider } from "./components/CartState";
import { AuthProvider } from "./components/AuthContext"; // If not already added
import Cart from './components/cart';

function App() {
  return (
    <Router>
      <AuthProvider> {/* Ensures user auth is available globally */}
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/item/:category" element={<ItemPreview />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
