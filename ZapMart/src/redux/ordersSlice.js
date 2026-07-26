import { createSlice } from "@reduxjs/toolkit";

const loadOrdersFromStorage = () => {
  try {
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : [];
  } catch(e) { return []; }
};

const ordersSlice = createSlice({
  name: "orders",
  initialState: { items: loadOrdersFromStorage() },
  reducers: {
    placeOrder: (state, action) => {
      state.items.unshift(action.payload); // newest first
      localStorage.setItem("orders", JSON.stringify(state.items));
    }
  }
});

export const { placeOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
