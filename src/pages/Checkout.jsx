import { useState } from "react";
import { useCart } from "../components/CartState";
import { Dialog } from "@headlessui/react";
import { addTable_Checkout } from "../FirebaseService";

const cities = [
  "Lahore", "Karachi", "Islamabad", "Rawalpindi", "Faisalabad",
  "Multan", "Peshawar", "Quetta", "Sialkot", "Gujranwala"
];

function Checkout() {
  const { cartItems } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = () => {
    if (Object.values(formData).some((field) => field.trim() === "")) {
      alert("Please fill in all fields.");
      return;
    }
    setIsDialogOpen(true);
  };

  const confirmOrder = async () => {
    setIsDialogOpen(false);
    try {
      await addTable_Checkout({
        ...formData,
        cart: cartItems,
        totalAmount,
        timestamp: new Date(),
      });
      alert("✅ Order confirmed and saved to database!");
      // Optionally clear form or cart here
    } catch (error) {
      console.error("Error saving order:", error);
      alert("❌ Failed to save order. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Checkout</h2>

        {/* Form Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <input
            name="name"
            placeholder="Full Name"
            className="bg-[#1A1A1A] p-3 rounded w-full"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            name="email"
            placeholder="Email"
            className="bg-[#1A1A1A] p-3 rounded w-full"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            name="phone"
            placeholder="Phone Number"
            className="bg-[#1A1A1A] p-3 rounded w-full"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <select
            name="city"
            className="bg-[#1A1A1A] p-3 rounded w-full"
            value={formData.city}
            onChange={handleInputChange}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          <textarea
            name="address"
            rows="3"
            placeholder="Address"
            className="bg-[#1A1A1A] p-3 rounded w-full md:col-span-2"
            value={formData.address}
            onChange={handleInputChange}
          ></textarea>
        </div>

        {/* Order Summary */}
        <div className="bg-[#1A1A1A] rounded-lg p-6 border border-[#333] mb-6">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <ul className="divide-y divide-[#333] mb-4">
            {cartItems.map((item) => (
              <li key={item.id} className="py-2 flex justify-between text-sm">
                <span>{item.title} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          onClick={handleCheckout}
          className="w-full bg-gradient-to-r from-[#6E00FF] to-[#00A2FF] text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Checkout
        </button>
      </div>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/50" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm rounded bg-[#1A1A1A] p-6 border border-[#333] text-white">
            <Dialog.Title className="text-lg font-bold mb-4">Confirm Order</Dialog.Title>
            <p className="mb-4">Are you sure you want to place this order?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDialogOpen(false)}
                className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={confirmOrder}
                className="bg-[#6E00FF] px-4 py-2 rounded hover:bg-[#5500cc]"
              >
                Confirm
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}

export default Checkout;
