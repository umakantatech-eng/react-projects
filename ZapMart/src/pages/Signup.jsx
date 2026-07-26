import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User as UserIcon, AlertCircle } from "lucide-react";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || name.trim().length < 2) { setError("Please enter your full name (at least 2 characters)."); return; }
    if (!email.trim()) { setError("Please enter a valid email address."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters long."); return; }

    let users = [];
    try {
      const storedUsers = localStorage.getItem("usersDB");
      if (storedUsers) users = JSON.parse(storedUsers);
    } catch(err) {}

    if (users.some(u => u.email === email)) {
      setError("This email is already registered. Please sign in instead.");
      return;
    }

    users.push({ name: name.trim(), email, password });
    localStorage.setItem("usersDB", JSON.stringify(users));

    dispatch(loginUser({ name: name.trim(), email }));
    dispatch({ type: "toast/showToast", payload: { message: `Welcome to ZapMart, ${name.trim()}! 🎉`, type: "success" } });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row dark:bg-slate-950">
      <div className="hidden md:flex md:w-[40%] bg-primary flex-col justify-center items-center p-12 text-white text-center relative overflow-hidden">
        <h2 className="text-3xl font-bold mb-4 z-10">Join ZapMart today!</h2>
        <p className="text-lg text-blue-100 z-10 font-medium">Get access to exclusive deals, personalized recommendations, and much more.</p>
        <div className="absolute bottom-[-100px] left-[-100px] w-64 h-64 bg-secondary rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-teal-400 rounded-full opacity-30 blur-2xl"></div>
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-24">
        <div className="max-w-md w-full mx-auto">
          <div className="text-center md:text-left mb-10">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2 dark:text-white">Create an account</h1>
            <p className="text-slate-500 font-medium text-sm dark:text-slate-400">Start your shopping journey with us.</p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-5 flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 dark:text-slate-200">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <UserIcon className="w-4 h-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setError(""); }}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-slate-800 dark:bg-slate-900 dark:border-slate-600 dark:text-slate-100"
                  placeholder="Umakant Sharma"
                  autoComplete="name"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 dark:text-slate-200">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Mail className="w-4 h-4 text-slate-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-slate-800 dark:bg-slate-900 dark:border-slate-600 dark:text-slate-100"
                  placeholder="you@gmail.com"
                  autoComplete="email"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 dark:text-slate-200">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Lock className="w-4 h-4 text-slate-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  className="w-full pl-10 pr-12 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-slate-800 dark:bg-slate-900 dark:border-slate-600 dark:text-slate-100"
                  placeholder="Min. 6 characters"
                  autoComplete="new-password"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-1 ml-1">At least 6 characters</p>
            </div>
            <button type="submit" className="w-full bg-primary text-white py-3.5 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-md mt-2">
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            Already have an account? <Link to="/login" className="text-primary font-bold cursor-pointer hover:underline">Sign in</Link>
          </div>
          <div className="mt-4 text-center">
            <Link to="/" className="text-slate-400 font-medium text-xs hover:text-slate-600 transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
