import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideToast } from "../../redux/toastSlice";
import { CheckCircle2, XCircle, X } from "lucide-react";

const Toast = () => {
  const { message, type, isVisible } = useSelector((state) => state.toast);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 3000); // 3 seconds ke baad apne aap gayab
      return () => clearTimeout(timer);
    }
  }, [isVisible, dispatch]);

  if (!isVisible) return null;

  const isSuccess = type === "success";

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-top-5 fade-in duration-300">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl border ${isSuccess ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
        {isSuccess ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
        <span className="font-bold text-sm">{message}</span>
        <button onClick={() => dispatch(hideToast())} className="ml-2 hover:opacity-70 transition-opacity">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
