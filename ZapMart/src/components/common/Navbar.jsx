import { Search, ShoppingCart, User, Zap, Camera, Mic, QrCode, LogOut, Package, Heart, ChevronDown, MapPin, CreditCard, Moon, Sun } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/authSlice";
import { useState, useEffect, useRef } from "react";
import productsData from "../../data/products.json";

const Navbar = () => {
  // Redux store se cart items nikal rahe hain
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.length;
  
  // Auth state
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  // Search and Debounce logic
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState({ categories: [], products: [] });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const profileDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isOutsideDesktop = desktopSearchRef.current ? !desktopSearchRef.current.contains(event.target) : true;
      const isOutsideMobile = mobileSearchRef.current ? !mobileSearchRef.current.contains(event.target) : true;
      if (isOutsideDesktop && isOutsideMobile) {
        setShowSuggestions(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim().length > 1) {
        const q = searchQuery.toLowerCase();
        const matchingCategories = [...new Set(productsData.filter(p => p.category.toLowerCase().includes(q)).map(p => p.category))].slice(0, 3);
        const matchingProducts = productsData.filter(p => p.title.toLowerCase().includes(q)).slice(0, 5);
        
        setSuggestions({ categories: matchingCategories, products: matchingProducts });
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      setShowSuggestions(false);
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };
  
  const handleSuggestionClick = (query, isCategory) => {
    setShowSuggestions(false);
    if (isCategory) {
      navigate(`/shop?category=${encodeURIComponent(query)}`);
    } else {
      navigate(`/shop?search=${encodeURIComponent(query)}`);
    }
    setSearchQuery("");
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-slate-100 dark:bg-slate-900 dark:border-slate-800">
      
      {/* --- DESKTOP NAVBAR --- */}
      <header className="hidden md:flex max-w-7xl mx-auto h-[72px] px-4 sm:px-6 lg:px-8 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
          <div className="bg-gradient-to-br from-primary to-secondary p-1.5 rounded-xl">
             <Zap className="h-6 w-6 text-white fill-white" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-primary">
            ZapMart
          </span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl px-8 relative" ref={desktopSearchRef}>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              onFocus={() => searchQuery.length > 1 && setShowSuggestions(true)}
              className="block w-full pl-12 pr-4 py-2.5 bg-slate-100 border border-transparent rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
              placeholder="Search for premium products, brands and more (Press Enter)..."
            />
          </div>
          
          {/* Dropdown Suggestions */}
          {showSuggestions && (suggestions.categories?.length > 0 || suggestions.products?.length > 0) && (
            <div className="absolute top-full left-8 right-8 mt-1 bg-white border border-slate-200 shadow-xl rounded-xl overflow-hidden z-50 dark:bg-slate-900 dark:border-slate-700">
               {suggestions.categories?.length > 0 && (
                 <div className="p-2 border-b border-slate-100 dark:border-slate-800">
                    <div className="text-xs font-bold text-slate-400 mb-1 px-2 uppercase">Categories</div>
                    {suggestions.categories.map((cat, idx) => (
                      <div key={idx} onClick={() => handleSuggestionClick(cat, true)} className="flex items-center gap-2 px-2 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer rounded">
                         <Search className="w-3.5 h-3.5 text-slate-400" />
                         <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{cat}</span>
                      </div>
                    ))}
                 </div>
               )}
               {suggestions.products?.length > 0 && (
                 <div className="p-2">
                    <div className="text-xs font-bold text-slate-400 mb-1 px-2 uppercase">Products</div>
                    {suggestions.products.map((prod) => (
                      <div key={prod.id} onClick={() => handleSuggestionClick(prod.title, false)} className="flex items-center gap-3 px-2 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer rounded">
                         <img src={prod.images[0]} className="w-8 h-8 rounded object-cover" alt="" />
                         <span className="text-sm font-medium text-slate-700 line-clamp-1 dark:text-slate-200">{prod.title}</span>
                      </div>
                    ))}
                 </div>
               )}
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          
          {isAuthenticated ? (
            <div className="relative" ref={profileDropdownRef}>
              {/* Profile Trigger Button */}
              <button
                onClick={() => setShowProfileDropdown((v) => !v)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-black text-sm">{user.name[0].toUpperCase()}</span>
                </div>
                <span className="font-bold text-slate-700 text-sm dark:text-slate-200">{user.name.split(" ")[0]}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${showProfileDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Panel */}
              {showProfileDropdown && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 z-[100] overflow-hidden animate-in slide-in-from-top-2 fade-in duration-200 dark:bg-slate-900 dark:border-slate-800">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-primary to-indigo-600 px-5 py-4 flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/30">
                      <span className="text-white font-black text-xl">{user.name[0].toUpperCase()}</span>
                    </div>
                    <div>
                      <p className="font-black text-white text-base leading-tight">{user.name}</p>
                      <p className="text-white/70 text-xs mt-0.5">{user.email}</p>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    {[
                      { icon: <Package className="w-4 h-4" />, label: "My Orders", path: "/profile/orders" },
                      { icon: <Heart className="w-4 h-4" />, label: "Wishlist", path: "/profile/wishlist" },
                      { icon: <MapPin className="w-4 h-4" />, label: "Saved Addresses", path: "/profile/addresses" },
                      { icon: <CreditCard className="w-4 h-4" />, label: "Payment Methods", path: "/profile/payments" },
                      { icon: <User className="w-4 h-4" />, label: "My Profile", path: "/profile" },
                    ].map((item) => (
                      <div
                        key={item.path}
                        onClick={() => { navigate(item.path); setShowProfileDropdown(false); }}
                        className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 cursor-pointer transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-primary group-hover:text-white transition-colors dark:bg-slate-800 dark:text-slate-400">
                          {item.icon}
                        </div>
                        <span className="font-medium text-slate-700 group-hover:text-primary transition-colors text-sm dark:text-slate-200">{item.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Sign Out */}
                  <div className="border-t border-slate-100 px-5 py-3 dark:border-slate-800">
                    <button
                      onClick={() => { dispatch(logoutUser()); navigate("/login"); setShowProfileDropdown(false); }}
                      className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 py-2.5 rounded-xl font-bold hover:bg-red-100 transition-colors text-sm"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="flex items-center text-slate-700 hover:text-primary cursor-pointer font-medium px-2 py-1 rounded hover:bg-slate-50 transition-colors dark:text-slate-200">
              <User className="h-5 w-5 mr-1.5" />
              <span>Sign In</span>
            </Link>
          )}

          <Link to="/cart" className="flex items-center text-slate-700 hover:text-primary cursor-pointer px-2 py-1 rounded relative hover:bg-slate-50 transition-colors dark:text-slate-200">
            <ShoppingCart className="h-5 w-5 mr-1.5" />
            <span className="font-medium">Cart</span>
            {/* Yahan cart count dikhega agar 0 se zyada hai */}
            {cartCount > 0 && (
              <span className="absolute -top-1 right-0 bg-secondary text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors dark:text-slate-300">
            {theme === 'dark' ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* --- MOBILE NAVBAR --- */}
      <header className="md:hidden h-[104px] flex flex-col justify-between pb-2 bg-gradient-to-b from-blue-50/50 to-white dark:from-slate-900 dark:to-slate-900">
        {/* Top Row: Logo */}
        <div className="flex items-center justify-between px-4 pt-3 h-10">
          <Link to="/" className="flex items-center gap-1.5 cursor-pointer">
            <div className="bg-gradient-to-br from-primary to-secondary p-1 rounded-lg shadow-sm">
               <Zap className="h-4 w-4 text-white fill-white" />
            </div>
            <span className="font-extrabold text-lg tracking-tight text-primary">ZapMart</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600 transition-colors dark:text-slate-300">
              {theme === 'dark' ? <Sun className="h-4 w-4 text-yellow-500" /> : <Moon className="h-4 w-4" />}
            </button>
            {isAuthenticated ? (
              <div onClick={() => { dispatch(logoutUser()); navigate("/login"); }} className="bg-red-50 p-1.5 rounded-full shadow-sm border border-red-100 text-red-500 cursor-pointer dark:bg-slate-800 dark:border-slate-700">
                 <LogOut className="h-4 w-4" />
              </div>
            ) : (
              <Link to="/login" className="bg-white p-1.5 rounded-full shadow-sm border border-slate-100 text-slate-600 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300">
                 <User className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>

        {/* Bottom Row: Search Bar */}
        <div className="px-3 flex gap-2 items-center" ref={mobileSearchRef}>
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              onFocus={() => searchQuery.length > 1 && setShowSuggestions(true)}
              className="block w-full pl-9 pr-14 py-2 bg-white border border-slate-300 rounded-lg text-[13px] focus:outline-none focus:border-primary shadow-sm dark:bg-slate-900 dark:border-slate-600 dark:text-white dark:focus:bg-slate-800"
              placeholder="Search mobiles, fashion..."
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-2.5">
               <Camera className="h-4 w-4 text-slate-500 cursor-pointer dark:text-slate-400" />
               <Mic className="h-4 w-4 text-primary cursor-pointer" />
            </div>

            {/* Mobile Dropdown Suggestions */}
            {showSuggestions && (suggestions.categories?.length > 0 || suggestions.products?.length > 0) && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 shadow-xl rounded-xl overflow-hidden z-[60] dark:bg-slate-900 dark:border-slate-700">
                 {suggestions.categories?.length > 0 && (
                   <div className="p-2 border-b border-slate-100 dark:border-slate-800">
                      <div className="text-[10px] font-bold text-slate-400 mb-1 px-2 uppercase">Categories</div>
                      {suggestions.categories.map((cat, idx) => (
                        <div key={idx} onClick={() => handleSuggestionClick(cat, true)} className="flex items-center gap-2 px-2 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer rounded">
                           <Search className="w-3 h-3 text-slate-400" />
                           <span className="text-[13px] font-medium text-slate-700 dark:text-slate-200">{cat}</span>
                        </div>
                      ))}
                   </div>
                 )}
                 {suggestions.products?.length > 0 && (
                   <div className="p-2">
                      <div className="text-[10px] font-bold text-slate-400 mb-1 px-2 uppercase">Products</div>
                      {suggestions.products.map((prod) => (
                        <div key={prod.id} onClick={() => handleSuggestionClick(prod.title, false)} className="flex items-center gap-2 px-2 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer rounded">
                           <img src={prod.images[0]} className="w-6 h-6 rounded object-cover" alt="" />
                           <span className="text-[13px] font-medium text-slate-700 line-clamp-1 dark:text-slate-200">{prod.title}</span>
                        </div>
                      ))}
                   </div>
                 )}
              </div>
            )}
          </div>
          <div className="bg-white p-2 border border-slate-200 rounded-lg shadow-sm cursor-pointer dark:bg-slate-900 dark:border-slate-700">
            <QrCode className="h-5 w-5 text-slate-600 dark:text-slate-300" />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
