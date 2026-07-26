import { useRouteError, Link } from "react-router-dom";
import { AlertOctagon } from "lucide-react";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center dark:bg-slate-950">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-slate-100 max-w-lg w-full flex flex-col items-center dark:bg-slate-900 dark:border-slate-800">
        <div className="bg-red-50 p-4 rounded-full mb-6 text-red-500">
          <AlertOctagon className="w-16 h-16" />
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight dark:text-white">
          Aise nahi kar sakte 🛑
        </h1>
        <p className="text-slate-500 font-medium text-lg mb-8 leading-relaxed dark:text-slate-400">
          Ya toh ye page exist nahi karta, ya fir yahan aane ki permission nahi hai. URL check karein ya wapas home page pe jaayein.
        </p>
        <Link 
          to="/" 
          className="bg-primary text-white px-8 py-3.5 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-md hover:shadow-lg w-full md:w-auto"
        >
          Wapas Home Jayein
        </Link>
      </div>
    </div>
  );
}
