import { Outlet } from "react-router";
import logo from "../assets/images/logo.png";
import { motion } from "framer-motion";
import video from "../assets/images/bg-video.mp4";

export default function AuthLayout() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center resize  p-6 bg-linear-to-br from-[#0bb8a1bd] via-[#61f3e24d] to-[#054a437a] ">
       <video
        className="absolute -z-10 inset-0 w-full h-full object-cover"
        src={video}
        autoPlay
        muted
        loop
      />
      {/* Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          w-full max-w-md 
          bg-white/20
          backdrop-blur-[5px]
          rounded-3xl 
          shadow-xl 
          p-8
          border border-white/30
        "
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <img src={logo} className="w-14 h-14 rounded-xl" alt="logo" />
          <h1 className="text-2xl font-semibold text-white mt-2">Convo</h1>
          <p className="text-white/80 text-sm">Stay connected. Anytime. Anywhere.</p>
        </div>

        {/* Page Content (Login or Signup) */}
        <Outlet />
      </motion.div>
    </div>
  );
}
