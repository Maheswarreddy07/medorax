// src/components/authentication/login/LoginForm/LoginForm.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../../assets/WhatsApp_Image_2026-06-22_at_5.25.21_PM-removebg-preview.png";

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    // Simulate API call
    console.log({ email, password, rememberMe });
    
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to verify email with email in state
      navigate("/verify-email", { 
        state: { 
          email: email,
          from: "login"
        } 
      });
    }, 1500);
  };

  return (
    <div className="w-full max-w-md flex flex-col justify-center h-full py-2">
      <div className="flex justify-center">
        <img
          alt="Medorax Logo"
          className="h-24 w-auto object-contain"
          src={logo}
        />
      </div>

      <div className="text-center mb-6">
        <h1 className="text-[32px] leading-[40px] font-semibold tracking-[-0.01em] text-[#121c2a]">
          Welcome Back
        </h1>
        <p className="text-[16px] leading-[24px] font-normal text-[#424751]">
          Access your medical management dashboard
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            className="block text-[14px] leading-[20px] font-medium tracking-[0.01em] text-[#424751] mb-1.5"
            htmlFor="email"
          >
            Email or Mobile Number
          </label>
          <input
            id="email"
            type="text"
            className="w-full h-11 px-4 rounded border border-[#c2c6d3] bg-[#ffffff] text-[16px] leading-[24px] font-normal text-[#121c2a] focus:outline-none focus:border-[#004287] focus:ring-2 focus:ring-[#004287]/20 transition-all placeholder:text-[#737782]/50"
            placeholder="name@clinic.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label
              className="block text-[14px] leading-[20px] font-medium tracking-[0.01em] text-[#424751]"
              htmlFor="password"
            >
              Password
            </label>
            <Link
              to="/forgot-password"
              className="text-[12px] leading-[16px] font-semibold hover:underline transition-all text-[#424751]"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="w-full h-11 px-4 rounded border border-[#c2c6d3] bg-[#ffffff] text-[16px] leading-[24px] font-normal text-[#121c2a] focus:outline-none focus:border-[#004287] focus:ring-2 focus:ring-[#004287]/20 transition-all placeholder:text-[#737782]/50 pr-12"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#737782] hover:text-[#004287] transition-colors"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <span className="material-symbols-outlined text-xl">
                {showPassword ? "visibility" : "visibility_off"}
              </span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            id="remember"
            type="checkbox"
            className="w-3.5 h-3.5 rounded-sm border-[#c2c6d3] text-[#004287] focus:ring-[#004287]"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label
            className="text-[14px] leading-[20px] font-normal text-[#424751] cursor-pointer"
            htmlFor="remember"
          >
            Remember this device for 30 days
          </label>
        </div>

        {error && (
          <p className="text-[14px] leading-[20px] font-normal text-[#ba1a1a] text-center">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full h-11 bg-[#004287] hover:bg-[#1e5aa8] transition-all text-[#ffffff] text-[14px] leading-[20px] font-semibold tracking-[0.01em] rounded shadow-sm flex items-center justify-center gap-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="material-symbols-outlined text-[20px] animate-spin">refresh</span>
              Signing In...
            </>
          ) : (
            "Sign In"
          )}
        </button>

        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-[#c2c6d3]"></div>
          <span className="text-[12px] leading-[16px] font-semibold text-[#737782]">OR</span>
          <div className="flex-1 h-px bg-[#c2c6d3]"></div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            type="button"
            className="flex items-center justify-center w-full h-11 border border-[#c2c6d3] rounded hover:bg-[#eff4ff] transition-all gap-2.5"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="text-[12px] leading-[16px] font-medium tracking-[0.02em] text-[#121c2a]">
              Sign in With Google
            </span>
          </button>
        </div>
      </form>

      <div className="mt-4 text-center">
        <p className="text-[14px] leading-[20px] font-normal text-[#424751]">
          Don't have an account?
          <a
            className="text-[14px] leading-[20px] font-semibold tracking-[0.01em] hover:underline transition-all text-[#004287] ml-1"
            href="#"
          >
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
}