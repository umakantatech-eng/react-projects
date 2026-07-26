import { Package, ArrowLeft, ChevronRight, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Orders = () => {
  const navigate = useNavigate();
  const orders = useSelector((state) => state.orders.items);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-10 min-h-[calc(100vh-140px)]">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-primary mb-6 transition-colors dark:text-slate-400">
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      <h1 className="text-2xl font-bold text-slate-800 mb-6 dark:text-slate-100">
        My Orders <span className="text-base font-normal text-slate-400">({orders.length} orders)</span>
      </h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-16 flex flex-col items-center justify-center text-center dark:bg-slate-900 dark:border-slate-800">
          <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
            <Package className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2 dark:text-slate-100">No Orders Yet</h2>
          <p className="text-slate-500 mb-8 max-w-md dark:text-slate-400">Looks like you haven't made your first purchase yet!</p>
          <button onClick={() => navigate('/shop')} className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors">
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all dark:bg-slate-900 dark:border-slate-800">
              {/* Order Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/50 dark:border-slate-800">
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Order ID</span>
                  <p className="font-black text-primary text-sm">#{order.id}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Placed on</span>
                  <p className="font-bold text-slate-700 text-sm dark:text-slate-200">{order.date}</p>
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span className="text-xs font-bold">{order.status}</span>
                </div>
              </div>

              {/* Order Items */}
              <div className="divide-y divide-slate-50">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 px-5 py-3">
                    <div className="w-14 h-14 bg-slate-50 rounded-xl overflow-hidden shrink-0 dark:bg-slate-950">
                      <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800 text-sm line-clamp-1 dark:text-slate-100">{item.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5 dark:text-slate-400">Qty: {item.quantity} × ₹{item.price.toLocaleString()}</p>
                    </div>
                    <p className="font-black text-slate-900 text-sm shrink-0 dark:text-white">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              {/* Order Footer */}
              <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100 bg-slate-50/30 dark:border-slate-800">
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Total Paid</span>
                  <p className="font-black text-lg text-slate-900 dark:text-white">₹{order.total.toLocaleString()}</p>
                  {order.savings > 0 && <p className="text-xs text-emerald-600 font-bold">Saved ₹{order.savings.toLocaleString()}</p>}
                </div>
                <button className="flex items-center gap-1 text-primary font-bold text-sm hover:bg-primary/10 px-3 py-2 rounded-lg transition-colors">
                  View Details <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
