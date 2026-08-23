import { useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthNavbar from "../../components/authentication/shared/AuthNavbar";
import AuthFooter from "../../components/authentication/shared/AuthFooter";
import logo from "../../assets/WhatsApp_Image_2026-06-22_at_5.25.21_PM-removebg-preview.png";
import banner from "../../assets/verifyEmailimg.jpg";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);
  
  const email = location.state?.email || "user@example.com";

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      setError("");
      inputRefs.current[5].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setIsVerifying(true);
    setError("");
    
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }, 2000);
  };

  const handleResend = () => {
    const btn = document.getElementById("resend-btn");
    const originalText = btn.innerText;
    btn.innerText = "Sending...";
    btn.classList.add("opacity-50", "pointer-events-none");
    
    setTimeout(() => {
      btn.innerText = "Sent!";
      setTimeout(() => {
        btn.innerText = originalText;
        btn.classList.remove("opacity-50", "pointer-events-none");
      }, 2000);
    }, 1500);
  };

  return (
    <div className="h-screen flex flex-col bg-[#f8f9ff] overflow-hidden">
      <AuthNavbar />
      
      <main className="flex-1 flex overflow-hidden">
        <div className="hidden lg:flex lg:w-1/2 bg-[#eff4ff] items-center justify-center px-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div 
              className="absolute inset-0" 
              style={{ 
                backgroundImage: "radial-gradient(#004287 1px, transparent 1px)", 
                backgroundSize: "40px 40px" 
              }}
            ></div>
          </div>
          <div className="relative z-10 max-w-md text-center">
            <div className="mb-4 rounded-xl shadow-sm p-2 bg-white">
              <img
                alt="Email Security Illustration"
                className="w-full h-auto object-cover rounded-lg"
                src={banner}
              />
            </div>
            <h2 className="text-[24px] leading-[32px] font-semibold text-[#004287] mb-2">
              Advanced Security for Your Health Data
            </h2>
            <p className="text-[16px] leading-[24px] font-normal text-[#424751]">
              We use military-grade encryption to ensure your medical records and personal information remain private and secure.
            </p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 md:px-8 bg-white overflow-hidden">
          <div className="max-w-md w-full">
            <div className="flex justify-center mb-4">
              <img
                alt="Medorax"
                className="h-24 w-auto object-contain"
                src={logo}
              />
            </div>

            <div className="text-center mb-6">
              <h1 className="text-[32px] leading-[40px] font-semibold tracking-[-0.01em] text-[#121c2a] mb-2">
                Verify Your Email
              </h1>
              <p className="text-[16px] leading-[24px] font-normal text-[#424751]">
                We've sent a 6-digit verification code to <strong>{email}</strong>. Please enter it below to secure your account.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <div className="flex justify-between gap-2 md:gap-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength="1"
                      pattern="\d*"
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      className={`w-full h-14 md:h-16 text-center text-[24px] leading-[32px] font-semibold border rounded-lg bg-[#ffffff] focus:border-[#004287] focus:ring-2 focus:ring-[#004287]/20 transition-all outline-none ${
                        error ? 'border-[#ba1a1a]' : 'border-[#c2c6d3]'
                      }`}
                      disabled={isVerified}
                      autoFocus={index === 0}
                    />
                  ))}
                </div>
                {error && (
                  <p className="text-[14px] leading-[20px] font-normal text-[#ba1a1a] text-center mt-2">
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full h-12 bg-[#004287] hover:bg-[#1e5aa8] transition-all text-[#ffffff] text-[14px] leading-[20px] font-semibold tracking-[0.01em] rounded-lg flex items-center justify-center gap-2 active:scale-95 duration-100 shadow-sm"
                disabled={isVerifying || isVerified}
              >
                {isVerifying ? (
                  <>
                    <span className="material-symbols-outlined text-[20px] animate-spin">refresh</span>
                    Verifying...
                  </>
                ) : isVerified ? (
                  <>
                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                    Verified Successfully!
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[20px]">verified</span>
                    Verify & Proceed
                  </>
                )}
              </button>

              <div className="text-center">
                <p className="text-[14px] leading-[20px] font-normal text-[#424751]">
                  Didn't receive a code?{" "}
                  <button
                    id="resend-btn"
                    type="button"
                    className="text-[#004287] font-semibold hover:underline ml-1 transition-all"
                    onClick={handleResend}
                  >
                    Resend Code
                  </button>
                </p>
              </div>
            </form>

            <div className="mt-6 pt-4 border-t border-[#c2c6d3] flex flex-col md:flex-row justify-center items-center gap-4">
            <Link
                to="/login"
                className="text-[12px] leading-[16px] font-medium tracking-[0.02em] text-[#004287] flex items-center gap-1 transition-colors group"
            >
                <span className="material-symbols-outlined text-[18px] group-hover:no-underline">
                arrow_back
                </span>
                <span className="hover:underline transition-all">
                Back to Login
                </span>
            </Link>
            <div className="hidden md:block w-1 h-1 bg-[#c2c6d3] rounded-full"></div>
            <a
                href="#"
                className="text-[12px] leading-[16px] font-medium tracking-[0.02em] text-[#004287] flex items-center gap-1 transition-colors group"
            >
                <span className="material-symbols-outlined text-[18px] group-hover:no-underline">
                help
                </span>
                <span className="hover:underline transition-all">
                Help Center
                </span>
            </a>
            </div>
          </div>
        </div>
      </main>

      <AuthFooter />
    </div>
  );
}