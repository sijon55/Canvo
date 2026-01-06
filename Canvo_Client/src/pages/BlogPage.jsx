import React from "react";
import { motion } from "motion/react";
import { MessageCircle, ShieldCheck, ImageDown, UserCog } from "lucide-react";

const FeaturesSection = () => {
  const features = [
   
    {
      title: "Secure Authentication",
      description:
        "Your account stays protected with Firebase Auth. Users can safely log in with email, Google, or other secure providers.",
      icon: <ShieldCheck className="w-8 h-8 text-emerald-600" />,
      image:
        "https://blog.verifykit.com/content/uploads/2020/09/v3-2-copy3x-100-scaled-1-1400x701.jpg",
    },
    {
      title: "Media & File Sharing",
      description:
        "Upload photos and media instantly. Convo stores images in the cloud and delivers them with optimized speed and quality.",
      icon: <ImageDown className="w-8 h-8 text-sky-600" />,
      image:
        "https://www.multcloud.com/screenshot/en/others/file-sharing-service.png",
    },
    {
      title: "Profile Customization",
      description:
        "Give users full control — update names, change avatars, and manage personal settings all from one interface.",
      icon: <UserCog className="w-8 h-8 text-indigo-600" />,
      image:
        "https://static.vecteezy.com/system/resources/previews/010/551/178/non_2x/currently-offline-twitch-banner-background-with-geometric-shapes-vector.jpg",
    },
  ];

  return (
    <div className="">
      {/* Header Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <div className="h-px bg-gray-300 grow mr-4"></div>
            <span className="text-sm font-medium text-gray-500">FEATURES</span>
            <div className="h-px bg-gray-300 grow ml-4"></div>
          </div>

          <div className="flex items-center justify-between mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 max-w-2xl leading-tight">
              Powerful features crafted for smooth conversations
            </h1>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-[#fefefe] rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-50 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-6">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesSection;
