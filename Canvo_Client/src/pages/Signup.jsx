import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Eye, EyeOff, Upload, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import { createAccount, updateUserProfile } from "../services/authServices";
import { uploadToImgbb } from "../hooks/uploadToImgbb";

// -------------------------------------------------------------
// Password Strength Checker
// -------------------------------------------------------------
const checkStrength = (password) => {
  let score = 0;

  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { label: "Weak", color: "bg-red-500", level: 1 };
  if (score <= 3) return { label: "Medium", color: "bg-yellow-500", level: 2 };
  return { label: "Strong", color: "bg-green-500", level: 3 };
};

export default function Signup() {
  const [step, setStep] = useState(1);

  // Step 1
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [strength, setStrength] = useState({ label: "", color: "", level: 0 });

  // Step 2
  const [name, setName] = useState("");
  const [preview, setPreview] = useState("");
  const [photoURL, setPhotoURL] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [terms, setTerms] = useState(false);

  const [loading, setLoading] = useState(false);

  const imgbbKey = import.meta.env.VITE_IMGBB_KEY;

  // -----------------------------
  // STEP 1 → VALIDATION
  // -----------------------------
  const handleNext = (e) => {
    e.preventDefault();

    if (!email || !password || !confirm)
      return toast.error("Please complete all fields");

    if (!email.includes("@"))
      return toast.error("Enter a valid email address");

    if (password !== confirm)
      return toast.error("Passwords do not match");

    if (strength.level === 1)
      return toast.error("Password is too weak");

    toast.success("Step 1 completed");
    setStep(2);
  };

  // -----------------------------
  // Upload + Auto-preview
  // -----------------------------
  const handlePhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setUploading(true);

    try {
      const url = await uploadToImgbb(file, imgbbKey);

      setPhotoURL(url);
      setPreview(url);

      toast.success("Image uploaded");
    } catch (err) {
      toast.error("Upload failed");
      setPhotoURL(null);
    }

    setUploading(false);
  };

  // -----------------------------
  // FINAL SUBMIT → Firebase only
  // -----------------------------
  const handleSignup = async (e) => {
  e.preventDefault();

  if (!name) return toast.error("Please enter your name");
  if (!terms) return toast.error("Accept the Terms & Privacy");
  if (!photoURL) return toast.error("Upload your profile photo");

  setLoading(true);

  try {
    const result = await createAccount(email, password);
    const user = result.user;

    await updateUserProfile(user, name, photoURL);

    // ✨ FIX: Refresh the Firebase user so onAuthStateChanged sees changes
    await user.reload();

    toast.success("Account created successfully!");
  } catch (err) {
    toast.error(err.message || "Signup failed");
  }

  setLoading(false);
};


  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Progress */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className={`h-2 w-16 rounded-full ${step === 1 ? "bg-white" : "bg-[#0BB8A2]"}`} />
        <div className={`h-2 w-16 rounded-full ${step === 2 ? "bg-white" : "bg-gray-500/40"}`} />
      </div>

      <h2 className="text-xl font-semibold text-white mb-6">
        {step === 1 ? "Create Your Account" : "Complete Your Profile"}
      </h2>

      {/* ---------------- STEP 1 ---------------- */}
      {step === 1 && (
        <form className="space-y-4" onSubmit={handleNext}>

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 rounded-lg bg-white/30 text-white placeholder-white/60"
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
              onChange={(e) => {
                setPassword(e.target.value);
                setStrength(checkStrength(e.target.value));
              }}
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-3 text-white"
            >
              {showPass ? <EyeOff /> : <Eye />}
            </button>

            {/* Strength Meter */}
            {password.length > 0 && (
              <div className="mt-2">
                <div className="w-full h-2 bg-white/20 rounded-full">
                  <div
                    className={`h-2 rounded-full ${strength.color}`}
                    style={{ width: `${(strength.level / 3) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-white mt-1">
                  Password Strength: <span className="font-semibold">{strength.label}</span>
                </p>
              </div>
            )}
          </div>

          {/* Confirm */}
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full p-3 rounded-lg bg-white/30 text-white placeholder-white/60"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />

            <button
              type="button"
              className="absolute right-3 top-3 text-white"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {/* Next */}
          <button className="w-full bg-[#0BB8A2] py-3 rounded-lg text-white font-medium">
            Next
          </button>

          <p className="mt-3 text-white text-sm">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-[#0BB8A2]">Login</Link>
          </p>
        </form>
      )}

      {/* ---------------- STEP 2 ---------------- */}
      {step === 2 && (
        <form className="space-y-5" onSubmit={handleSignup}>

          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 rounded-lg bg-white/30 text-white placeholder-white/60"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Image Upload */}
          <div className="flex flex-col items-center">
            <div className="relative">
              {preview ? (
                <img
                  src={preview}
                  className="w-24 h-24 rounded-full object-cover border-2 border-white/50"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-white/20 border border-white/40 flex items-center justify-center">
                  <Upload />
                </div>
              )}

              {uploading && (
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center">
                  <Loader2 className="w-6 h-6 animate-spin text-white" />
                </div>
              )}
            </div>

            <label className="cursor-pointer text-white/80 underline mt-3">
              Upload Profile Photo
              <input type="file" className="hidden" onChange={handlePhoto} />
            </label>
          </div>

          {/* Terms */}
          <label className="flex items-start gap-3 text-white text-sm">
            <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} />
            <span>
              I agree to the <span className="text-[#0BB8A2]">Terms</span> and{" "}
              <span className="text-[#0BB8A2]">Privacy Policy</span>.
            </span>
          </label>

          {/* Submit */}
          <button
            disabled={uploading}
            className={`w-full py-3 rounded-lg text-white font-medium ${
              uploading ? "bg-gray-500" : "bg-[#062E29] hover:bg-[#09443E]"
            }`}
          >
            {loading ? <Loader2 className="animate-spin mx-auto" /> : "Create Account"}
          </button>

          <p className="mt-3 text-[#0BB8A2] text-sm cursor-pointer" onClick={() => setStep(1)}>
            ← Back
          </p>
        </form>
      )}
    </motion.div>
  );
}
