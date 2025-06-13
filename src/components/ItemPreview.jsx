import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../FirebaseService";
import ItemTypeCard from "../pages/ItemList";
import { useCart } from "../components/CartState"; // ✅ context import
import Cart from "./cart";
import { addCart } from "../FirebaseService";
import { useAuth } from "./AuthContext";


function ItemPreview() {
  const { category } = useParams();
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);
const { user } = useAuth();

  const { addToCart } = useCart(); // ✅ destructure from context

  useEffect(() => {
    const loadVariants = async () => {
      try {
        const data = await fetchProducts();
        const filtered = data.filter(
          (item) => item.category.toLowerCase() === category.toLowerCase()
        );
        setVariants(filtered);
      } catch (error) {
        console.error("Error loading items:", error);
      } finally {
        setLoading(false);
      }
    };

    loadVariants();
  }, [category]);

const handleAddToCart = async (cart) => {
  addToCart(cart);
  if (user) {
    await addCart(cart, user.uid);
  }
};
  if (loading) return <p>Loading {category} variants...</p>;

  if (variants.length === 0) return <p>No {category} variants found.</p>;

  return (
    <>
      {variants.map((cart, index) => (
        <ItemTypeCard
          key={index}
          cart={cart}
          onAddToCart={handleAddToCart} // ✅ pass it to the card
        />
      ))}
    </>
  );
}

export default ItemPreview;
