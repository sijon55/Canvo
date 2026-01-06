import React from "react";
import { Link } from "react-router";
import logo from "../../assets/images/logo.png";
import { motion } from "motion/react";
import useScrollSpy from "../../hooks/useScrollSpy";
import { useAuth } from "../../context/AuthProvider";

const linkBase = "px-2 py-1 transition text-gray-700 hover:text-[#0BB8A2]";
const activeLink =
  "px-2 py-1 text-[#0BB8A2] font-semibold border-b-2 border-[#0BB8A2]";

export default function Navbar() {
  const { user, logout } = useAuth();

  const sections = ["home", "about", "blog", "contact"];
  const active = useScrollSpy(sections, 150);

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.35 }}
      className="w-full flex sticky z-50 -top-3 justify-center pt-4 px-4"
    >
      <div
        className="
          navbar 
          max-w-7xl 
          w-full 
          rounded-2xl 
          bg-white/45 
          backdrop-blur-sm
          border border-white/30 
          shadow-md
        "
      >
        {/* Logo */}
        <div className="navbar-start">
          <a href="#" className="flex items-center gap-2">
            <img src={logo} className="w-9 h-9 rounded-xl" alt="logo" />
            <span className="font-semibold text-lg text-gray-800">Canvo</span>
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1 font-medium">
            <li>
              <a
                href="#home"
                className={active === "home" ? activeLink : linkBase}
              >
                Home
              </a>
            </li>

            <li>
              <a
                href="#about"
                className={active === "about" ? activeLink : linkBase}
              >
                About
              </a>
            </li>

            <li>
              <a
                href="#blog"
                className={active === "blog" ? activeLink : linkBase}
              >
                Blog
              </a>
            </li>

            <li>
              <a
                href="#contact"
                className={active === "contact" ? activeLink : linkBase}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Desktop Right Section */}
        <div className="navbar-end  hidden md:flex items-center gap-4">
          {!user && (
            <Link
              to="/auth/signup"
              className="
        bg-[#0BB8A2] 
        text-white 
        px-5 
        py-2 
        rounded-full 
        shadow 
        hover:bg-[#0aa590] 
        transition
      "
            >
              Sign Up
            </Link>
          )}

          {/* If user is logged in → show Avatar */}
          {user && (
            <div className="dropdown pr-3 dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10  border border-[#0BB8A2] rounded-full">
                  <img
                    src={user.photoURL || "https://i.ibb.co/8xqv5Qx/user.png"}
                    referrerPolicy="no-referrer"
                    alt="User Avatar"
                  />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-white text-gray-800 rounded-box z-50 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>

                <li>
                  <button onClick={logout} className="text-red-600 font-medium">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Mobile */}
        <div className="navbar-end md:hidden">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>

            <ul
              tabIndex={0}
              className="
                menu 
                menu-sm 
                dropdown-content 
                mt-3 
                z-10
                p-2 
                shadow 
                bg-white/80 
                backdrop-blur-xl 
                border border-white/30 
                rounded-xl 
                w-48
              "
            >
              <li>
                <a
                  href="#home"
                  className={active === "home" ? activeLink : linkBase}
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#about"
                  className={active === "about" ? activeLink : linkBase}
                >
                  About
                </a>
              </li>

              <li>
                <a
                  href="#blog"
                  className={active === "blog" ? activeLink : linkBase}
                >
                  Blog
                </a>
              </li>

              <li>
                <a
                  href="#contact"
                  className={active === "contact" ? activeLink : linkBase}
                >
                  Contact
                </a>
              </li>

              <li>
                <Link
                  to="/signup"
                  className="
                    bg-[#0BB8A2] 
                    text-white 
                    mt-2 
                    py-2 
                    rounded-lg 
                    text-center
                  "
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
