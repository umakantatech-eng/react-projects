import { Link } from "react-router-dom";
import categoriesData from "../data/categories.json";

const Categories = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 min-h-[calc(100vh-140px)]">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6 md:mb-8 dark:text-slate-100">Shop by Category</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {categoriesData.map((category) => (
          <Link 
            key={category.id} 
            to={`/shop?category=${encodeURIComponent(category.name)}`}
            className="group bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:shadow-md hover:border-primary/30 transition-all flex flex-col items-center justify-center text-center gap-4 cursor-pointer dark:bg-slate-900 dark:border-slate-800"
          >
            <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-slate-50 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300 dark:bg-slate-950">
              <img src={category.image} alt={category.name} className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal" />
            </div>
            <h3 className="font-bold text-slate-700 group-hover:text-primary transition-colors text-sm md:text-base dark:text-slate-200">
              {category.name}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
