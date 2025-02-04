import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="flex flex-col pt-24">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Image and Overlay */}
        <div className="absolute inset-0">
          <img 
            src="/photos/other/research.png"
            alt="Research Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 to-blue-800/95"></div>
        </div>

        <div className="relative max-w-[1440px] mx-auto w-[90%]">
          <div className="text-center">
            <span className="inline-block px-4 py-1 bg-white/10 text-white 
              backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              About Us
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Pioneering Research for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
                Tomorrow
              </span>
            </h1>
            <p className="text-blue-100 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              BUReD is BRAC University's premier research and development club, 
              dedicated to fostering innovation and excellence in technology and research.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-[1440px] mx-auto w-[90%]">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Mission */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 
                rounded-full text-orange-600 text-sm">
                <span className="w-2 h-2 rounded-full bg-orange-600"></span>
                Our Mission
              </div>
              <h2 className="text-3xl font-bold">Driving Innovation Through Research</h2>
              <p className="text-gray-600 leading-relaxed">
                To create a platform where students can explore their potential in research 
                and development, fostering an environment of innovation, collaboration, 
                and technological advancement.
              </p>
              <ul className="space-y-4">
                {[
                  'Promote research culture among students',
                  'Facilitate hands-on learning experiences',
                  'Bridge academia and industry through research',
                  'Contribute to technological advancement'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-orange-600 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vision */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 
                rounded-full text-blue-600 text-sm">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                Our Vision
              </div>
              <h2 className="text-3xl font-bold">Shaping the Future of Technology</h2>
              <p className="text-gray-600 leading-relaxed">
                To be recognized as a leading student research organization, known for 
                groundbreaking innovations and meaningful contributions to the field of 
                technology and research.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: '50+', label: 'Active Members' },
                  { number: '20+', label: 'Research Projects' },
                  { number: '15+', label: 'Publications' },
                  { number: '10+', label: 'Awards Won' }
                ].map((stat, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</h3>
                    <p className="text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1440px] mx-auto w-[90%]">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-blue-100 text-blue-600 
              rounded-full text-sm font-medium mb-4">
              Our Journey
            </span>
            <h2 className="text-4xl font-bold mb-6">Milestones That Define Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From our humble beginnings to our current achievements, every step has 
              shaped our commitment to excellence in research and innovation.
            </p>
          </div>

          <div className="space-y-12">
            {[
              {
                year: '2023',
                title: 'International Recognition',
                description: 'Won multiple awards in international research competitions'
              },
              {
                year: '2022',
                title: 'Research Excellence',
                description: 'Published groundbreaking research papers in prestigious journals'
              },
              {
                year: '2021',
                title: 'Community Growth',
                description: 'Expanded to over 50 active members and launched new initiatives'
              },
              {
                year: '2020',
                title: 'Foundation',
                description: "Established as BRAC University's premier research club"
              }
            ].map((milestone, index) => (
              <div key={index} className="flex gap-8">
                <div className="flex-none w-32 text-right">
                  <span className="text-2xl font-bold text-blue-600">{milestone.year}</span>
                </div>
                <div className="relative flex-1 pb-12 border-l-2 border-gray-200 pl-8">
                  <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-blue-600" />
                  <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="max-w-[1440px] mx-auto w-[90%]">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-6">Join Our Research Community</h2>
            <p className="text-blue-100 max-w-2xl mx-auto mb-8">
              Be part of a dynamic community dedicated to pushing the boundaries of 
              innovation and research. Together, we can make a difference.
            </p>
            <Link 
              to="/join-us"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 
                rounded-xl font-medium hover:bg-blue-50 transition-all duration-300 
                shadow-lg shadow-blue-700/20"
            >
              <span>Become a Member</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 