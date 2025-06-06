"use client"

function ItemTypeCard({ cart, onAddToCart }) {
  const handleAdd = () => {
    onAddToCart(cart)
  }

  return (
    <div className="bg-surface border border-surface-border rounded-lg p-6 hover:border-primary/30 transition-all duration-300 group">
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          src={cart.image || "/placeholder.svg"}
          alt={cart.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <h3 className="text-text-primary text-lg font-semibold mb-2 line-clamp-2">{cart.title}</h3>

      <div className="space-y-1 mb-3">
        <p className="text-text-secondary text-sm">
          <span className="text-text-primary">Size:</span> {cart.size}
        </p>
        <p className="text-text-secondary text-sm">
          <span className="text-text-primary">Color:</span> {cart.color}
        </p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <p className="text-secondary text-xl font-bold">${cart.price}</p>
        <div className="flex items-center text-status-warning">
          <span className="text-lg">⭐⭐⭐⭐☆</span>
        </div>
      </div>

      <button
        onClick={handleAdd}
        className="w-full bg-primary hover:bg-primary-hover text-text-primary font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        Add to Cart
      </button>
    </div>
  )
}

export default ItemTypeCard
