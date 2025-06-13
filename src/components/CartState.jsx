// src/components/CartState.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../Firebase";
import {
  collection,
  query,
  where,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();

  // Load cart from Firestore on mount
  useEffect(() => {
    const fetchCart = async () => {
      if (!user) return;
      const q = query(collection(db, "Cart"), where("userId", "==", user.uid));
      const snapshot = await getDocs(q);
      const cartData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCartItems(cartData);
    };

    fetchCart();
  }, [user]);

  const addToCart = async (product) => {
    if (!user) return;

    const existingItem = cartItems.find((item) => item.title === product.title);

    if (existingItem) {
      // Update quantity in Firestore
      const ref = doc(db, "Cart", existingItem.id);
      await updateDoc(ref, {
        quantity: existingItem.quantity + 1,
      });

      setCartItems((prev) =>
        prev.map((item) =>
          item.id === existingItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      const newItem = {
        ...product,
        userId: user.uid,
        quantity: 1,
        timestamp: new Date(),
      };
      const docRef = await addDoc(collection(db, "Cart"), newItem);
      setCartItems((prev) => [...prev, { ...newItem, id: docRef.id }]);
    }
  };

  const updateQuantity = async (id, amount) => {
    const item = cartItems.find((item) => item.id === id);
    if (!item) return;

    const newQty = Math.max(1, item.quantity + amount);
    await updateDoc(doc(db, "Cart", id), { quantity: newQty });

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeFromCart = async (id) => {
    await deleteDoc(doc(db, "Cart", id));
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}
