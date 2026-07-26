import {
  Smartphone,
  Laptop,
  CheckCircle2,
  ShoppingBag,
  Watch,
  Speaker,
  Home as HomeIcon,
  Gamepad2,
  ArrowRight,
  Loader2
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import productsData from "../data/products.json";
import categoriesData from "../data/categories.json";

import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
  const navigate = useNavigate();
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [items, setItems] = useState([]);

  const heroSlides = [
    {
      id: 1,
      title: "Premium headphones",
      subtitle: "JBL, Bose, SONY",
      price: "Just ₹55/Day",
      badge: "Interest Free",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop",
      bgGradient: "from-[#ff8a00] to-[#e52e71]"
    },
    {
      id: 2,
      title: "Latest Smartphones",
      subtitle: "Apple, Samsung, OnePlus",
      price: "Up to 40% Off",
      badge: "Big Sale",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400&auto=format&fit=crop",
      bgGradient: "from-blue-500 to-indigo-600"
    },
    {
      id: 3,
      title: "Smart Watches",
      subtitle: "Track your fitness",
      price: "Starting at ₹1999",
      badge: "New Arrival",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop",
      bgGradient: "from-emerald-400 to-teal-600"
    }
  ];
  
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3000);
    return () => clearInterval(slideTimer);
  }, [heroSlides.length]);

  useEffect(() => {
    // 2 seconds ka delay products show karne ke liye
    const timer = setTimeout(() => {
      setLoadingProducts(false);
      setItems(productsData.slice(0, 10)); // Initial load
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const fetchMoreData = () => {
    // Desktop pe max 200, mobile pe 1000
    const isMobile = window.innerWidth < 768;
    const maxItems = Math.min(isMobile ? 1000 : 200, productsData.length);

    if (items.length >= maxItems) return;

    setTimeout(() => {
      setItems(prevItems => {
        const nextBatchSize = 10;
        const nextBatch = productsData.slice(prevItems.length, prevItems.length + nextBatchSize);
        const nextItems = prevItems.concat(nextBatch);
        return nextItems.slice(0, maxItems);
      });
    }, 1500);
  };

  return (
    <div className="bg-white md:bg-slate-50 min-h-screen dark:bg-slate-900">
      {/* 1. Category Menu */}
      <div className="bg-white border-b border-slate-100 shadow-sm sticky top-[104px] md:top-[72px] z-40 dark:bg-slate-900 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-start md:justify-between overflow-x-auto hide-scrollbar py-2 md:py-4 gap-4 md:gap-0">
            {categoriesData.map((category, idx) => (
              <Link
                to={category.name === "Top Offers" ? "/deals" : `/shop?category=${encodeURIComponent(category.name)}`}
                key={category.id}
                className="flex flex-col items-center gap-1 md:gap-2 cursor-pointer group min-w-[65px] md:min-w-[80px]"
              >
                <div className={`w-10 h-10 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all overflow-hidden ${idx === 0 ? "bg-primary/10 md:bg-white md:border-2 md:border-primary" : "bg-slate-50 md:bg-white md:border md:border-slate-100 md:group-hover:shadow-md md:group-hover:border-primary/30"}`}>
                  <img src={category.image} alt={category.name} className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal" />
                </div>
                <span className={`text-[11px] md:text-[13px] whitespace-nowrap pb-1 md:pb-0 border-b-[3px] md:border-none transition-colors ${idx === 0 ? "font-bold text-primary border-primary" : "font-medium text-slate-600 border-transparent group-hover:text-primary"} dark:text-slate-300`}>
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 md:space-y-8 py-4 md:py-6">
        {/* 2. Hero Section */}
        <div className={`bg-gradient-to-r ${heroSlides[currentSlide].bgGradient} rounded-xl md:rounded-2xl h-[160px] md:h-[280px] flex items-center p-4 md:px-12 relative overflow-hidden shadow-sm md:shadow-md w-full transition-all duration-500`}>
          <div className="relative z-10 w-2/3 md:w-1/2 animate-in fade-in slide-in-from-left-4 duration-500 key={currentSlide}">
            <span className="hidden md:inline-block py-1 px-3 rounded-full bg-white/20 text-white text-[10px] font-bold tracking-wider uppercase mb-4 border border-white/30">
              {heroSlides[currentSlide].badge}
            </span>
            <div className="flex items-center gap-1 md:hidden mb-1">
              <span className="text-yellow-300 font-black text-2xl tracking-tighter">0%</span>
              <span className="text-white text-[8px] font-bold uppercase leading-none">Interest<br />Days</span>
            </div>
            <h1 className="text-lg md:text-4xl font-extrabold text-white leading-tight mb-1 md:mb-3">{heroSlides[currentSlide].title}</h1>
            <p className="text-white/90 mb-2 md:mb-6 text-[10px] md:text-base font-medium">{heroSlides[currentSlide].subtitle}</p>
            <div className="text-yellow-300 font-black text-base md:text-3xl mb-2">{heroSlides[currentSlide].price}</div>
            <button className="hidden md:block bg-white text-slate-900 px-6 py-2.5 rounded-lg font-bold hover:shadow-lg transition-all dark:bg-slate-900 dark:text-white">Shop Now</button>
          </div>
          <div className="absolute right-0 bottom-0 top-0 w-1/2 flex items-center justify-end pr-2 md:pr-10">
            <img src={heroSlides[currentSlide].image} alt="Hero Product" className="h-full object-contain mix-blend-overlay opacity-80 md:scale-110 animate-in fade-in zoom-in-95 duration-500 key={currentSlide}" />
          </div>
          <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {heroSlides.map((slide, idx) => (
              <div 
                key={slide.id} 
                onClick={() => setCurrentSlide(idx)}
                className={`cursor-pointer rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-5 md:w-8 h-1 md:h-1.5 bg-slate-900' : 'w-1.5 md:w-2 h-1 md:h-1.5 bg-slate-900/20 hover:bg-slate-900/40'}`}
              ></div>
            ))}
          </div>
        </div>

        {/* 3. Section: Product Grid (Suggested / ADs) with Loading State */}
        <div className="md:bg-white md:dark:bg-slate-900 md:p-6 md:rounded-2xl md:shadow-sm md:border md:border-slate-100 md:dark:border-slate-800 min-h-[400px]">
          <div className="flex items-center justify-between mb-3 md:mb-5">
            <h2 className="text-lg md:text-xl font-bold text-slate-800 tracking-tight dark:text-slate-100">
              Suggested For You
            </h2>
            <button className="hidden md:flex bg-slate-900 text-white px-4 py-1.5 rounded-lg text-sm font-bold items-center gap-1 hover:bg-primary transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {loadingProducts ? (
            <div className="flex flex-col items-center justify-center h-64 text-slate-400">
               <Loader2 className="w-8 h-8 animate-spin mb-4 text-primary" />
               <p className="font-medium">Loading best products for you...</p>
            </div>
          ) : (
            <InfiniteScroll
              dataLength={items.length}
              next={fetchMoreData}
              hasMore={items.length < (window.innerWidth < 768 ? 1000 : 200)}
              loader={
                <div className="flex justify-center py-6 col-span-full w-full">
                  <div className="w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              }
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-5"
            >
              {items.map((product, idx) => (
                <div
                  key={`${product.id}-${idx}`}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="bg-white rounded-xl md:rounded-2xl p-2 md:p-4 shadow-sm border border-slate-100 hover:shadow-lg hover:border-primary/30 transition-all duration-300 group relative cursor-pointer flex flex-col dark:bg-slate-900 dark:border-slate-800"
                >
                  <div className="absolute top-2 right-2 md:top-3 md:right-3 z-10">
                    <span className="bg-white/90 text-slate-500 border border-slate-200 text-[8px] md:text-[9px] font-bold px-1 py-0.5 rounded shadow-sm dark:text-slate-400 dark:border-slate-700">
                      AD
                    </span>
                  </div>

                  {/* Image */}
                  <div className="bg-slate-50 h-36 md:h-48 rounded-lg md:rounded-xl mb-3 flex items-center justify-center overflow-hidden group-hover:bg-indigo-50/30 transition-colors dark:bg-slate-200">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal"
                    />
                  </div>

                  <div className="px-1 flex-1 flex flex-col">
                    <h3 className="font-bold text-slate-800 text-xs md:text-sm line-clamp-2 leading-tight group-hover:text-primary transition-colors dark:text-slate-100">
                      {product.title}
                    </h3>
                    <div className="mt-auto pt-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm md:text-base font-black text-slate-900 dark:text-white">
                          ₹{product.price}
                        </span>
                        <span className="text-[10px] md:text-xs text-slate-400 line-through font-medium">
                          ₹{product.originalPrice}
                        </span>
                      </div>
                      <div className="text-[10px] md:text-xs font-bold text-emerald-600 mt-0.5">
                        {product.discount}% off
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </InfiniteScroll>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
