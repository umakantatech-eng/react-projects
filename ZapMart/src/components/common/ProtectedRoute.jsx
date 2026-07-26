import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    // Agar login nahi hai, toh login page par bhej do
    // current location (kahan jana chahta tha) ko state me save kar lo
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Agar login hai, toh uski manjil (children routes) dikha do
  return <Outlet />;
};

export default ProtectedRoute;
