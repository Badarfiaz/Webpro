import { useEffect, useState } from "react";
import { fetchUserCart } from "../FirebaseService";
import { useAuth } from "./AuthContext";

function Cart() {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        setLoading(true);
        try {
          const data = await fetchUserCart(user.uid);
          setHistory(data);
        } catch (error) {
          console.error("Error loading cart:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    loadCart();
  }, [user]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">
            Your <span className="text-[#6E00FF]">Cart</span>
          </h2>
          <div className="text-[#B3B3B3]">
            {history.length} {history.length === 1 ? "item" : "items"}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-[#1A1A1A] rounded-lg p-4 animate-pulse h-24"></div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && history.length === 0 && (
          <div className="text-center py-12">
            <div className="text-[#B3B3B3] text-lg mb-4">🛒 Your cart is empty</div>
            <p className="text-[#555]">Start shopping to add items</p>
          </div>
        )}

        {/* Cart Items */}
        {!loading && history.length > 0 && (
          <div className="space-y-4">
            {history.map((item, index) => (
              <div 
                key={`${item.title}-${index}`} 
                className="bg-[#1A1A1A] rounded-lg p-6 border border-[#333] hover:border-[#6E00FF]/30 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Item Info */}
                  <div className="flex-1">
                    <h4 className="text-lg font-medium text-white mb-1">{item.title}</h4>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#B3B3B3]">
                      <p>Price: <span className="text-[#00F5FF]">${item.price}</span></p>
                      <p>Quantity: <span className="text-white">{item.quantity || 1}</span></p>
                      <p>Total: <span className="text-[#00FF9D]">${(item.price * (item.quantity || 1)).toFixed(2)}</span></p>
                    </div>
                  </div>

                  {/* Date & Actions */}
                  <div className="flex flex-col items-end">
                    {item.timestamp && (
                      <p className="text-xs text-[#555] mb-2">
                        Added on {item.timestamp.toDate().toLocaleDateString()}
                      </p>
                    )}
                    <div className="flex gap-2">
                      <button className="text-xs bg-[#333] hover:bg-[#6E00FF] text-white px-3 py-1 rounded transition-colors">
                        Buy Again
                      </button>
                      <button className="text-xs bg-[#333] hover:bg-[#FF2D75] text-white px-3 py-1 rounded transition-colors">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Checkout Summary */}
            <div className="bg-[#1A1A1A] rounded-lg p-6 border border-[#333] mt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[#B3B3B3]">Subtotal ({history.length} items)</span>
                <span className="text-xl font-bold text-[#00F5FF]">
                  ${history.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0).toFixed(2)}
                </span>
              </div>
              <button className="w-full bg-gradient-to-r from-[#6E00FF] to-[#00A2FF] text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;