import { createSlice } from "@reduxjs/toolkit";

// Local storage se purana cart padhne ka try karo
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (e) {
    return [];
  }
};

// Initial state
const initialState = {
  items: loadCartFromStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Ye function product ko cart me add karega
    addToCart: (state, action) => {
      const product = action.payload;
      // Check karte hain agar product pehle se cart me hai ya nahi
      const existingItem = state.items.find((item) => item.id === product.id);
      
      if (existingItem) {
        // Agar hai toh bas quantity badha do
        existingItem.quantity += 1;
      } else {
        // Naya product hai toh array me daal do (quantity 1 ke sath)
        state.items.push({ ...product, quantity: 1 });
      }
    },

    // Cart se product delete karne ke liye
    removeFromCart: (state, action) => {
      const productId = action.payload;
      // Filter karke us id wale item ko hata do
      state.items = state.items.filter((item) => item.id !== productId);
    },

    // Quantity badhane (+1) ke liye
    increaseQuantity: (state, action) => {
      const productId = action.payload;
      const item = state.items.find((item) => item.id === productId);
      if (item) {
        item.quantity += 1;
      }
    },

    // Quantity kam karne (-1) ke liye
    decreaseQuantity: (state, action) => {
      const productId = action.payload;
      const item = state.items.find((item) => item.id === productId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    // Pura cart empty karne ke liye (order place hone ke baad)
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
