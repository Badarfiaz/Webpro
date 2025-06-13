import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import { db } from "./Firebase";
const Table_name= "Items";
const Table_Cart = "Cart";


export const addProduct = async (product) => {
  await addDoc(collection(db, Table_name), product);
};
export const fetchProducts = async () => {
  const querySnapshot = await getDocs(collection(db, Table_name));
  const products = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });
  return products;
};



export const addCart = async (cart, userId) => {
  await addDoc(collection(db, "Cart"), {
    ...cart,
    userId,
    quantity: cart.quantity || 1,
    timestamp: new Date(),
  });
};

export const fetchUserCart = async (userId) => {
  const q = query(collection(db, "Cart"), where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

 