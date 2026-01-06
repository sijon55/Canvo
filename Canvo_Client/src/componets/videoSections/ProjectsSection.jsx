import React, { useState } from "react";
import { motion } from "motion/react";

export default function ProjectsSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="w-full bg-[url(https://i.postimg.cc/7Z2Y7Yvb/83b2a83ab8d7f4bfe6eafecfec2f5b2a.jpg)] bg-fixed bg-no-repeat bg-bg-center  bg-cover py-16 md:py-30">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h3 className="text-[#DFF7EF] text-lg font-semibold">
            A quick glance at our
          </h3>

          <h2 className="text-3xl md:text-4xl font-bold text-white leading-snug">
            Recent features & real-time chat demos
          </h2>

          <p className="text-teal-100/90 md:w-4/5">
            Explore how Convo delivers seamless real-time messaging, smooth UI transitions, 
            and optimized performance across devices. 
            Watch our short showcase to see the experience in action.
          </p>

          <a
            href="#projects"
            className="text-[#02CBA9] font-semibold underline hover:opacity-80"
          >
            Browse all demos →
          </a>
        </motion.div>

        {/* RIGHT VIDEO THUMBNAIL */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full relative rounded-xl overflow-hidden shadow-xl"
        >
          {!isPlaying ? (
            <>
              {/* Thumbnail Image */}
              <img
                src="https://i.ibb.co.com/Z1FzMMSW/11.webp" 
                className="w-full h-64 md:h-80 object-cover"
                alt="Project Video"
              />

              {/* Play Button */}
              <button
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="#02CBA9"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            </>
          ) : (
            <iframe
              className="w-full h-64 md:h-80"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Project Demo"
              allow="autoplay; encrypted-media "
              allowFullScreen
            ></iframe>
          )}
        </motion.div>
      </div>
    </section>
  );
}
