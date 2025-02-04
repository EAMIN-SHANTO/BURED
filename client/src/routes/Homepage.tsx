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
      <section className="relative min-h-screen overflow-hidden">
        {/* Background Image and Overlay */}
        <div className="absolute inset-0">
          <img 
            src="/photos/other/research.png"
            alt="Research Background"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white/95"></div>
        </div>

        <div className="relative max-w-[1440px] mx-auto w-[90%] h-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 pt-32">
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/50 
                backdrop-blur-sm rounded-full text-blue-600 text-sm">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                Research & Development Club
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-gray-900">
                Pioneering the Future of{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                  Research
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                BRAC University Research for Development Club - Where innovation meets excellence. 
                Join us in shaping tomorrow's technological landscape.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/about" 
                  className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 
                    transition-all duration-300 shadow-lg shadow-blue-600/20 
                    hover:shadow-xl hover:shadow-blue-600/30"
                >
                  Discover More
                </Link>
                <Link to="/join-us" 
                  className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-xl 
                    hover:bg-blue-50 transition-all duration-300"
                >
                  Join BUReD
                </Link>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-blue-50 
                rounded-full blur-3xl opacity-30 animate-pulse" />
              <img 
                src="photos/logos/redlogo.png" 
                alt="BUReD Logo" 
                className="relative w-full h-auto max-w-xl mx-auto 
                  drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1440px] mx-auto w-[90%]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <h3 className="text-4xl font-bold text-blue-600">50+</h3>
              <p className="text-gray-600">Active Members</p>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-4xl font-bold text-blue-600">20+</h3>
              <p className="text-gray-600">Research Projects</p>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-4xl font-bold text-blue-600">15+</h3>
              <p className="text-gray-600">Publications</p>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-4xl font-bold text-blue-600">10+</h3>
              <p className="text-gray-600">Awards Won</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="bg-white py-24">
        <div className="max-w-[1440px] mx-auto w-[90%]">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Recent Events</h2>
            <Link 
              to="/events" 
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              All Events
            </Link>
          </div>

          <div className="grid grid-cols-12 gap-8">
            {/* Main Featured Event */}
            <div className="col-span-12 lg:col-span-7">
              <Link to="/events/1" className="group block">
                <div className="relative overflow-hidden rounded-2xl">
                  <img 
                    src="/photos/other/f1.jpg" 
                    alt="Featured Event" 
                    className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                        EVENT
                      </span>
                      <span className="text-white text-sm">02 Feb 2025</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Architecture faculty attends MedGU-24 Conference in Spain
                    </h3>
                    <p className="text-gray-200">
                      Exploring innovative approaches to sustainable architecture and urban planning...
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Side Events */}
            <div className="col-span-12 lg:col-span-5 space-y-6">
              {[
                {
                  image: '/photos/other/f2.jpg',
                  date: 'Monday, 9:00 pm',
                  title: 'BRAC University Hosts Lecture on Climate Action with Dr. Eban Goodstein',
                  day: '03',
                  month: 'Feb',
                  year: '2025'
                },
                {
                  image: '/photos/other/f3.jpg',
                  date: 'Sunday, 8:45 am',
                  title: 'Research Team Wins International Robotics Competition',
                  day: '02',
                  month: 'Feb',
                  year: '2025'
                },
                {
                  image: '/photos/other/f4.jpg',
                  date: 'Thursday, 10:30 am',
                  title: 'BRAC University to Host Scholarly Exchange with NIT Silchar',
                  day: '30',
                  month: 'Jan',
                  year: '2025'
                }
              ].map((event, index) => (
                <Link 
                  key={index} 
                  to={`/events/${index + 2}`}
                  className="flex gap-6 group"
                >
                  <div className="flex-none">
                    <div className="bg-blue-50 rounded-lg p-4 text-center w-24">
                      <span className="block text-2xl font-bold text-blue-600">
                        {event.day}
                      </span>
                      <span className="block text-sm text-gray-600">
                        {event.month}
                      </span>
                      <span className="block text-sm text-gray-400">
                        {event.year}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <span className="block text-sm text-gray-500 mb-2">
                      {event.date}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 
                      group-hover:text-blue-600 transition-colors">
                      {event.title}
                    </h3>
                  </div>
                </Link>
              ))}
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
            <span className="inline-block px-4 py-1 bg-blue-100 text-blue-600 
              rounded-full text-sm font-medium mb-4">
              Community
            </span>
            <h2 className="text-4xl font-bold mb-6">
              Join our Research<br />
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
      <section className="relative bg-gradient-to-br from-gray-50 to-white py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] 
            bg-blue-100/30 rounded-full blur-3xl"></div>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] 
            bg-orange-100/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-[1440px] mx-auto w-[90%]">
          <div className="flex flex-col md:flex-row items-center gap-20">
            {/* Image Column */}
            <div className="md:w-1/2 relative">
              <div className="relative">
                {/* Decorative Elements */}
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-100 rounded-full 
                  mix-blend-multiply animate-pulse"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-orange-100 rounded-full 
                  mix-blend-multiply animate-pulse delay-300"></div>
                
                {/* Main Image Container */}
                <div className="relative z-10 rounded-3xl overflow-hidden 
                  shadow-2xl shadow-blue-900/20 aspect-square">
                  <img 
                    src="/photos/faculty/dr_tarnima.jpg" 
                    alt="Dr. Tarnima Warda Andalib" 
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="md:w-1/2 space-y-8">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-2 
                  bg-blue-100/50 rounded-full text-blue-600 text-sm backdrop-blur-sm mb-6">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                  Faculty Advisor
                </span>
                <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 
                  bg-clip-text text-transparent">
                  Dr. Tarnima Warda Andalib
                </h2>
                <p className="text-lg text-blue-600 font-medium">
                  Assistant Professor, BRAC Business School
                </p>
              </div>

              <div className="space-y-6">
                <p className="text-gray-600 text-lg leading-relaxed">
                  Dr. Tarnima Warda Andalib is currently working as an Assistant Professor at BRAC Business School, 
                  BRAC University, Bangladesh. Her expertise spans across strategic management, business simulation, 
                  and organizational development.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Previously served as a Post-Doctoral Fellow and Lecturer at the School of Management, 
                  University Sains Malaysia - the only APEX University in Malaysia (2019-2021).
                </p>
              </div>

              {/* Achievements Grid */}
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 
                  shadow-lg shadow-blue-100/20 hover:shadow-blue-200/30 
                  transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-4xl font-bold text-blue-600 mb-2">10+</h3>
                  <p className="text-gray-600">Years of Academic Excellence</p>
                </div>
                <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 
                  shadow-lg shadow-blue-100/20 hover:shadow-blue-200/30 
                  transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-4xl font-bold text-blue-600 mb-2">50+</h3>
                  <p className="text-gray-600">Research Publications</p>
                </div>
              </div>

              {/* Connect Button */}
              <a 
                href="https://linkedin.com/in/dr-tarnima" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white 
                  rounded-xl hover:bg-blue-700 transition-all duration-300 
                  shadow-lg shadow-blue-600/20 group mt-6"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span>Connect on LinkedIn</span>
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
          </div>
        </div>
      </section>

      {/* Press Releases Section */}
      <section className="bg-white py-24">
        <div className="max-w-[1440px] mx-auto w-[90%]">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-blue-100 text-blue-600 
              rounded-full text-sm font-medium mb-4">
              Recent Press Releases
            </span>
            <h2 className="text-4xl font-bold mb-6">
              BUReD is making headlines
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              From our innovative approaches to sustainable solutions to our 
              growing community of enthusiasts, we're proud to share these 
              stories that highlight our journey and impact in the field and beyond.
            </p>
          </div>

          {/* Press Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Press Card 1 */}
            <Link to="/press/1" className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl 
                transition-all duration-300">
                <div className="relative h-64">
                  <img 
                    src="/photos/other/f1.jpg" 
                    alt="Research News" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-sm text-gray-500">May 6th, 2024</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                      Press
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                    BUReD Phoenix: BRAC University's next-generation research initiative
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    BUReD's Phoenix, a next-generation research project from BRAC University, 
                    has secured a spot in the finals of the University Research Challenge 2024...
                  </p>
                </div>
                <div className="flex items-center gap-2 p-6 pt-0">
                  <img src="/photos/logos/dailystar.png" alt="The Daily Star" className="h-8 w-auto" />
                  <span className="text-sm text-gray-500">The Daily Star</span>
                </div>
              </div>
            </Link>

            {/* Press Card 2 */}
            <Link to="/press/2" className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl 
                transition-all duration-300">
                <div className="relative h-64">
                  <img 
                    src="/photos/other/f3.jpg" 
                    alt="Research News" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-sm text-gray-500">June 19th, 2023</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                      Press
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                    From Challenges to Triumph: BUReD's Journey at the University Research Challenge
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    BUReD, one of the most successful research teams of Bangladesh, has done 
                    wonders yet again in the recent University Research Challenge 2023...
                  </p>
                </div>
                <div className="flex items-center gap-2 p-6 pt-0">
                  <img src="/photos/logos/bracu.png" alt="BRACU Express" className="h-8 w-auto" />
                  <span className="text-sm text-gray-500">BRACU Express</span>
                </div>
              </div>
            </Link>

            {/* Press Card 3 */}
            <Link to="/press/3" className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl 
                transition-all duration-300">
                <div className="relative h-64">
                  <img 
                    src="/photos/other/f4.jpg" 
                    alt="Research News" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-sm text-gray-500">July 17th, 2023</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                      Press
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                    BUReD Research Club in University Research Challenge 2023 final
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    After several successful research projects and Bangladesh's first nano-satellite 
                    'Onnesha', students of BRAC University have developed another groundbreaking project...
                  </p>
                </div>
                <div className="flex items-center gap-2 p-6 pt-0">
                  <img src="/photos/logos/bracu.png" alt="BRACU" className="h-8 w-auto" />
                  <span className="text-sm text-gray-500">BRACU</span>
                </div>
              </div>
            </Link>
          </div>

          {/* View All Link */}
          <div className="text-center mt-12">
            <Link 
              to="/press"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 
                transition-colors group"
            >
              <span>View All Press Releases</span>
              <svg 
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto w-[90%]">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Upcoming Events</h2>
            <Link 
              to="/events" 
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              View All Events
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Research Workshop 2024",
                date: "March 15, 2024",
                time: "10:00 AM - 4:00 PM",
                location: "BRAC University Auditorium",
                image: "/photos/other/f5.jpg",
                category: "Workshop"
              },
              {
                title: "AI & Machine Learning Symposium",
                date: "March 20, 2024",
                time: "2:00 PM - 6:00 PM",
                location: "CSE Building",
                image: "/photos/other/f6.jpg",
                category: "Symposium"
              },
              {
                title: "Research Project Showcase",
                date: "March 25, 2024",
                time: "11:00 AM - 5:00 PM",
                location: "BRAC University Campus",
                image: "/photos/other/f1.jpg",
                category: "Exhibition"
              }
            ].map((event, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl 
                  transition-all duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 
                      transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                      {event.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4 group-hover:text-blue-600 
                    transition-colors">
                    {event.title}
                  </h3>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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