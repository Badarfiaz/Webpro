// src/components/Cart.jsx

import { useCart } from "./CartState";
import { useAuth } from "./AuthContext";

function Cart() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-white">
        Please sign in to view your cart.
      </div>
    );
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">
            Your <span className="text-[#6E00FF]">Cart</span>
          </h2>
          <div className="text-[#B3B3B3]">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
          </div>
        </div>

        {/* Empty State */}
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-[#B3B3B3] text-lg mb-4">🛒 Your cart is empty</div>
            <p className="text-[#555]">Start shopping to add items</p>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#1A1A1A] rounded-lg p-6 border border-[#333] hover:border-[#6E00FF]/30 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Info */}
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-white mb-1">
                        {item.title}
                      </h4>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#B3B3B3]">
                        <p>
                          Price:{" "}
                          <span className="text-[#00F5FF]">${item.price}</span>
                        </p>
                        <p>
                          Quantity:{" "}
                          <span className="text-white">{item.quantity}</span>
                        </p>
                        <p>
                          Total:{" "}
                          <span className="text-[#00FF9D]">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col items-end justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="bg-[#333] text-white px-3 py-1 rounded hover:bg-[#444] transition"
                        >
                          −
                        </button>
                        <span className="text-white font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="bg-[#333] text-white px-3 py-1 rounded hover:bg-[#444] transition"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs bg-[#333] hover:bg-[#FF2D75] text-white px-3 py-1 rounded transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Checkout Summary */}
            <div className="bg-[#1A1A1A] rounded-lg p-6 border border-[#333] mt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[#B3B3B3]">
                  Subtotal ({cartItems.length} items)
                </span>
                <span className="text-xl font-bold text-[#00F5FF]">
                  ${total.toFixed(2)}
                </span>
              </div>
              <button className="w-full bg-gradient-to-r from-[#6E00FF] to-[#00A2FF] text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
