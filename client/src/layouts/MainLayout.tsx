import React from 'react';
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export interface NavigationItem {
  name: string;
  href: string;
}

const MainLayout: React.FC = () => {
  const navigation: NavigationItem[] = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Current Panel', href: '/panel' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Blog', href: '/blog' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="absolute w-full">
        <div className="max-w-[1440px] mx-auto w-[90%]">
          <Navbar navigation={navigation} />
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