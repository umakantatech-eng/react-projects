import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Redux setup ke liye Provider aur store import kiya
import { Provider } from "react-redux";
import store from "./redux/store";
import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  // Provider se poore app me Redux ka data available ho jayega
  <Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Provider>
);
