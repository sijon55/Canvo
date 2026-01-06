import { motion } from "motion/react";
import image2 from "../../assets/images/chat.gif";
import BrandMarquee from "../BrandMarquee/BrandMarquee";
import { Helmet } from "react-helmet";

export default function Hero() {
  return (
    <div className="  font-sans overflow-x-hidden px-2">
      <Helmet>
        <title>Canvo - Your Friendly Corner</title>
      </Helmet>
      <div className="max-w-7xl mx-auto   py-12 md:py-20 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center  gap-8 lg:gap-12">
          <div className="lg:w-1/2 space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl uppercase text-center lg:text-left md:text-4xl lg:text-5xl font-bold text-[#00C4CC] leading-tight"
            >
              Your <span className="text-[#FF7F2A] italic">friendly </span>
              corner to
              <span className="italic text-[#FF7F2A]"> connect</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-600 max-w-xl text-base md:text-lg lg:text-left text-center mt-4"
            >
              Convo is a simple, welcoming space where you can share thoughts,
              talk with friends, and feel at home in every conversation.
            </motion.p>

            <div className="flex w-full items-center justify-center lg:justify-start   flex-row   gap-4  mt-8">
              <motion.button
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-emerald-800 hover:bg-emerald-900 text-white font-medium py-3 px-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2  "
              >
                Get Started
              </motion.button>

              <motion.button
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex items-center gap-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-medium py-3 px-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="border rounded-full"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch
              </motion.button>
            </div>
          </div>

          {/* Right Images Section */}
          <div className="lg:w-1/2 relative">
            {/* Decorative Elements */}
            <div className="absolute -top-10 -left-10 w-12 h-12 text-emerald-300 opacity-70">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L14.5 8H20l-5 4.5L20 17h-5.5L12 23l-2.5-5.5H4l5-4.5L4 7h5.5L12 2z" />
              </svg>
            </div>

            <div className="absolute -bottom-10 -right-10 w-12 h-12 text-emerald-300 opacity-70">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L14.5 8H20l-5 4.5L20 17h-5.5L12 23l-2.5-5.5H4l5-4.5L4 7h5.5L12 2z" />
              </svg>
            </div>

            {/* Curved Line Decoration */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-linear-to-r from-transparent via-emerald-100 to-transparent"></div>

            {/* Image Containers for moblie */}
            <div className="flex sm:hidden justify-center space-x-4">
              {/* First Image */}
              <div className="relative">
                <div className="w-80 h-64 md:w-48 md:h-72 rounded-[3rem] overflow-hidden shadow-xl border-4 border-white ">
                  <img
                    src="https://media.licdn.com/dms/image/v2/D4D12AQF4ws-YFPk6Fg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1699685979605?e=2147483647&v=beta&t=N_F0sZJNMb-PlXvmqb-s_UVHofj7J6dHoscUOx5g2Y0"
                    alt="Workspace 1"
                    className="w-full hover:scale-105 transition-transform duration-300 h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full bg-emerald-100 opacity-50"></div>
              </div>
            </div>

            <div className="hidden sm:flex  justify-center space-x-4">
              {/* First Image */}
              <div className="relative">
                <div className="w-40 h-64 md:w-48 md:h-72 rounded-[3rem] overflow-hidden shadow-xl border-4 border-white transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <img
                    src="https://img.freepik.com/premium-vector/girl-using-mobile-phone-texting-messaging-chatting-with-friends-online-looking-smart-phone-concept-illustration_270158-343.jpg?semt=ais_hybrid&w=740&q=80"
                    alt="Workspace 1"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full bg-emerald-100 opacity-50"></div>
              </div>

              {/* Second Image */}
              <div className="relative">
                <div className="w-40 h-64 md:w-48 md:h-72 rounded-[3rem] overflow-hidden shadow-xl border-4 border-white transform bg-[#FBFBFB]  hover:scale-105 transition-transform duration-300">
                  <img
                    src={image2}
                    alt="Workspace 2"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="absolute -top-2 -left-2 w-16 h-16 rounded-full bg-emerald-100 opacity-50"></div>
              </div>

              {/* Third Image */}
              <div className="relative">
                <div className="w-40 h-64 md:w-48 md:h-72 rounded-[3rem] overflow-hidden shadow-xl border-4 border-white transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                  <img
                    src="https://img.freepik.com/free-vector/flat-design-colorful-characters-chatting-dating-app_23-2148269773.jpg"
                    alt="Workspace 3"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-2 -right-2 w-16 h-16 rounded-full bg-emerald-100 opacity-50"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BrandMarquee />
    </div>
  );
}
