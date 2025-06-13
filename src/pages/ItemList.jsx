"use client"

function ItemTypeCard({ cart, onAddToCart }) {
  const handleAdd = () => {
    onAddToCart(cart);
  };

  return (
    <div className="bg-[#1A1A1A] border border-[#333] rounded-2xl p-4 hover:border-[#00A2FF] transition-all duration-300 group shadow-md">
      <div className="relative overflow-hidden rounded-xl mb-4">
        <img
          src={cart.image || "/placeholder.svg"}
          alt={cart.title}
          className="w-full h-40 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <h3 className="text-white text-lg font-semibold mb-2 line-clamp-1">{cart.title}</h3>

      <div className="text-sm text-gray-400 space-y-1 mb-3">
        {cart.size && (
          <p>
            <span className="text-gray-300">Size:</span> {cart.size}
          </p>
        )}
        {cart.color && (
          <p>
            <span className="text-gray-300">Color:</span> {cart.color}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between mb-4">
        <p className="text-[#00A2FF] text-lg font-bold">${cart.price}</p>
        <div className="text-yellow-400 text-sm">⭐⭐⭐⭐☆</div>
      </div>

      <button
        onClick={handleAdd}
        className="w-full bg-[#00A2FF] hover:bg-[#0088CC] text-white font-medium py-2 rounded-xl transition duration-200"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ItemTypeCard;
