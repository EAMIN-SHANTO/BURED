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
      <section className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="absolute inset-0 opacity-5 pattern-dots"></div>
        <div className="max-w-[1440px] mx-auto w-[90%] h-full flex items-center">
          <div className="flex flex-col md:flex-row items-center gap-12 pt-20">
            <div className="flex-1 space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold">
                Pioneering the Future of{' '}
                <span className="text-blue-600">
                  Research and Development
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl">
                BRACU RED is Bangladesh's premier student robotics team, 
                pushing the boundaries of innovation through advanced engineering. 
                Join us as we inspire the next generation of tech leaders and 
                showcase our nation's talent on the global stage.
              </p>
              <div className="flex gap-4">
                <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Learn more
                </button>
                <button className="px-8 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                  Join Us!
                </button>
              </div>
            </div>
            <div className="flex-1 relative">
              <img 
                src="/photos/logos/redlogo.png" 
                alt="BRACU RED Robot" 
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
            <span className="inline-block px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
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

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Main Partner */}
            <div className="md:col-span-12 bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-center">
                <img 
                  src="/photos/logos/bu.png" 
                  alt="BRAC University" 
                  className="h-24 w-auto object-contain hover:scale-105 transition-transform duration-300"
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
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative bg-blue-600 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <img 
            src="/photos/other/research.png"
            alt="Background Pattern"
            className="absolute inset-0 w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-700"></div>
        </div>

        <div className="relative max-w-[1440px] mx-auto w-[90%] py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white mb-2">Stay Updated</h2>
              <p className="text-blue-100 text-sm">
                Subscribe to our newsletter and stay updated with the latest news from BUReD.
              </p>
            </div>
            <div className="flex-1">
              <form className="flex gap-3" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm text-gray-900 bg-white/90 backdrop-blur-sm 
                    focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white
                    placeholder:text-gray-400"
                />
                <button 
                  className="px-5 py-2.5 bg-white text-blue-600 rounded-lg text-sm font-medium 
                    hover:bg-blue-50 transition-colors shadow-lg shadow-blue-700/20"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage; 