import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message.replace("Firebase: ", ""));
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
      <form 
        onSubmit={handleSubmit}
        className="bg-[#1A1A1A] rounded-xl p-8 w-full max-w-md border border-[#333] shadow-lg shadow-[#6E00FF]/10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-1">Welcome Back</h2>
          <p className="text-[#B3B3B3]">Sign in to your account</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-[#FF2D75]/10 text-[#FF2D75] text-sm rounded-md border border-[#FF2D75]/30">
            {error}
          </div>
        )}

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-[#B3B3B3] text-sm mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#0A0A0A] border border-[#333] rounded-lg px-4 py-3 text-white placeholder-[#555] focus:outline-none focus:ring-2 focus:ring-[#6E00FF] focus:border-transparent"
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-[#B3B3B3] text-sm mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#0A0A0A] border border-[#333] rounded-lg px-4 py-3 text-white placeholder-[#555] focus:outline-none focus:ring-2 focus:ring-[#6E00FF] focus:border-transparent"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#6E00FF] to-[#00A2FF] text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity mb-4"
        >
          Sign In
        </button>

        {/* Footer Links */}
        <div className="text-center text-sm text-[#B3B3B3]">
          <span>Don't have an account? </span>
          <Link to="/register" className="text-[#00F5FF] hover:underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;