import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
import wishlistReducer from "./wishlistSlice";
import toastReducer from "./toastSlice";
import ordersReducer from "./ordersSlice";

// Yahan hum apna Redux store bana rahe hain
const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    wishlist: wishlistReducer,
    toast: toastReducer,
    orders: ordersReducer,
  },
});

// Jab bhi store me kuch update hoga, ye automatically localStorage me save kar dega
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("cart", JSON.stringify(state.cart.items));
  localStorage.setItem("auth", JSON.stringify(state.auth));
  localStorage.setItem("wishlist", JSON.stringify(state.wishlist.items));
});

export default store;
