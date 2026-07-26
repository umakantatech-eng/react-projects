import { ShoppingCart, Zap, Star, Shield, Tag, ChevronRight, Check, Heart } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import productsData from "../data/products.json";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlistItems.some((item) => item.id === id);

  const product = productsData.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Product Not Found</h2>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    dispatch({ type: "toast/showToast", payload: { message: `${product.title} Cart me add ho gaya! 🛒`, type: "success" } });
  };

  const handleToggleWishlist = () => {
    dispatch({ type: "wishlist/toggleWishlist", payload: product });
    dispatch({
      type: "toast/showToast",
      payload: {
        message: isWishlisted ? "Wishlist se hata diya!" : `${product.title} Wishlist me add ho gaya! ❤️`,
        type: isWishlisted ? "error" : "success"
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-0 sm:px-4 lg:px-8 py-0 sm:py-4 bg-white sm:bg-transparent min-h-screen dark:bg-slate-900">
      <div className="bg-white sm:shadow-sm sm:rounded-sm flex flex-col md:flex-row dark:bg-slate-900">
        
        {/* Left Side: Images & Actions */}
        <div className="w-full md:w-2/5 p-4 border-r border-gray-100 sticky top-[104px] md:top-[72px] h-fit">
          <div className="flex gap-2 h-72 md:h-96">
            {/* Thumbnails */}
            <div className="w-16 flex flex-col gap-2 overflow-y-auto hide-scrollbar">
              {[1,2,3,4].map(i => (
                <div key={i} className={`w-12 h-12 md:w-16 md:h-16 border rounded cursor-pointer flex items-center justify-center overflow-hidden ${i===1 ? 'border-primary' : 'border-gray-200'}`}>
                  <img src={product.images[0]} alt="thumb" className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal opacity-70 hover:opacity-100" />
                </div>
              ))}
            </div>
            
            {/* Main Image */}
            <div className="flex-1 border border-gray-100 rounded flex items-center justify-center relative cursor-crosshair p-4 group">
               <img src={product.images[0]} alt={product.title} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-110 transition-transform duration-300" />
               <button
                 onClick={handleToggleWishlist}
                 className={`absolute top-2 right-2 rounded-full p-2 cursor-pointer transition-all hover:scale-110 ${isWishlisted ? 'bg-red-50' : 'bg-gray-100 hover:bg-red-50'}`}
               >
                 <Heart className={`w-5 h-5 transition-colors ${isWishlisted ? 'text-red-500 fill-red-500' : 'text-gray-400 hover:text-red-500'}`} />
               </button>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2 mt-4">
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-[#ff9f00] hover:bg-[#f39803] text-white font-bold py-3 md:py-3.5 px-2 md:px-4 rounded shadow-sm flex items-center justify-center gap-1 md:gap-2 text-sm md:text-lg"
            >
              <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 fill-current" /> ADD TO CART
            </button>
            <Link to="/checkout" className="flex-1 bg-[#fb641b] hover:bg-[#f25c14] text-white font-bold py-3 md:py-3.5 px-2 md:px-4 rounded shadow-sm flex items-center justify-center gap-1 md:gap-2 text-sm md:text-lg">
              <Zap className="w-4 h-4 md:w-5 md:h-5 fill-current" /> BUY NOW
            </Link>
          </div>
        </div>

        {/* Right Side: Product Info */}
        <div className="w-full md:w-3/5 p-4 sm:p-6">
          {/* Breadcrumb */}
          <div className="text-xs text-gray-500 mb-2 flex items-center gap-1">
            <Link to="/" className="hover:text-primary">Home</Link> <ChevronRight className="w-3 h-3" /> 
            <Link to={`/shop?category=${product.category}`} className="hover:text-primary">{product.category}</Link> <ChevronRight className="w-3 h-3" /> 
            <span className="font-semibold text-gray-800 line-clamp-1">{product.title}</span>
          </div>

          <h1 className="text-lg md:text-2xl text-gray-900 font-medium leading-tight mt-2">{product.title}</h1>
          
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-green-600 text-white text-xs px-1.5 py-0.5 rounded flex items-center font-bold">
              {product.rating} <Star className="w-3 h-3 ml-1 fill-current" />
            </span>
            <span className="text-gray-500 text-xs md:text-sm font-medium cursor-pointer hover:text-primary">{product.reviews.toLocaleString()} Ratings & Reviews</span>
            <span className="text-green-600 font-medium text-xs md:text-sm ml-2 bg-green-50 px-1 rounded hidden md:inline-block">Extra Discount</span>
          </div>

          <div className="mt-4 flex items-end gap-3">
            <span className="text-3xl md:text-4xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
            <span className="text-gray-500 line-through text-sm md:text-base mb-1">₹{product.originalPrice.toLocaleString()}</span>
            <span className="text-green-600 font-bold text-sm md:text-base mb-1">{product.discount}% off</span>
          </div>
          <p className="text-xs font-medium mt-1 text-slate-500 dark:text-slate-400">Free delivery available</p>

          {/* Offers */}
          <div className="mt-6 border-t border-slate-100 pt-6 dark:border-slate-800">
            <h3 className="font-semibold mb-3 text-slate-800 dark:text-slate-100">Available offers</h3>
            <div className="space-y-2.5 text-sm text-gray-700">
              <p className="flex gap-2 items-start"><Tag className="w-4 h-4 text-green-600 shrink-0 mt-0.5" /> <span><b>Bank Offer:</b> 10% off on HDFC Bank Credit Card EMI Transactions, up to ₹1,500.</span></p>
              <p className="flex gap-2 items-start"><Tag className="w-4 h-4 text-green-600 shrink-0 mt-0.5" /> <span><b>Bank Offer:</b> 5% Cashback on Flipkart Axis Bank Card.</span></p>
              <p className="flex gap-2 items-start"><Tag className="w-4 h-4 text-green-600 shrink-0 mt-0.5" /> <span><b>Special Price:</b> Get extra {product.discount}% off (price inclusive of cashback/coupon).</span></p>
            </div>
          </div>

          {/* Delivery */}
          <div className="mt-6 flex flex-col md:flex-row gap-2 md:gap-16 border-t border-slate-100 pt-6 dark:border-slate-800">
            <div className="w-24 text-sm text-gray-500 font-semibold hidden md:block">Delivery</div>
            <div>
              <div className="flex items-center border-b-2 border-primary pb-1 w-fit">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mr-2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                <input type="text" placeholder="Enter Delivery Pincode" className="outline-none text-sm font-medium w-40" />
                <span className="text-primary font-medium text-sm cursor-pointer">Check</span>
              </div>
              <p className="text-sm font-bold mt-3">Delivery by Tomorrow | <span className="text-green-600 font-bold">Free</span> <span className="text-gray-500 line-through">₹40</span></p>
            </div>
          </div>

          {/* Highlights & Seller */}
          <div className="mt-6 flex gap-4 sm:gap-16 border-t border-slate-100 pt-6 dark:border-slate-800">
            <div className="w-24 text-sm text-gray-500 font-semibold hidden md:block">Highlights</div>
            <ul className="text-sm text-gray-800 space-y-2 list-disc pl-4">
              <li>Premium Quality {product.category} Product</li>
              <li>Highly rated ({product.rating} Stars) by {product.reviews} users</li>
              <li>1 Year Brand Warranty</li>
              <li>7 Days Replacement Policy</li>
              <li>Cash on Delivery available</li>
            </ul>
          </div>
          
          <div className="mt-6 flex gap-4 sm:gap-16 border-t border-slate-100 pt-6 dark:border-slate-800">
            <div className="w-24 text-sm text-gray-500 font-semibold hidden md:block">Seller</div>
            <div className="text-sm">
              <div className="flex items-center gap-2">
                 <span className="font-bold text-primary">ZapMart Retail</span>
                 <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center">
                    4.9 <Star className="w-2.5 h-2.5 ml-0.5 fill-white" />
                 </span>
              </div>
              <ul className="mt-2 text-gray-600 space-y-1">
                 <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-primary" /> 7 Days Replacement Policy</li>
                 <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-primary" /> GST invoice available</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
