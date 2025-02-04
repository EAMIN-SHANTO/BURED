import React from 'react';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
}

const Gallery: React.FC = () => {
  const images: GalleryImage[] = [
    {
      id: 1,
      src: "/photos/other/f1.jpg",
      alt: "Research Project 1",
      category: "Research"
    },
    {
      id: 2,
      src: "/photos/other/f2.jpg",
      alt: "Team Meeting",
      category: "Team"
    },
    {
      id: 3,
      src: "/photos/other/f3.jpg",
      alt: "Project Showcase",
      category: "Events"
    },
    {
      id: 4,
      src: "/photos/other/f4.jpg",
      alt: "Research Project 2",
      category: "Research"
    },
    {
      id: 5,
      src: "/photos/other/f5.jpg",
      alt: "Team Collaboration",
      category: "Team"
    },
    {
      id: 6,
      src: "/photos/other/f6.jpg",
      alt: "Workshop Session",
      category: "Events"
    }
  ];

  return (
    <div className="flex flex-col pt-24">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Image and Overlay */}
        <div className="absolute inset-0">
          <img 
            src="/photos/other/resp.png"
            alt="Gallery Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 to-blue-800/95"></div>
        </div>

        <div className="relative max-w-[1440px] mx-auto w-[90%]">
          <div className="text-center">
            <span className="inline-block px-4 py-1 bg-white/10 text-white 
              backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              Gallery
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Showcasing Our Beautiful{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
                Moments
              </span>
            </h1>
            <p className="text-blue-100 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Explore our gallery featuring BUReD's achievements, projects, and team 
              collaborations that highlight our dedication to advancing research 
              engineering and technical excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-[1440px] mx-auto w-[90%]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((image) => (
              <div 
                key={image.id} 
                className="group relative overflow-hidden rounded-2xl shadow-lg 
                  hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-full object-cover transform group-hover:scale-105 
                      transition-transform duration-500"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 
                  via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 
                  transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-blue-600/80 backdrop-blur-sm 
                        text-white text-sm rounded-full">
                        {image.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{image.alt}</h3>
                  </div>
                </div>

                {/* Zoom Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 
                  backdrop-blur-sm rounded-full flex items-center justify-center 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                  cursor-pointer hover:bg-white">
                  <svg 
                    className="w-5 h-5 text-gray-900" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery; 