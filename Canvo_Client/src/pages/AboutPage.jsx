import React from "react";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="w-full ">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* LEFT IMAGES */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex gap-6 justify-center group"
        >
          {/* Image 1 */}
          <div
            className="
    h-72 md:h-96 rounded-[40px] overflow-hidden shadow-xl bg-white/40 hover:shadow-2xl hover:shadow-green-400/60 
    backdrop-blur-md border border-white/50 transition-all duration-500
    w-32 md:w-48 group-hover:w-20 hover:w-64 md:hover:w-80
  "
          >
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80"
              className="w-full h-full object-cover"
              alt="team"
            />
          </div>

          {/* Image 2 */}
          <div
            className="hover:shadow-2xl hover:shadow-green-400/60  
    h-72 md:h-96 rounded-[40px] overflow-hidden shadow-xl bg-white/40 
    backdrop-blur-md border border-white/50 transition-all duration-500
    w-32 md:w-48 group-hover:w-20 hover:w-64 md:hover:w-80
  "
          >
            <img
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=900&q=80"
              className="w-full h-full object-cover"
              alt="team"
            />
          </div>
        </motion.div>

        {/* RIGHT TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <p className="uppercase tracking-wide text-sm text-gray-500 font-semibold">
            About Us
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
            Building the next generation of real-time communication.
          </h2>

          <p className="text-gray-600  leading-relaxed">
            <b className="text-[#FF7F2A] text-justify italic text-xl">Convo</b>{" "}
            is a clean, fast, and secure messaging experience. Our platform
            combines real-time communication, cloud-powered storage, and a
            smooth UI to deliver a modern chat environment.
          </p>

          <div className="flex flex-col gap-6 pt-4">
            {/* Stat 1 */}
            <div className="flex items-start gap-4">
              <div className="min-w-[70px]">
                <h3 className="text-4xl font-bold bg-[#02CBA9] text-white px-3 py-1  text-center">
                  82%
                </h3>
              </div>

              <p className="text-gray-600 leading-relaxed flex-1">
                Users say our real-time messaging feels significantly faster
                compared to their previous chat tools.
              </p>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center  gap-4">
              <p className="text-gray-600 leading-relaxed flex-1">
                Improvement in team communication after switching to{" "}
                <b>Convo</b> OVER
              </p>
              <div className="min-w-[70px]">
                <h3 className="text-4xl font-bold bg-[#02CBA9] text-white px-3 py-1  text-center">
                  37%
                </h3>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
