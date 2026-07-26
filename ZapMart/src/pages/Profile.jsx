import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/authSlice";
import { User, Mail, LogOut, Package, Heart, MapPin, CreditCard, ChevronRight } from "lucide-react";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  const menuItems = [
    { icon: <Package className="w-5 h-5" />, title: "My Orders", subtitle: "Track, return, or buy things again", path: "/profile/orders" },
    { icon: <Heart className="w-5 h-5" />, title: "Wishlist", subtitle: "Your saved items", path: "/profile/wishlist" },
    { icon: <MapPin className="w-5 h-5" />, title: "Saved Addresses", subtitle: "Manage your delivery addresses", path: "/profile/addresses" },
    { icon: <CreditCard className="w-5 h-5" />, title: "Payment Methods", subtitle: "Manage your saved cards/UPI", path: "/profile/payments" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-10 bg-white md:bg-transparent min-h-[calc(100vh-140px)] dark:bg-slate-900">
      <div className="md:bg-white md:rounded-2xl md:shadow-sm md:border md:border-slate-100 overflow-hidden">
        
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-primary to-indigo-600 p-6 md:p-8 text-white flex items-center gap-6">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 rounded-full flex items-center justify-center border-4 border-white/30 backdrop-blur-sm">
            <User className="w-10 h-10 md:w-12 md:h-12 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">{user?.name || "User"}</h1>
            <div className="flex items-center gap-2 text-white/80 text-sm md:text-base">
              <Mail className="w-4 h-4" />
              <span>{user?.email || "user@example.com"}</span>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {menuItems.map((item, index) => (
            <div key={index} onClick={() => navigate(item.path)} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-primary/30 hover:bg-slate-50 cursor-pointer transition-colors group dark:border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors dark:bg-slate-800 dark:text-slate-300">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm md:text-base dark:text-slate-100">{item.title}</h3>
                  <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">{item.subtitle}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-primary" />
            </div>
          ))}
        </div>

        {/* Logout Button */}
        <div className="p-4 md:p-6 border-t border-slate-100 mt-4 md:mt-0 dark:border-slate-800">
          <button 
            onClick={handleLogout}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-red-50 text-red-600 px-6 py-3 rounded-xl font-bold hover:bg-red-100 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>

      </div>
    </div>
  );
};

export default Profile;
