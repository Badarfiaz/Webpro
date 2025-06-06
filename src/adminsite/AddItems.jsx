import { useState } from "react";
import { addProduct } from "../FirebaseService";
import MainPage from "../pages/MainPage";

function AddItems() {
  const [item, setItem] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    files: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

//   const handleFileChange = (e) => {
//       setItem((prevItem) => ({
//       ...prevItem,
//       files: Array.from(e.target.files),
//     }));
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduct(item);
      alert("Product added successfully");
      setItem({
        title: "",
        description: "",
        price: "",
        category: "",
        files: [],
      });
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={item.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={item.description}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={item.price}
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={item.category}
          onChange={handleChange}
        />
        
        {/* <input
          type="file"
          multiple
          onChange={handleFileChange}
        /> */}

        <button type="submit">Add Product</button>
      </form>
      <MainPage/>
    </div>
  );
}

export default AddItems;
