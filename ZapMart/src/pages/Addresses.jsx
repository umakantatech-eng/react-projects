import { MapPin, ArrowLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Addresses = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-10 min-h-[calc(100vh-140px)]">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors dark:text-slate-400">
          <ArrowLeft className="w-5 h-5" /> Back to Profile
        </button>
        <button className="flex items-center gap-1 text-emerald-600 font-bold hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors">
          <Plus className="w-4 h-4" /> Add New
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-16 flex flex-col items-center justify-center text-center dark:bg-slate-900 dark:border-slate-800">
        <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
          <MapPin className="w-12 h-12 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2 dark:text-slate-100">No Saved Addresses</h2>
        <p className="text-slate-500 mb-8 max-w-md dark:text-slate-400">Add your home and office addresses for a faster checkout experience.</p>
        <button className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors flex items-center gap-2">
          <Plus className="w-5 h-5" /> Add Address
        </button>
      </div>
    </div>
  );
};

export default Addresses;
