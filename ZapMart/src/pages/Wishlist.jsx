import { Heart, ArrowLeft, ShoppingCart, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const Wishlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    dispatch({ type: "toast/showToast", payload: { message: `${product.title} cart me add ho gaya! 🛒`, type: "success" } });
  };

  const handleRemove = (product) => {
    dispatch({ type: "wishlist/toggleWishlist", payload: product });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-10 min-h-[calc(100vh-140px)]">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-rose-500 mb-6 transition-colors dark:text-slate-400">
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      <h1 className="text-2xl font-bold text-slate-800 mb-6 dark:text-slate-100">
        My Wishlist <span className="text-base font-normal text-slate-400">({wishlistItems.length} items)</span>
      </h1>

      {wishlistItems.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-16 flex flex-col items-center justify-center text-center dark:bg-slate-900 dark:border-slate-800">
          <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mb-6">
            <Heart className="w-12 h-12 text-rose-500 fill-rose-500/20" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2 dark:text-slate-100">Your Wishlist is Empty</h2>
          <p className="text-slate-500 mb-8 max-w-md dark:text-slate-400">Save items that you like by tapping the heart icon on any product.</p>
          <button onClick={() => navigate('/shop')} className="bg-rose-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-rose-600 transition-colors">
            Explore Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {wishlistItems.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all group dark:bg-slate-900 dark:border-slate-800">
              {/* Image */}
              <div className="h-36 md:h-44 bg-slate-50 relative cursor-pointer dark:bg-slate-950" onClick={() => navigate(`/product/${product.id}`)}>
                <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-300" />
                <button
                  onClick={(e) => { e.stopPropagation(); handleRemove(product); }}
                  className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-red-50 transition-colors dark:bg-slate-900"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
              {/* Info */}
              <div className="p-3">
                <h3 className="text-xs md:text-sm font-semibold text-slate-800 line-clamp-2 mb-2 dark:text-slate-100">{product.title}</h3>
                <div className="flex items-center gap-1 mb-3">
                  <span className="font-black text-slate-900 text-sm dark:text-white">₹{product.price.toLocaleString()}</span>
                  <span className="text-[10px] text-slate-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                  <span className="text-[10px] font-bold text-emerald-600">{product.discount}% off</span>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full py-2 bg-primary/10 text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-colors text-xs md:text-sm flex items-center justify-center gap-1"
                >
                  <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
