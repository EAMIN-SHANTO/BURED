import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 
        ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-lg shadow-gray-100/20' : 'bg-transparent'}`}
    >
      <div className="max-w-[1440px] mx-auto w-[90%]">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4 group">
            <div className="relative">
              <div className="absolute -inset-2 bg-blue-100 rounded-full opacity-0 
                group-hover:opacity-100 blur-md transition-opacity duration-300" />
              <img 
                src="/photos/logos/redlogo.png" 
                alt="BUReD Logo" 
                className="h-14 w-auto relative"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 
                bg-clip-text text-transparent">
                BUReD
              </span>
              <span className="text-xs text-gray-500 -mt-1">
                BRAC University Research for Development Club
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-10">
            {[
              { path: '/', label: 'Home' },
              { path: '/about', label: 'About' },
              { path: '/panel', label: 'Panel' },
              { path: '/gallery', label: 'Gallery' },
              { path: '/blog', label: 'Blog' },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-all duration-300 
                  ${location.pathname === item.path
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Contact Button */}
          <Link
            to="/contact"
            className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 
              bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl 
              text-sm font-medium transition-all duration-300 shadow-lg shadow-blue-600/20 
              hover:shadow-xl hover:shadow-blue-600/30 hover:scale-105 
              hover:gap-3 active:scale-95"
          >
            <span>Contact Us</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100/80 
            backdrop-blur-sm transition-colors">
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar; 