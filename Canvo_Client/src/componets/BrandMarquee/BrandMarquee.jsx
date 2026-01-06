import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";

export default function BrandMarquee() {
  const logos = [
    { name: "Stripe", src: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/stripe.svg" },
    { name: "Figma", src: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/figma.svg" },
    { name: "Google", src: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/google.svg" },
    { name: "Meta", src: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/meta.svg" },
    { name: "Shopify", src: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/shopify.svg" },
    { name: "Netflix", src: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/netflix.svg" },
    { name: "Amazon", src: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/amazon.svg" },
  ];

  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.scrollWidth / 2);
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-16 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h2 className="text-gray-700 text-lg font-semibold opacity-80">
          Trusted by worldwide
        </h2>
      </div>

      {/* Outer container */}
      <div className="relative w-full overflow-hidden">
        
        <motion.div
          ref={containerRef}
          className="flex gap-16"
          animate={{ x: [ 0,-width,] }}   
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 15,
            ease: "linear",
          }}
        >
          {/* FIRST TRACK */}
          {logos.map((brand, i) => (
            <img
              key={i}
              src={brand.src}
              alt={brand.name}
              className="h-10 md:h-12 opacity-70 hover:opacity-100 transition saturate-0 hover:saturate-100"
            />
          ))}

          {/* SECOND TRACK (seamless duplicate) */}
          {logos.map((brand, i) => (
            <img
              key={"clone-" + i}
              src={brand.src}
              alt={brand.name}
              className="h-10 md:h-12 opacity-70 hover:opacity-100 transition saturate-0 hover:saturate-100"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
