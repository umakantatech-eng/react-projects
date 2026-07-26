import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/common/ProtectedRoute";
import ErrorPage from "./pages/ErrorPage";
import Profile from "./pages/Profile";
import Categories from "./pages/Categories";
import Deals from "./pages/Deals";
import Orders from "./pages/Orders";
import Wishlist from "./pages/Wishlist";
import Addresses from "./pages/Addresses";
import Payments from "./pages/Payments";

// Wrapper for layout
const LayoutWrapper = () => (
  <MainLayout>
    <Outlet />
  </MainLayout>
);

// Public route: Agar logged in hai, toh wapas Home pe bhej do
const PublicRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

const router = createBrowserRouter([
  {
    element: <LayoutWrapper />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          { path: "/login", element: <Login /> },
          { path: "/signup", element: <Signup /> },
        ]
      },
      {
        // Protected Route wrapper: yahan ke sabhi children bina login ke access nahi honge
        element: <ProtectedRoute />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/shop", element: <Products /> },
          { path: "/product/:id", element: <ProductDetail /> },
          { path: "/cart", element: <Cart /> },
          { path: "/checkout", element: <Checkout /> },
          { path: "/profile", element: <Profile /> },
          { path: "/categories", element: <Categories /> },
          { path: "/deals", element: <Deals /> },
          { path: "/profile/orders", element: <Orders /> },
          { path: "/profile/wishlist", element: <Wishlist /> },
          { path: "/profile/addresses", element: <Addresses /> },
          { path: "/profile/payments", element: <Payments /> },
        ]
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
