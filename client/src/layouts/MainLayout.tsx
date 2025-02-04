import React from 'react';
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="absolute w-full">
        <div className="max-w-[1440px] mx-auto w-[90%]">
          <Navbar />
        </div>
      </div>
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout; 