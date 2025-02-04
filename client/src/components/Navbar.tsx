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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-[1440px] mx-auto w-[90%]">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img  src="/photos/logos/redlogo.png" alt="BUReD Logo" className="h-12 w-auto" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900">BUReD</span>
              <span className="text-xs text-gray-600 -mt-1">
                BRAC University Research for Development Club
              </span>
            </div>
          </Link>
          
          

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/'
                  ? 'text-red-600'
                  : 'text-gray-700 hover:text-red-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/about'
                  ? 'text-red-600'
                  : 'text-gray-700 hover:text-red-600'
              }`}
            >
              About
            </Link>
            <Link
              to="/panel"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/panel'
                  ? 'text-red-600'
                  : 'text-gray-700 hover:text-red-600'
              }`}
            >
              Panel
            </Link>
            <Link
              to="/gallery"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/gallery'
                  ? 'text-red-600'
                  : 'text-gray-700 hover:text-red-600'
              }`}
            >
              Gallery
            </Link>
            <Link
              to="/blog"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/blog'
                  ? 'text-red-600'
                  : 'text-gray-700 hover:text-red-600'
              }`}
            >
              Blog
            </Link>
          </nav>

          {/* Contact Button */}
          <Link
            to="/contact"
            className="hidden md:inline-flex items-center justify-center px-6 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors"
          >
            Contact
          </Link>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100">
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