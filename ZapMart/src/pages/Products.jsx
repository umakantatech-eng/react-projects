import { useState, useEffect } from "react";
import { Filter, ChevronDown, Heart, Star, ChevronRight, Check, ArrowDownUp, ArrowUpDown, X, CheckCircle2, ShoppingCart, Package } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams, useNavigate } from "react-router-dom";
import productsData from "../data/products.json";

// Redux imports add to cart ke liye
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";

import categoriesData from "../data/categories.json";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isWishlisted = (id) => wishlistItems.some(item => item.id === id);

  const searchQuery = searchParams.get("search");
  const categoryQuery = searchParams.get("category");

  const [items, setItems] = useState([]);
  const [allFiltered, setAllFiltered] = useState([]);
  const [sortOption, setSortOption] = useState("Popularity");
  
  // Mobile Modal States
  const [showMobileSort, setShowMobileSort] = useState(false);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  
  useEffect(() => {
    let filteredData = productsData;
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filteredData = filteredData.filter(
        p => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      );
    } else if (categoryQuery) {
      filteredData = filteredData.filter(
        p => p.category.toLowerCase() === categoryQuery.toLowerCase()
      );
    }
    
    // Sort logic (use spread to avoid mutating productsData)
    let sortedData = [...filteredData];
    if (sortOption === "Price -- Low to High") {
      sortedData.sort((a, b) => a.price - b.price);
    } else if (sortOption === "Price -- High to Low") {
      sortedData.sort((a, b) => b.price - a.price);
    } else if (sortOption === "Newest First") {
      sortedData.sort((a, b) => b.id.localeCompare(a.id));
    } else {
      // Popularity (default)
      sortedData.sort((a, b) => b.rating - a.rating);
    }
    
    setAllFiltered(sortedData);
    setItems(sortedData.slice(0, 20));
  }, [searchQuery, categoryQuery, sortOption]);

  const fetchMoreData = () => {
    if (items.length >= allFiltered.length) return;
    
    setTimeout(() => {
      setItems(items.concat(allFiltered.slice(items.length, items.length + 20))); 
    }, 1000);
  };

  // Jab user Add to Cart pe click karega
  const handleAddToCart = (product, e) => {
    e.stopPropagation(); // Card pe click hone se rokne ke liye
    dispatch(addToCart(product));
    dispatch({ 
      type: "toast/showToast", 
      payload: { message: `${product.title} Cart me add ho gaya! 🛒`, type: "success" } 
    });
  };

  return (
    <div className="max-w-7xl mx-auto md:px-4 lg:px-8 py-2 md:py-6 bg-white md:bg-slate-50 min-h-screen dark:bg-slate-900">
      {/* Breadcrumb (Hidden on Mobile for cleaner look like App) */}
      <div className="hidden md:flex text-xs text-slate-500 mb-6 items-center gap-1.5 font-medium dark:text-slate-400">
        <span className="hover:text-primary cursor-pointer transition-colors" onClick={() => navigate('/')}>Home</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-bold text-slate-800 dark:text-slate-100">
          {searchQuery ? `Search: "${searchQuery}"` : categoryQuery ? categoryQuery : 'All Products'}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Filters - Desktop Only */}


        {/* Main Content */}
        <div className="flex-1">
          {/* Mobile Back Button & Title */}
          <div className="md:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-slate-100 dark:bg-slate-900 dark:border-slate-800">
            <span className="font-bold text-lg text-slate-800 line-clamp-1 dark:text-slate-100">
              {searchQuery ? `Search: "${searchQuery}"` : categoryQuery ? categoryQuery : 'All Products'}
            </span>
          </div>

          {/* Mobile Sticky Sort & Filter Bar (Flipkart Style) */}
          <div className="md:hidden sticky top-[104px] z-30 bg-white flex border-b border-slate-100 shadow-sm dark:bg-slate-900 dark:border-slate-800">
            <div onClick={() => setShowMobileSort(true)} className="flex-1 py-3 flex items-center justify-center gap-2 border-r border-slate-100 cursor-pointer text-slate-700 hover:bg-slate-50 active:bg-slate-100 transition-colors dark:border-slate-800 dark:text-slate-200">
              <ArrowUpDown className="w-4 h-4" />
              <span className="font-bold text-sm">Sort</span>
            </div>
            <div onClick={() => setShowMobileFilter(true)} className="flex-1 py-3 flex items-center justify-center gap-2 cursor-pointer text-slate-700 relative hover:bg-slate-50 active:bg-slate-100 transition-colors dark:text-slate-200">
              <Filter className="w-4 h-4" />
              <span className="font-bold text-sm">Filter</span>
              {categoryQuery && <div className="absolute top-3 right-1/4 w-2 h-2 bg-primary rounded-full"></div>}
            </div>
          </div>
          
          <div className="px-2 md:px-0">
            {/* Desktop Top Bar */}
            <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-slate-100 p-4 md:p-6 mb-4 md:mb-6 dark:bg-slate-900 dark:border-slate-800">
              <h1 className="text-xl md:text-2xl font-bold text-slate-800 mb-2 dark:text-slate-100">
                {searchQuery ? `Results for "${searchQuery}"` : categoryQuery ? categoryQuery : 'All Products'} 
                <span className="text-sm font-medium text-slate-400 ml-2 hidden sm:inline-block">
                  (Showing {items.length} products)
                </span>
              </h1>
              
              <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="text-sm font-bold text-slate-800 dark:text-slate-100">Sort By</span>
                <span onClick={() => setSortOption("Popularity")} className={`text-sm cursor-pointer transition-colors ${sortOption === "Popularity" ? "font-bold text-primary border-b-2 border-primary pb-1" : "font-medium text-slate-500 hover:text-slate-800"} dark:text-slate-400`}>Popularity</span>
                <span onClick={() => setSortOption("Price -- Low to High")} className={`text-sm cursor-pointer transition-colors ${sortOption === "Price -- Low to High" ? "font-bold text-primary border-b-2 border-primary pb-1" : "font-medium text-slate-500 hover:text-slate-800"} dark:text-slate-400`}>Price -- Low to High</span>
                <span onClick={() => setSortOption("Price -- High to Low")} className={`text-sm cursor-pointer transition-colors ${sortOption === "Price -- High to Low" ? "font-bold text-primary border-b-2 border-primary pb-1" : "font-medium text-slate-500 hover:text-slate-800"} dark:text-slate-400`}>Price -- High to Low</span>
                <span onClick={() => setSortOption("Newest First")} className={`text-sm cursor-pointer transition-colors ${sortOption === "Newest First" ? "font-bold text-primary border-b-2 border-primary pb-1" : "font-medium text-slate-500 hover:text-slate-800"} dark:text-slate-400`}>Newest First</span>
              </div>
            </div>

            {/* Hint Text Removed */}

            {/* Product Grid with Infinite Scroll */}
            {allFiltered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-4 dark:bg-slate-800">
                  <Package className="w-12 h-12 text-slate-400" />
                </div>
                <h2 className="text-xl font-bold text-slate-800 mb-2 dark:text-slate-100">No products found</h2>
                <p className="text-slate-500 max-w-sm mx-auto dark:text-slate-400">
                  We couldn't find any products for this category right now. Try looking for something else.
                </p>
                <button 
                  onClick={() => navigate('/')} 
                  className="mt-6 px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <InfiniteScroll
                dataLength={items.length}
                next={fetchMoreData}
                hasMore={items.length < allFiltered.length}
                loader={
                  <div className="flex justify-center py-6 col-span-full">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  </div>
                }
                className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-1 md:gap-5"
              >
                {items.map((product, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="bg-white md:rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.05)] md:shadow-sm border-r border-b md:border border-slate-100 md:hover:shadow-xl md:hover:border-primary/30 transition-all duration-300 group relative flex flex-col cursor-pointer dark:bg-slate-900 dark:border-slate-800"
                  >
                    
                    {/* Bestseller Badge */}
                    {product.rating >= 4.5 && product.reviews > 1000 && (
                      <div className="absolute top-0 left-0 bg-teal-500 text-white text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 z-20">
                        BESTSELLER
                      </div>
                    )}

                    {/* Wishlist Heart */}
                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch({ type: 'wishlist/toggleWishlist', payload: product });
                      }}
                      className="absolute top-2 right-2 md:top-3 md:right-3 z-10 w-7 h-7 md:w-8 md:h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-sm border border-slate-100 dark:border-slate-800"
                    >
                      <Heart className={`w-4 h-4 transition-colors ${isWishlisted(product.id) ? 'text-red-500 fill-red-500' : 'text-slate-400 hover:text-red-500'}`} />
                    </div>
                    
                    {/* Image Area */}
                    <div className="h-44 md:h-56 p-4 flex items-center justify-center relative group-hover:bg-indigo-50/10 transition-colors">
                      <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal" />
                      {/* Variants Badge */}
                      <div className="absolute bottom-2 right-2 bg-white border border-slate-200 text-primary text-[10px] font-bold px-2 py-1 rounded-full shadow-sm dark:bg-slate-900 dark:border-slate-700">
                        2 variants
                      </div>
                    </div>
                    
                    {/* Content Area */}
                    <div className="p-3 md:p-4 flex flex-col flex-grow">
                      <h2 className="text-[13px] md:text-sm font-medium text-slate-800 line-clamp-2 mb-2 group-hover:text-primary transition-colors leading-tight dark:text-slate-100">
                        {product.title}
                      </h2>
                      
                      <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                        <span className="bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                          {product.rating} <Star className="w-2.5 h-2.5 fill-white" />
                        </span>
                        <span className="text-slate-400 text-[10px] md:text-xs font-medium">({product.reviews})</span>
                        <span className="text-primary font-bold text-[10px] bg-blue-50 px-1 rounded">Z-Assured</span>
                      </div>
                      
                      <div className="flex items-center gap-1.5 md:gap-2 mb-1">
                        <span className="text-base md:text-lg font-black text-slate-900 dark:text-white">₹{product.price}</span>
                        <span className="text-[10px] md:text-xs text-slate-400 line-through font-medium">₹{product.originalPrice}</span>
                        <span className="text-[10px] md:text-xs font-bold text-emerald-600">{product.discount}% off</span>
                      </div>
                      
                      <div className="text-[10px] font-medium text-slate-600 mb-3 flex items-center gap-1 dark:text-slate-300">
                        <span className="font-black text-indigo-700 italic border border-indigo-200 px-1 rounded-sm bg-indigo-50">WOW!</span>
                        ₹78 with 3 offers
                      </div>
                      
                      {/* Add to Cart Button */}
                      <div className="mt-auto pt-2">
                        <button 
                          onClick={(e) => handleAddToCart(product, e)}
                          className="w-full py-2 bg-white border border-slate-200 text-primary font-bold rounded-lg hover:border-primary transition-colors text-xs md:text-sm shadow-sm dark:bg-slate-900 dark:border-slate-700"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </InfiniteScroll>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sort Bottom Sheet */}
      {showMobileSort && (
        <div className="fixed inset-0 z-50 bg-black/60 flex flex-col justify-end transition-opacity md:hidden" onClick={() => setShowMobileSort(false)}>
          <div className="bg-white rounded-t-2xl p-4 animate-in slide-in-from-bottom-full duration-300 dark:bg-slate-900" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">Sort By</h3>
              <button onClick={() => setShowMobileSort(false)} className="text-slate-400 hover:bg-slate-100 p-1.5 rounded-full transition-colors"><X className="w-5 h-5"/></button>
            </div>
            <div className="flex flex-col gap-1 pb-4">
              {["Popularity", "Price -- Low to High", "Price -- High to Low", "Newest First"].map(opt => (
                <div key={opt} onClick={() => { setSortOption(opt); setShowMobileSort(false); }} className={`p-3.5 rounded-xl flex justify-between items-center cursor-pointer transition-colors ${sortOption === opt ? 'bg-primary/10 text-primary font-bold' : 'text-slate-700 hover:bg-slate-50'}`}>
                   {opt} {sortOption === opt && <CheckCircle2 className="w-5 h-5"/>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Filter Bottom Sheet */}
      {showMobileFilter && (
        <div className="fixed inset-0 z-50 bg-black/60 flex flex-col justify-end transition-opacity md:hidden" onClick={() => setShowMobileFilter(false)}>
          <div className="bg-white rounded-t-2xl p-4 animate-in slide-in-from-bottom-full duration-300 max-h-[70vh] flex flex-col dark:bg-slate-900" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">Filter Category</h3>
              <button onClick={() => setShowMobileFilter(false)} className="text-slate-400 hover:bg-slate-100 p-1.5 rounded-full transition-colors"><X className="w-5 h-5"/></button>
            </div>
            <div className="flex-1 overflow-y-auto flex flex-col gap-1 hide-scrollbar pb-4">
              <div onClick={() => { navigate('/shop'); setShowMobileFilter(false); }} className={`p-3.5 rounded-xl flex justify-between items-center cursor-pointer transition-colors ${!categoryQuery ? 'bg-primary/10 text-primary font-bold' : 'text-slate-700 hover:bg-slate-50'}`}>
                 All Products {!categoryQuery && <CheckCircle2 className="w-5 h-5"/>}
              </div>
              {categoriesData.map(cat => (
                <div key={cat.id} onClick={() => { navigate(`/shop?category=${encodeURIComponent(cat.name)}`); setShowMobileFilter(false); }} className={`p-3.5 rounded-xl flex justify-between items-center cursor-pointer transition-colors ${categoryQuery === cat.name ? 'bg-primary/10 text-primary font-bold' : 'text-slate-700 hover:bg-slate-50'}`}>
                   {cat.name} {categoryQuery === cat.name && <CheckCircle2 className="w-5 h-5"/>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
