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
                BRACU RED is Bangladesh's premier student Research team, 
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
                alt="BURED logo" 
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

      {/* Partners Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50/50">
        {/* Background SVG */}
        <div className="absolute inset-0 opacity-[0.07]">
          <img 
            src="/photos/other/research-bg.svg" 
            alt="Background Pattern" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-[1440px] mx-auto w-[90%] py-32">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-1 bg-blue-100 text-blue-600 rounded-full 
              text-sm font-medium mb-4 shadow-sm">
              Trusted Partners
            </span>
            <h2 className="text-4xl font-bold mt-4 mb-6 bg-gradient-to-r from-gray-900 to-gray-700 
              bg-clip-text text-transparent">
              Building the Future Together
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Collaborating with visionary organizations to advance research, 
              innovation, and technological excellence.
            </p>
          </div>

          <div className="space-y-20">
            {/* Strategic Partner */}
            <div>
              <h3 className="text-center text-gray-400 text-sm font-medium tracking-wider mb-8">
                STRATEGIC PARTNER
              </h3>
              <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-16 
                shadow-2xl shadow-blue-100/20 hover:shadow-blue-200/30 
                transition-all duration-500 transform hover:-translate-y-1">
                <img 
                  src="/photos/logos/bu.png" 
                  alt="BRAC University" 
                  className="h-32 w-auto mx-auto hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Technology Partners */}
            <div>
              <h3 className="text-center text-gray-400 text-sm font-medium tracking-wider mb-8">
                TECHNOLOGY PARTNERS
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {techPartners.slice(1).map((partner, index) => (
                  <div 
                    key={index}
                    className="group bg-white/50 backdrop-blur-sm rounded-2xl p-12 
                      shadow-xl shadow-blue-100/10 hover:shadow-blue-200/20 
                      transition-all duration-500 transform hover:-translate-y-2"
                  >
                    <div className="h-full flex items-center justify-center">
                      <img 
                        src={partner.logo} 
                        alt={partner.alt} 
                        className="h-20 w-auto object-contain group-hover:scale-110 
                          transition-transform duration-500" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Partnership CTA */}
            <div className="mt-24 text-center">
              <Link 
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 
                  text-white rounded-xl font-medium hover:bg-blue-700 
                  transition-colors shadow-lg shadow-blue-600/20 group"
              >
                <span>Become a Partner</span>
                <svg 
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 7l5 5m0 0l-5 5m5-5H6" 
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="bg-white py-24">
        <div className="max-w-[1440px] mx-auto w-[90%]">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-orange-100 text-orange-600 
              rounded-full text-sm font-medium mb-4">
              02 · Community
            </span>
            <h2 className="text-4xl font-bold mb-6">
              Join our  Research<br />
              community at BUReD
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Connect with our community R, share knowledge, and be part 
              of a growing network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Facebook Card */}
            <div className="group bg-[#1877F2] rounded-2xl p-8 text-center 
              transform hover:-translate-y-2 transition-all duration-300">
              <div className="bg-white/10 rounded-xl p-8 mb-6">
                <svg className="w-12 h-12 text-white mx-auto" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/>
                </svg>
              </div>
              <h3 className="text-white text-xl font-bold mb-2">Facebook Community</h3>
              <p className="text-blue-100 mb-6">
                Follow our journey, stay updated with latest achievements, and engage 
                with our community of research enthusiasts.
              </p>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white hover:gap-3 transition-all duration-300">
                <span>Join Community</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* LinkedIn Card */}
            <div className="group bg-[#0A66C2] rounded-2xl p-8 text-center 
              transform hover:-translate-y-2 transition-all duration-300">
              <div className="bg-white/10 rounded-xl p-8 mb-6">
                <svg className="w-12 h-12 text-white mx-auto" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <h3 className="text-white text-xl font-bold mb-2">LinkedIn Profile</h3>
              <p className="text-blue-100 mb-6">
                Connect with our team and stay updated on our latest projects 
                and achievements.
              </p>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white hover:gap-3 transition-all duration-300">
                <span>Connect with Us</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* YouTube Card */}
            <div className="group bg-[#FF0000] rounded-2xl p-8 text-center 
              transform hover:-translate-y-2 transition-all duration-300">
              <div className="bg-white/10 rounded-xl p-8 mb-6">
                <svg className="w-12 h-12 text-white mx-auto" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <h3 className="text-white text-xl font-bold mb-2">Youtube Channel</h3>
              <p className="text-red-100 mb-6">
                Our dedicated Youtube channel where we share our journey, latest 
                achievements, and engage with our community of research.
              </p>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white hover:gap-3 transition-all duration-300">
                <span>Subscribe Now</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Section */}
      <section className="bg-gray-50/50 py-24">
        <div className="max-w-[1440px] mx-auto w-[90%]">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-blue-100 text-blue-600 
              rounded-full text-sm font-medium mb-4">
              03 · x
            </span>
            <h2 className="text-4xl font-bold mb-6">
            Dr. Tarnima Warda <br />
            Andalib
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Faculty Info */}
            <div className="space-y-6">
              <p className="text-gray-600 text-lg leading-relaxed">
              Dr. Tarnima Warda Andalib is currently working as an Assistant Professor, BRAC Business School at BRAC University, Bangladesh. Earlier she was employed as a Post-Doctoral Fellow and Lecturer (Tutorial Laboratory of Strategic Management through MonsoonSim Game Simulation Course) in the School of Management at University Sains Malaysia, the only APEX (Accelerated Programs for Excellence) University in Malaysia from 2019 to 2021.
              </p>
              
              {/* LinkedIn Connect Button */}
              <a 
                href="https://linkedin.com/x" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 
                  transition-colors group"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="font-medium">Learn More!</span>
                <svg 
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Faculty Image */}
            <div className="relative">
              <div className="aspect-square rounded-full overflow-hidden bg-blue-900">
                <img 
                  src="/photos/faculty/dr_Tarnima.jpg" 
                  alt="faculty member" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative overflow-hidden">
        {/* Background Image and Overlay */}
        <div className="absolute inset-0">
          <img 
            src="/photos/other/newsletter.jpg"
            alt="Newsletter Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/95 to-blue-900/95"></div>
        </div>

        <div className="relative max-w-[1440px] mx-auto w-[90%] py-24">
          <div className="max-w-4xl mx-auto">
            {/* Content */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Stay in the Loop
              </h2>
              <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                Subscribe to our newsletter and be the first to know about our latest 
                research breakthroughs, upcoming events, and innovation stories.
              </p>
            </div>

            {/* Newsletter Form */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl shadow-blue-900/20">
              <form 
                className="flex flex-col md:flex-row gap-4" 
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="flex-1 space-y-4 md:space-y-0 md:flex md:gap-4">
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full md:w-1/2 px-4 py-3 rounded-xl text-sm bg-white/90 
                      focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white
                      placeholder:text-gray-400 transition-all duration-300"
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full md:w-1/2 px-4 py-3 rounded-xl text-sm bg-white/90 
                      focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white
                      placeholder:text-gray-400 transition-all duration-300"
                  />
                </div>
                <button 
                  className="px-8 py-3 bg-white text-blue-600 rounded-xl text-sm font-medium 
                    hover:bg-blue-50 transition-all duration-300 shadow-lg shadow-blue-900/20
                    transform hover:translate-y-[-1px] active:translate-y-[1px]"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-blue-100/80 text-xs mt-4 text-center">
                By subscribing, you agree to receive our newsletter. You can unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage; 