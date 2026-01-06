import React from "react";
import { Outlet } from "react-router";
import Navbar from "../componets/Navbar/Navbar";
import Footer from "../componets/Footer/Footer";

const HomePgaeLyaout = () => {
  return (
    <div className=" min-h-screen bg-linear-to-br  from-[#E9FDFC] to-[#F6FBFF]">
      <Navbar />
      <div className="">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default HomePgaeLyaout;
