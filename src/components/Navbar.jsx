import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-[#1A1A1A] p-4 sticky top-0 z-50 border-b border-[#333]">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo (Replace with your logo) */}
        <Link 
          to="/" 
          className="text-2xl font-bold text-white hover:text-[#00F5FF] transition-colors"
        >
          NEONSHOP
        </Link>

        {/* Navigation Links */}
        <ul className="flex items-center gap-6">
          <li>
            <Link 
              to="/" 
              className="text-[#B3B3B3] hover:text-[#00F5FF] transition-colors font-medium"
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/cart" 
              className="text-[#B3B3B3] hover:text-[#00F5FF] transition-colors font-medium"
            >
              Cart
            </Link>
          </li>
          
          {/* Conditional Auth Links */}
          {user ? (
            <div className="flex items-center gap-4">
              <li>
                <span className="text-[#B3B3B3]">
                  Welcome, <span className="text-[#00F5FF]">{user.email}</span>
                </span>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="bg-[#6E00FF] hover:bg-[#00F5FF] text-white px-4 py-2 rounded-md transition-colors font-medium"
                >
                  Logout
                </button>
              </li>
            </div>
          ) : (
            <li>
              <Link 
                to="/login" 
                className="bg-[#6E00FF] hover:bg-[#00F5FF] text-white px-4 py-2 rounded-md transition-colors font-medium"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;