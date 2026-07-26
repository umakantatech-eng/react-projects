import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Toast from "../components/common/Toast";
import { Home, Grid, Percent, User, ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const MainLayout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  // Redux state
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.length;
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      {/* Agar login/signup page pe hain toh Navbar mat dikhao */}
      {!isAuthPage && <Navbar />}

      {/* Main Content Area */}
      <main className={`flex-1 ${!isAuthPage ? 'pt-[104px] md:pt-[72px] pb-[60px] md:pb-0' : ''}`}>
        {children}
      </main>

      {!isAuthPage && <div className="hidden md:block"><Footer /></div>}

      {/* --- MOBILE BOTTOM NAVIGATION --- */}
      {/* Ye sirf mobile me dikhega jab user login page pe na ho */}
      {!isAuthPage && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 h-[60px] flex items-center justify-around z-50 px-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] dark:bg-slate-900 dark:border-slate-700">
          <Link to="/" className="flex flex-col items-center text-primary cursor-pointer">
            <Home className="h-5 w-5" />
            <span className="text-[10px] mt-1 font-bold">Home</span>
          </Link>
          <Link to="/categories" className="flex flex-col items-center text-slate-500 cursor-pointer hover:text-primary dark:text-slate-400">
            <Grid className="h-5 w-5" />
            <span className="text-[10px] mt-1">Categories</span>
          </Link>
          <Link to="/deals" className="flex flex-col items-center text-slate-500 cursor-pointer hover:text-primary dark:text-slate-400">
            <Percent className="h-5 w-5" />
            <span className="text-[10px] mt-1">Deals</span>
          </Link>
          <Link to={isAuthenticated ? "/profile" : "/login"} className="flex flex-col items-center text-slate-500 cursor-pointer hover:text-primary dark:text-slate-400">
            <User className="h-5 w-5" />
            <span className="text-[10px] mt-1">{isAuthenticated ? "Profile" : "Account"}</span>
          </Link>
          <Link to="/cart" className="flex flex-col items-center text-slate-500 relative cursor-pointer hover:text-primary dark:text-slate-400">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
            <span className="text-[10px] mt-1">Cart</span>
          </Link>
        </div>
      )}
      {/* Toast Notification - always visible on all pages */}
      <Toast />
    </div>
  );
};

export default MainLayout;
