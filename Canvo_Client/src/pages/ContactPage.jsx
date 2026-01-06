import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail("");
  };

  // Chat App Emoji Watermarks
  const watermarks = ["💬", "📨", "👤", "📁", "🔒", "⚙️", "📷","💬", "📨", "👤", "📁", ];

  return (
    <div className="flex items-center justify-center p-6">
      <div className="relative w-full max-w-6xl rounded-3xl overflow-hidden shadow-xl">

        {/* Gradient Background */}
        <div className="absolute inset-0 bg-linear-to-br from-blue-500 to-blue-600">
          <div className="absolute inset-0">

            {/* Improved Random Emoji Pattern */}
            {watermarks.map((icon, index) => {
              const top = Math.random() * 70 + 10; // safe space
              const left = Math.random() * 80 + 5;
              const size = Math.random() * 1.3 + 0.8;
              const rotation = Math.random() * 30 - 15;

              return (
                <motion.div
                  key={index}
                  className="absolute text-white"
                  style={{
                    top: `${top}%`,
                    left: `${left}%`,
                    fontSize: `${size * 3}rem`,
                    opacity: 0.22,
                    transform: `rotate(${rotation}deg)`,
                  }}
                  animate={{
                    y: [0, -12, 0],
                    x: [0, 6, 0],
                  }}
                  transition={{
                    duration: 5 + Math.random() * 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.15,
                  }}
                >
                  {icon}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-10 md:p-16 text-center text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated with Convo
          </h1>

          <p className="text-white/90 mb-8 max-w-xl mx-auto">
            Get updates on new features, improvements, releases, and messaging enhancements.
            No spam — only useful updates.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="grow px-5 py-3 rounded-full bg-white/20 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              required
            />

            <motion.button
              type="submit"
              className="px-8 py-3 bg-yellow-400 text-gray-900 rounded-full font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
}
