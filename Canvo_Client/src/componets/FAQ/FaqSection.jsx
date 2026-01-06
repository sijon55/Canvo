import React from "react";
import { motion } from "framer-motion";
import { FileText, BookOpen, Users } from "lucide-react"; // Lucide Icons

export default function FeaturesCircleSection() {
  const items = [
    {
      icon: <FileText size={40} strokeWidth={1.5} className="text-[#0D3B36]" />,
      title: "Blog",
      desc: "We share messaging insights, product updates, and tips for using Convo effectively.",
    },
    {
      icon: <BookOpen size={40} strokeWidth={1.5} className="text-[#0D3B36]" />,
      title: "Documentation",
      desc: "Access detailed documentation for setup guides, API references, and feature overviews.",
    },
    {
      icon: <Users size={40} strokeWidth={1.5} className="text-[#0D3B36]" />,
      title: "Customers",
      desc: "Read real stories from teams who use Convo daily to streamline communication.",
    },
  ];

  return (
    <section className="w-full  ">
      <div className="max-w-5xl mx-auto text-center px-4">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
          Share the features that <br /> help your customers
        </h2>

        {/* Subtitle */}
        <p className="text-gray-500 mt-4 md:w-3/4 mx-auto leading-relaxed">
          You already know that the customer experience doesn’t end with a
          click— it's ongoing work. Most companies should always be improving
          and transforming.
        </p>

        {/* Circle Cards */}
        <div className="mt-5 cs grid md:grid-cols-3 gap-12 place-items-center">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="
                w-70 h-76 
                text-[#000000]
                rounded-[40%] 
                bg-[#00000010]
                hover:-translate-y-2
                cursor-pointer
                transition-all duration-300
                hover:bg-[#00000018]
                shadow-[0_10px_25px_rgba(0,0,0,0.07)] 
                border-2 border-gray-500/20 
                flex flex-col items-center justify-center 
                text-center p-6
              "
            >
              {/* Icon */}
              <div className="mb-3">{item.icon}</div>

              {/* Title */}
              <h3 className="text-lg font-semibold ">{item.title}</h3>

              {/* Description */}
              <p className=" text-sm mt-2 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
