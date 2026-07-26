import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../redux/cartSlice";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";

const Cart = () => {
  // Redux se data aur dispatch function le rahe hain
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Total price calculate karne ka simple logic
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalDiscount = cartItems.reduce((total, item) => total + (item.originalPrice - item.price) * item.quantity, 0);

  // Agar cart khali hai toh empty message dikhao
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <img src="https://placehold.co/200x200/transparent/334155?text=Empty+Cart" alt="Empty" className="mb-6 opacity-50" />
        <h2 className="text-2xl font-bold text-slate-800 mb-2 dark:text-slate-100">Your cart is empty!</h2>
        <p className="text-slate-500 mb-6 dark:text-slate-400">Add items to it now.</p>
        <Link to="/shop">
          <button className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors">
            Shop Now
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <h1 className="text-2xl font-bold text-slate-800 mb-6 dark:text-slate-100">Shopping Cart ({cartItems.length} items)</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side: Cart Items List */}
        <div className="flex-1 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex gap-4 relative group dark:bg-slate-900 dark:border-slate-800">
              {/* Product Image */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-slate-50 rounded-lg overflow-hidden shrink-0 dark:bg-slate-950">
                <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal" />
              </div>

              {/* Product Details */}
              <div className="flex-1 flex flex-col">
                <h3 className="font-bold text-slate-800 text-sm sm:text-base line-clamp-2 dark:text-slate-100">{item.title}</h3>
                
                <div className="mt-1 flex items-center gap-2">
                  <span className="font-black text-lg text-slate-900 dark:text-white">₹{item.price}</span>
                  <span className="text-xs text-slate-400 line-through">₹{item.originalPrice}</span>
                  <span className="text-xs font-bold text-emerald-600">{item.discount}% off</span>
                </div>
                
                <div className="mt-auto pt-4 flex items-center justify-between">
                  {/* Quantity Controller */}
                  <div className="flex items-center gap-3 border border-slate-200 rounded-lg px-2 py-1 w-fit dark:border-slate-700">
                    <button 
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                      className="p-1 text-slate-500 hover:text-primary transition-colors disabled:opacity-50 dark:text-slate-400"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => dispatch(increaseQuantity(item.id))}
                      className="p-1 text-slate-500 hover:text-primary transition-colors dark:text-slate-400"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button 
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-red-500 font-medium text-sm flex items-center gap-1 p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" /> <span className="hidden sm:inline">Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Price Details (Bill) */}
        <div className="w-full lg:w-[380px] shrink-0">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 sticky top-[104px] dark:bg-slate-900 dark:border-slate-800">
            <h2 className="font-bold text-slate-500 uppercase tracking-wider text-sm border-b border-slate-100 pb-4 mb-4 dark:text-slate-400 dark:border-slate-800">
              Price Details
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-slate-700 dark:text-slate-200">
                <span>Price ({cartItems.length} items)</span>
                <span>₹{totalPrice + totalDiscount}</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-medium">
                <span>Discount</span>
                <span>- ₹{totalDiscount}</span>
              </div>
              <div className="flex justify-between text-slate-700 dark:text-slate-200">
                <span>Delivery Charges</span>
                <span className="text-emerald-600 font-medium">Free</span>
              </div>
            </div>
            
            <div className="flex justify-between font-black text-lg text-slate-900 border-t border-dashed border-slate-200 pt-4 mb-6 dark:text-white dark:border-slate-700">
              <span>Total Amount</span>
              <span>₹{totalPrice}</span>
            </div>
            
            <p className="text-emerald-600 font-bold text-sm mb-6 bg-emerald-50 p-2 rounded-lg text-center">
              You will save ₹{totalDiscount} on this order
            </p>
            
            <Link to="/checkout">
              <button className="w-full bg-primary text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-md">
                Place Order <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
