import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { NavigationItem } from '../layouts/MainLayout';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  navigation: NavigationItem[];
}

const Navbar: React.FC<NavbarProps> = ({ navigation }) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState<boolean>(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getRoleIcon = (role?: string) => {
    switch (role) {
      case 'admin':
        return (
          <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
        );
      case 'staff':
        return (
          <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const handleContactClick = () => {
    window.location.href = 'mailto:club.bured@bracu.ac.bd';
  };

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
                src="photos/logos/redlogo.png" 
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
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium transition-all duration-300 
                  ${location.pathname === item.href
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Contact Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleContactClick}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white 
                rounded-lg hover:bg-blue-700 transition-all duration-300"
            >
              Contact Us
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M14 5l7 7m0 0l-7 7m7-7H3" 
                />
              </svg>
            </button>

            {user ? (
              <Link to="/profile" className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium text-gray-700">{user.username}</span>
                {user.role && (
                  <div className="ml-1" title={`Role: ${user.role}`}>
                    {getRoleIcon(user.role)}
                  </div>
                )}
              </Link>
            ) : (
              <Link to="/login" className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                Sign In
              </Link>
            )}
          </div>

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