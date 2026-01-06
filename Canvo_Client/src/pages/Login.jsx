import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

// Firebase services YOU already created
import {
  loginAccount,
  googleLogin,
  resetPassword,
} from "../services/authServices";
import useFirebaseError from "../hooks/useFirebaseError";

export default function Login() {
  const { mapError } = useFirebaseError();

  const emailRef = useRef(null);

  const [email, setEmail] = useState(localStorage.getItem("convo_email") || "");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [remember, setRemember] = useState(
    !!localStorage.getItem("convo_email")
  );

  const navigate = useNavigate();

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  // Trigger shake animation on error
  const triggerError = (message) => {
    toast.error(message);
    setShake(true);
    setTimeout(() => setShake(false), 600);
  };

  // -------------------- LOGIN HANDLER --------------------
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) return triggerError("Please fill out all fields");
    if (!email.includes("@")) return triggerError("Enter a valid email");

    setLoading(true);

    try {
      await loginAccount(email, password);

      // Save remember email
      if (remember) localStorage.setItem("convo_email", email);
      else localStorage.removeItem("convo_email");

      toast.success("Logged in successfully!");

      // redirect later
      navigate("/chat");
    } catch (err) {
      const clean = mapError(err.code);
      triggerError(clean);
    }

    setLoading(false);
  };

  // -------------------- GOOGLE LOGIN --------------------
 const handleGoogle = async () => {
  setGoogleLoading(true);

  // store toast id
  const t = toast.loading("Redirecting to Google…");

  try {
    await googleLogin();

    toast.dismiss(t); // remove loading

    toast.success("Google login successful!");
    navigate("/chat");

  } catch (err) {
    toast.dismiss(t); // must dismiss loading toast first

    const clean = mapError(err.code);
    toast.error(clean); // now error shows properly
  }

  setGoogleLoading(false);
};


  // -------------------- RESET PASSWORD --------------------
  const handleReset = async () => {
    if (!email) return triggerError("Enter your email to reset password");

    try {
      await resetPassword(email);
      toast.success("Password reset link sent");
    } catch (err) {
      triggerError(mapError(err.code));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-xl font-semibold text-white mb-6">Welcome Back</h2>

      <motion.form
        className="space-y-5"
        onSubmit={handleLogin}
        animate={shake ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Email */}
        <input
          ref={emailRef}
          type="email"
          placeholder="Email Address"
          className="w-full p-3 rounded-lg bg-white/30 text-white placeholder-white/60 focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <div className="relative">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-white/30 text-white placeholder-white/60"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            className="absolute right-3 top-3 text-white"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Remember + Forgot */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-white/70">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="accent-[#0BB8A2]"
            />
            Remember me
          </label>

          <p
            onClick={handleReset}
            className="text-[#d8d8d86c] cursor-pointer hover:underline hover:text-[#d8d8d8] duration-300"
          >
            Forgot Password?
          </p>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading || googleLoading}
          className="
            w-full bg-[#062E29] py-3 rounded-lg 
            text-white font-medium 
            hover:bg-[#09443E] transition
          "
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin" size={20} />
              Logging in…
            </div>
          ) : (
            "Login"
          )}
        </button>

        {/* Google Button */}
        <button
          type="button"
          onClick={handleGoogle}
          disabled={loading || googleLoading}
          className="
            w-full flex items-center justify-center gap-2 
            bg-white/20 py-3 rounded-lg 
            border border-white/30 
            hover:bg-white/30 
            transition text-white
          "
        >
          {googleLoading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            "Continue with Google"
          )}
        </button>
      </motion.form>

      {/* Switch to Signup */}
      <p className="mt-4 text-white text-sm">
        Don't have an account?{" "}
        <Link to="/auth/signup" className="text-[#0BB8A2] font-medium">
          Sign Up
        </Link>
      </p>
    </motion.div>
  );
}
