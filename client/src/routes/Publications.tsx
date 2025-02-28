import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

interface Publication {
  _id: string;
  title: string;
  authors: string;
  description: string;
  coverImage: string;
  link: string;
  publishedDate: string;
}

const Publications: React.FC = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const { API_URL } = useAuth();

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const res = await fetch(`${API_URL}/api/publications`);
        const data = await res.json();
        
        if (data.success) {
          setPublications(data.publications);
        }
      } catch (error) {
        console.error('Error fetching publications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, [API_URL]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">Publications</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {publications.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No publications available yet.</p>
          </div>
        ) : (
          publications.map((pub) => (
            <div key={pub._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src={`${API_URL}${pub.coverImage}`}
                alt={pub.title}
                className="w-full h-48 md:h-64 object-cover"
              />
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{pub.title}</h3>
                <p className="text-gray-600 text-sm mb-3 md:mb-4">{pub.authors}</p>
                <p className="text-gray-700 text-sm md:text-base mb-3 md:mb-4 line-clamp-3">{pub.description}</p>
                <a 
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                  Read Publication
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Publications; 