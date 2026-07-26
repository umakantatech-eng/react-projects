import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle, MapPin, CreditCard } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { placeOrder } from "../redux/ordersSlice";
import { clearCart } from "../redux/cartSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  const totalPrice = cartItems.reduce((t, i) => t + i.price * i.quantity, 0);
  const totalDiscount = cartItems.reduce((t, i) => t + (i.originalPrice - i.price) * i.quantity, 0);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const newOrderId = "ZM" + Date.now().toString().slice(-8);
    const order = {
      id: newOrderId,
      items: cartItems,
      total: totalPrice,
      savings: totalDiscount,
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
      status: "Order Confirmed",
    };
    dispatch(placeOrder(order));
    dispatch(clearCart());
    setOrderId(newOrderId);
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-950">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md w-full border border-emerald-100 dark:bg-slate-900">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 mb-1 dark:text-slate-100">Order Confirmed!</h2>
          <p className="text-slate-500 text-sm mb-3 dark:text-slate-400">Your order has been placed successfully.</p>
          <div className="bg-slate-50 rounded-xl px-4 py-2 mb-6 inline-block dark:bg-slate-950">
            <span className="text-xs text-slate-500 dark:text-slate-400">Order ID: </span>
            <span className="font-black text-primary text-sm">#{orderId}</span>
          </div>
          <p className="text-slate-500 mb-6 text-sm dark:text-slate-400">Expected delivery: <span className="font-bold text-slate-800 dark:text-slate-100">2-3 business days</span></p>
          <div className="flex gap-3">
            <button onClick={() => navigate("/profile/orders")} className="flex-1 bg-slate-100 text-slate-700 px-4 py-2.5 rounded-lg font-bold hover:bg-slate-200 transition-colors text-sm dark:bg-slate-800 dark:text-slate-200">
              My Orders
            </button>
            <Link to="/" className="flex-1 bg-primary text-white px-4 py-2.5 rounded-lg font-bold hover:bg-primary/90 transition-colors text-sm text-center">
              Shop More
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-2xl font-bold text-slate-800 mb-8 dark:text-slate-100">Checkout</h1>
      <form onSubmit={handlePlaceOrder} className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
          <h2 className="text-lg font-bold flex items-center gap-2 mb-4 text-slate-800 dark:text-slate-100">
            <MapPin className="w-5 h-5 text-primary" /> Delivery Address
          </h2>
          <div className="space-y-4">
            <input required type="text" placeholder="Full Name" className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-primary dark:border-slate-700" />
            <input required type="tel" placeholder="Phone Number" className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-primary dark:border-slate-700" />
            <textarea required placeholder="Full Address (House No, Street, City, Pincode)" rows="3" className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-primary dark:border-slate-700"></textarea>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
          <h2 className="text-lg font-bold flex items-center gap-2 mb-4 text-slate-800 dark:text-slate-100">
            <CreditCard className="w-5 h-5 text-primary" /> Payment Method
          </h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:border-primary dark:border-slate-700">
              <input type="radio" name="payment" defaultChecked className="accent-primary w-4 h-4" />
              <span className="font-medium text-slate-700 dark:text-slate-200">Cash on Delivery (COD)</span>
            </label>
            <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:border-primary dark:border-slate-700">
              <input type="radio" name="payment" className="accent-primary w-4 h-4" />
              <span className="font-medium text-slate-700 dark:text-slate-200">Credit / Debit Card</span>
            </label>
            <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:border-primary dark:border-slate-700">
              <input type="radio" name="payment" className="accent-primary w-4 h-4" />
              <span className="font-medium text-slate-700 dark:text-slate-200">UPI / GPay</span>
            </label>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
          <div className="flex justify-between text-sm text-slate-600 mb-2 dark:text-slate-300">
            <span>Total ({cartItems.length} items)</span><span>₹{totalPrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm text-emerald-600 mb-2">
            <span>You Save</span><span>₹{totalDiscount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-black text-lg text-slate-900 border-t pt-3 mt-3 dark:text-white">
            <span>Total Payable</span><span>₹{totalPrice.toLocaleString()}</span>
          </div>
        </div>

        <button type="submit" className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-md">
          Confirm Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
