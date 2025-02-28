import React, { useState, useEffect } from 'react';

interface GalleryItem {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
}

const Gallery: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const res = await fetch(`${API_URL}/api/gallery`);
        const data = await res.json();

        if (data.success) {
          setItems(data.items);
        } else {
          setError('Failed to fetch gallery items');
        }
      } catch (err) {
        setError('Failed to fetch gallery items');
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryItems();
  }, [API_URL]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Gallery</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={`${API_URL}${item.image}`}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                <p className="text-gray-600 mt-1">{item.description}</p>
                <div className="mt-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {item.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && !error && (
          <div className="text-center text-gray-500 mt-8">
            No gallery items found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery; 