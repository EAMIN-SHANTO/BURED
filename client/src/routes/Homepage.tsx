import React from 'react';
import { Link } from "react-router-dom";

// Interface for Featured Media
interface FeaturedMedia {
  logo: string;
  alt: string;
  url: string;
}

// Interface for Technology Partner
interface TechnologyPartner {
  logo: string;
  alt: string;
  url: string;
}

const Homepage: React.FC = () => {
  const featuredMedia: FeaturedMedia[] = [
    { logo: "/photos/media/dailystar.png", alt: "The Daily Star", url: "#" },
    { logo: "/photos/media/somoytv.png", alt: "Somoy TV", url: "#" },
    { logo: "/photos/media/jamunatv.png", alt: "Jamuna TV", url: "#" },
    { logo: "/photos/media/tbs.png", alt: "The Business Standard", url: "#" },
    { logo: "/photos/media/channeli.png", alt: "Channel i", url: "#" },
    { logo: "/photos/media/news24.png", alt: "News 24", url: "#" },
  ];

  const techPartners: TechnologyPartner[] = [
    { logo: "/photos/logos/bloombyte.png", alt: "BloomByte", url: "#" },
    { logo: "/photos/logos/ieee.png", alt: "IEEE", url: "#" },
    { logo: "/photos/logos/ocs.png", alt: "OCS", url: "#" },
    { logo: "/photos/logos/bu.png", alt: "BRAC University", url: "#" },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-b from-red-50 to-white">
        <div className="absolute inset-0 opacity-5 pattern-dots"></div>
        <div className="max-w-[1440px] mx-auto w-[90%] h-full flex items-center">
          <div className="flex flex-col md:flex-row items-center gap-12 pt-20">
            <div className="flex-1 space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold">
                Pioneering the Future of{' '}
                <span className="text-red-600">
                  Reserch and Development
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl">
                BRACU RED is Brac University research for develipment club., 
                pushing the boundaries of innovation through advanced research by students. 
                Join us as we inspire the next generation of student leaders and 
                showcase our nation's talent on the global stage.
              </p>
              <div className="flex gap-4">
                <button className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Learn more
                </button>
                <button className="px-8 py-3 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                  Join Us!
                </button>
              </div>
            </div>
            <div className="flex-1 relative">
              <img 
                src="/photos/other/bured.jpg" 
                alt="BRACU RED" 
                className="w-full h-auto max-w-lg mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Media Section */}
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto w-[90%] py-16">
          <h3 className="text-2xl font-bold text-center mb-12">As Featured In</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {featuredMedia.map((media, index) => (
              <a 
                key={index} 
                href={media.url} 
                className="p-4 hover:bg-gray-50 rounded-lg transition-all duration-300 flex items-center justify-center group"
              >
                <img 
                  src={media.logo} 
                  alt={media.alt} 
                  className="h-12 w-auto object-contain group-hover:scale-110 transition-transform duration-300" 
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="bg-gray-50">
        <div className="max-w-[1440px] mx-auto w-[90%] py-20">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium mb-4">
              01 · Partners
            </span>
            <h2 className="text-4xl font-bold mt-4 mb-6">
              Partner with BUReD to Drive<br />Innovation in Research
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Join forces with Bangladesh's premier university Research Club. 
              Your sponsorship empowers the next generation of student researchers while 
              showcasing your commitment to innovation and advancement.
            </p>
          </div>

          {/* Main Partners Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
            {/* Main Partner */}
            <div className="md:col-span-12 bg-white rounded-xl p-8 md:p-12 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-center">
                <img 
                  src="/photos/logos/bu.png" 
                  alt="BRAC University" 
                  className="h-20 md:h-28 w-auto object-contain" 
                />
              </div>
            </div>
            
            {/* Secondary Partners */}
            <div className="md:col-span-4 bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-center h-full">
                <img 
                  src="/photos/logos/ocs.png" 
                  alt="OCS" 
                  className="h-16 w-auto object-contain hover:scale-105 transition-transform duration-300" 
                />
              </div>
            </div>
            <div className="md:col-span-4 bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-center h-full">
                <img 
                  src="/photos/logos/bloombyte.png" 
                  alt="BloomByte" 
                  className="h-16 w-auto object-contain hover:scale-105 transition-transform duration-300" 
                />
              </div>
            </div>
            <div className="md:col-span-4 bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-center h-full">
                <img 
                  src="/photos/logos/ieee.png" 
                  alt="IEEE" 
                  className="h-16 w-auto object-contain hover:scale-105 transition-transform duration-300" 
                />
              </div>
            </div>
          </div>

          {/* Technology Partners */}
          <div className="mt-24">
            <h3 className="text-2xl font-bold text-center mb-12">Technology Partners</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {techPartners.map((partner, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center justify-center h-full min-h-[100px]">
                    <img 
                      src={partner.logo} 
                      alt={partner.alt} 
                      className="h-12 w-auto object-contain hover:scale-105 transition-transform duration-300" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-red-600">
        <div className="max-w-[1440px] mx-auto w-[90%] py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
              <p className="text-red-100">
                Subscribe to our newsletter and stay updated with the latest news from BUReD.
              </p>
            </div>
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button className="px-6 py-3 bg-white text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage; 