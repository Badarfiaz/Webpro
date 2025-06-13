import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from "./components/Navbar";
import ItemPreview from "./components/ItemPreview";
import Cart from "./components/cart";
import Login from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import { CartProvider } from "./components/CartState";
import Register from './components/Register';

function App() {
  return (
    <Router>
     <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/item/:category" element={<ItemPreview />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/register" element={<Register />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
