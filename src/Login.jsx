import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("finsyncUser"));

    if (!storedUser) {
      setError("No user found. Please sign up first.");
      return;
    }

    if (email === storedUser.email && password === storedUser.password) {
      localStorage.setItem("loggedInUser", JSON.stringify(storedUser));
      navigate("/dashboard");
    } else {
      setError("Incorrect email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#7E62E6] via-[#8F79F0] to-[#B49CFF] px-4">
      <div className="w-full max-w-sm bg-white/30 backdrop-blur-xl shadow-2xl rounded-3xl p-10 border border-white/20">
        
        <h1 className="text-4xl font-extrabold text-center mb-6 text-[#7E62E6] drop-shadow-lg">
          Finsync
        </h1>

        {error && (
          <p className="text-red-600 text-center mb-4 font-medium">{error}</p>
        )}

        <form className="flex flex-col gap-5" onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7E62E6] z-10" size={20} />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/30 focus:border-[#7E62E6] focus:ring-1 focus:ring-[#7E62E6] bg-white/70 backdrop-blur-sm placeholder:text-gray-500 transition-all z-0 relative"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7E62E6] z-10" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-white/30 focus:border-[#7E62E6] focus:ring-1 focus:ring-[#7E62E6] bg-white/70 backdrop-blur-sm placeholder:text-gray-500 transition-all z-0 relative"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 text-[#7E62E6] hover:text-[#9167f4] transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button className="w-full bg-[#7E62E6] hover:bg-[#9167f4] text-white font-semibold py-3 rounded-xl transition-colors shadow-md hover:shadow-lg">
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-white/90">
          Don’t have an account?
          <Link to="/signup" className="text-[#7E62E6] ml-1 underline font-medium hover:text-[#9167f4] transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
