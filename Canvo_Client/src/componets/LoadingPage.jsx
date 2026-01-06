import { motion } from "framer-motion";

export default function LoadingPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0D3B36]">
      {/* Glass Container */}
      <div
       
        className="
          bg-white/10 backdrop-blur-md 
          border border-white/20 
          shadow-xl rounded-3xl 
          px-10 py-8 flex flex-col items-center
        "
      >
        {/* Loader Animation */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1.1,
            ease: "linear",
          }}
          className="w-14 h-14 border-4 border-white/30 border-t-[#0BB8A2] rounded-full"
        ></motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-white mt-5 text-lg font-medium tracking-wide"
        >
          Loading…
        </motion.p>
      </div>
    </div>
  );
}
