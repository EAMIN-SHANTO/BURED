import React from 'react';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  author: {
    name: string;
    image: string;
    role: string;
  };
  image: string;
}

const Blog: React.FC = () => {
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Precision: Georeferencing's Crucial Role in GIS",
      excerpt: "In the ever-evolving landscape of modern technology, Geographic Information Systems (GIS) have emerged as a vital tool for analyzing, managing, and visualizing spatial data...",
      date: "August 15th, 2023",
      readTime: "5 mins read",
      category: "Research",
      author: {
        name: "Member X1",
        image: "/photos/other/avt.jpg",
        role: "Research Lead"
      },
      image: "/photos/other/f1.jpg"
    },
    {
      id: 2,
      title: "The Stellar Journey of Satellite-Based Navigation and GNSS",
      excerpt: "Satellite-based navigation has revolutionized how we traverse the Earth, making it an indispensable technology in various industries, from aviation and maritime...",
      date: "October 26th, 2023",
      readTime: "13 mins read",
      category: "Technology",
      author: {
        name: "Member X2",
        image: "/photos/other/avt.jpg",
        role: "Technical Writer"
      },
      image: "/photos/other/f2.jpg"
    },
    {
      id: 3,
      title: "Understanding the Future of Robotics Research",
      excerpt: "As we step into a new era of technological advancement, robotics research continues to push the boundaries of what's possible...",
      date: "November 3rd, 2023",
      readTime: "8 mins read",
      category: "Innovation",
      author: {
        name: "Member X3",
        image: "/photos/other/avt.jpg",
        role: "Robotics Lead"
      },
      image: "/photos/other/f3.jpg"
    }
  ];

  return (
    <div className="flex flex-col pt-24">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Image and Overlay */}
        <div className="absolute inset-0">
          <img 
            src="/photos/other/newb.svg"
            alt="Blog Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 to-blue-800/95"></div>
        </div>

        <div className="relative max-w-[1440px] mx-auto w-[90%]">
          <div className="text-center">
            <span className="inline-block px-4 py-1 bg-white/10 text-white 
              backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              Our Blog
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Stay Informed with Latest{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
                Updates
              </span>
            </h1>
            <p className="text-blue-100 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Check out the latest news, achievements, and technical 
              breakthroughs from BUReD.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1440px] mx-auto w-[90%]">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12">
            <div className="relative w-full md:w-96">
              <input 
                type="text"
                placeholder="Search blogs..."
                className="w-full px-4 py-2 pl-10 bg-gray-50 border border-gray-200 
                  rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 
                  focus:border-blue-300"
              />
              <svg 
                className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <select className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl 
              focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300">
              <option>Newest First</option>
              <option>Oldest First</option>
              <option>Most Popular</option>
            </select>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`} className="group">
                <article className="bg-white rounded-2xl overflow-hidden shadow-lg 
                  hover:shadow-xl transition-all duration-300">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 
                        transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-sm text-gray-500">{post.date}</span>
                      <span className="text-sm text-gray-500">{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 
                      transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-6">
                      {post.excerpt}
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <img 
                        src={post.author.image}
                        alt={post.author.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          {post.author.name}
                        </h4>
                        <p className="text-sm text-gray-500">{post.author.role}</p>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-blue-600 text-white rounded-xl 
              hover:bg-blue-700 transition-all duration-300 shadow-lg 
              shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30">
              Load More Posts
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog; 