import { Mail, Phone, MapPin, Facebook, Instagram, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="relative w-full bg-cover bg-center bg-no-repeat text-white pt-20
      bg-[url('https://i.pinimg.com/736x/0c/29/51/0c2951438340be78c5e942f8a5769cad.jpg')]
      bg-fixed bg-center sm:bg-scroll bg-no-repeat"
    >
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 backdrop-blur-[3px] bg-black/50 " />

      {/* MAIN CONTENT */}
      <div className="relative z-10 w-full bg-transparent pb-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 text-center sm:text-left sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1 */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#home" className="hover:text-[#0BB8A2] transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-[#0BB8A2] transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#chat" className="hover:text-[#0BB8A2] transition">
                  Real-time Chat
                </a>
              </li>
              <li>
                <a href="#profile" className="hover:text-[#0BB8A2] transition">
                  Profile Settings
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a
                  href="#documentation"
                  className="hover:text-[#0BB8A2] transition"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-[#0BB8A2] transition">
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#tutorials"
                  className="hover:text-[#0BB8A2] transition"
                >
                  Tutorials
                </a>
              </li>
              <li>
                <a href="#api" className="hover:text-[#0BB8A2] transition">
                  API Reference
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#about" className="hover:text-[#0BB8A2] transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#0BB8A2] transition">
                  Support
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-[#0BB8A2] transition">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-[#0BB8A2] transition">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Convo</h3>
            <ul className="space-y-3  text-gray-300">
              <li className="flex justify-center sm:justify-start items-center gap-2">
                <MapPin size={16} /> Dhaka, Bangladesh
              </li>
              <li className="flex justify-center sm:justify-start items-center gap-2">
                <Phone size={16} /> +880 1734-123456
              </li>
              <li className="flex justify-center sm:justify-start items-center gap-2 break-all">
                <Mail size={16} /> support@convoapp.com
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex justify-center sm:justify-start gap-4 mt-6">
              <a className="p-2 rounded-full bg-white/10 hover:bg-[#0BB8A2]/40 transition">
                <Facebook size={18} />
              </a>
              <a className="p-2 rounded-full bg-white/10 hover:bg-[#0BB8A2]/40 transition">
                <Instagram size={18} />
              </a>
              <a className="p-2 rounded-full bg-white/10 hover:bg-[#0BB8A2]/40 transition">
                <Github size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm gap-2">
          <p>© {new Date().getFullYear()} Convo. All rights reserved.</p>

          <div className="flex gap-4">
            <a href="#terms" className="hover:text-[#0BB8A2] transition">
              Terms
            </a>
            <a href="#privacy" className="hover:text-[#0BB8A2] transition">
              Privacy
            </a>
            <a href="#cookies" className="hover:text-[#0BB8A2] transition">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
