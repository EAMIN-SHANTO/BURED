import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CertificateVerificationModal from './CertificateVerificationModal';

const Footer: React.FC = () => {
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);

  return (
    <footer className="bg-white">
      <div className="max-w-[1440px] mx-auto w-[90%]">
        {/* Navigation Links */}
        <div className="flex justify-center gap-8 py-8">
          <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
            About
          </Link>
          <Link to="/blog" className="text-gray-600 hover:text-gray-900 transition-colors">
            Blog
          </Link>
          <Link to="/join-us" className="text-gray-600 hover:text-gray-900 transition-colors">
            Join Us
          </Link>
          <Link to="/press" className="text-gray-600 hover:text-gray-900 transition-colors">
            Press
          </Link>
          <Link to="/awards" className="text-gray-600 hover:text-gray-900 transition-colors">
            Awards
          </Link>
        </div>

        {/* Certificate Verification Button - Centered and Styled */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setIsVerificationModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-md 
              hover:bg-blue-100 transition-colors border border-blue-200"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
              />
            </svg>
            <span className="font-medium">Verify Certificate</span>
          </button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 py-6">
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/>
            </svg>
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a 
            href="https://youtube.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
        </div>

        {/* Copyright and Powered By */}
        <div className="border-t border-gray-100 py-8">
          <div className="flex flex-col items-center gap-8">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} BUReD. All rights reserved.
            </p>
            <div className="flex flex-col items-center gap-4">
              <span className="text-gray-400 text-sm">Powered by</span>
              <a href="/" 
                className="transform hover:scale-105 transition-all duration-300 
                  hover:shadow-lg hover:shadow-blue-100/50 rounded-lg p-4"
              >
                <img 
                  src="/photos/logos/bloombyte.png" 
                  alt="BloomByte" 
                  className="h-32 w-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Verification Modal */}
      <CertificateVerificationModal 
        isOpen={isVerificationModalOpen}
        onClose={() => setIsVerificationModalOpen(false)}
      />
    </footer>
  );
};

export default Footer; 