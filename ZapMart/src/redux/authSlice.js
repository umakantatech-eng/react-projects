import { createSlice } from "@reduxjs/toolkit";

const loadAuthFromStorage = () => {
  try {
    const savedAuth = localStorage.getItem("auth");
    return savedAuth ? JSON.parse(savedAuth) : { isAuthenticated: false, user: null };
  } catch (e) {
    return { isAuthenticated: false, user: null };
  }
};

const initialState = loadAuthFromStorage();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload; // user details jaise name, email
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    }
  }
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
