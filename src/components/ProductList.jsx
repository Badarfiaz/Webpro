import ItemTypeCard from "./ItemTypeCard";

function ProductList({ products, onAddToCart }) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] p-6">
      <h2 className="text-white text-3xl font-bold mb-6">Products</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((item) => (
          <ItemTypeCard key={item.id} cart={item} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
