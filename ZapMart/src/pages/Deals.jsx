import { useNavigate } from "react-router-dom";
import productsData from "../data/products.json";

const Deals = () => {
  const navigate = useNavigate();
  // Show products with 20% or more discount
  const deals = productsData.filter(p => p.discount >= 20).sort((a, b) => b.discount - a.discount);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 min-h-[calc(100vh-140px)]">
      <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 md:p-10 rounded-2xl mb-8 text-white shadow-md">
        <h1 className="text-3xl md:text-5xl font-black mb-2">Super Deals</h1>
        <p className="font-medium text-white/90 text-sm md:text-lg">Up to 35% Off on premium products. Limited time only!</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">
        {deals.map((product, idx) => (
          <div
            key={`${product.id}-${idx}`}
            onClick={() => navigate(`/product/${product.id}`)}
            className="bg-white rounded-xl md:rounded-2xl p-2 md:p-4 shadow-sm border border-slate-100 hover:shadow-lg hover:border-primary/30 transition-all duration-300 group relative cursor-pointer flex flex-col dark:bg-slate-900 dark:border-slate-800"
          >
            <div className="absolute top-2 left-2 md:top-3 md:left-3 z-10">
              <span className="bg-red-500 text-white text-[10px] md:text-xs font-black px-2 py-1 rounded shadow-sm">
                {product.discount}% OFF
              </span>
            </div>

            <div className="bg-slate-50 h-36 md:h-48 rounded-lg md:rounded-xl mb-3 flex items-center justify-center overflow-hidden group-hover:bg-indigo-50/30 transition-colors dark:bg-slate-950">
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deals;
