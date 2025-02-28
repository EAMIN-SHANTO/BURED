import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

interface Publication {
  _id: string;
  title: string;
  authors: string;
  description: string;
  coverImage: string;
  link: string;
  publishedDate: string;
}

const PublicationsManagement: React.FC = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    description: '',
    link: '',
    publishedDate: '',
  });
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [error, setError] = useState('');
  const { API_URL } = useAuth();

  useEffect(() => {
    fetchPublications();
  }, [API_URL]);

  const fetchPublications = async () => {
    try {
      const res = await fetch(`${API_URL}/api/publications`, {
        credentials: 'include'
      });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!coverImage) {
      setError('Cover image is required');
      return;
    }

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });
    formDataToSend.append('coverImage', coverImage);

    try {
      console.log('Submitting to:', `${API_URL}/api/publications`);
      const res = await fetch(`${API_URL}/api/publications`, {
        method: 'POST',
        credentials: 'include',
        body: formDataToSend
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log('Response:', data);
      
      if (data.success) {
        setPublications([data.publication, ...publications]);
        // Reset form
        setFormData({
          title: '',
          authors: '',
          description: '',
          link: '',
          publishedDate: '',
        });
        setCoverImage(null);
        // Reset file input
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        setError(data.message || 'Failed to create publication');
      }
    } catch (error) {
      console.error('Error creating publication:', error);
      setError('Failed to create publication. Please try again later.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/api/publications/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      const data = await res.json();
      
      if (data.success) {
        setPublications(publications.filter(pub => pub._id !== id));
      }
    } catch (error) {
      console.error('Error deleting publication:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Publications</h2>
      
      {/* Add Publication Form */}
      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Add New Publication</h3>
        
        {error && (
          <div className="mb-4 text-red-600 bg-red-50 border border-red-200 p-4 rounded-lg">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Authors
            </label>
            <input
              type="text"
              value={formData.authors}
              onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Link
            </label>
            <input
              type="url"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Publication Date
            </label>
            <input
              type="date"
              value={formData.publishedDate}
              onChange={(e) => setFormData({ ...formData, publishedDate: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Image
            </label>
            <input
              type="file"
              onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
              className="w-full"
              accept="image/*"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add Publication
        </button>
      </form>

      {/* Publications List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cover</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Authors</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {publications.map((pub) => (
              <tr key={pub._id}>
                <td className="px-6 py-4">
                  <img 
                    src={`${API_URL}${pub.coverImage}`}
                    alt={pub.title}
                    className="h-20 w-16 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4">{pub.title}</td>
                <td className="px-6 py-4">{pub.authors}</td>
                <td className="px-6 py-4">
                  {new Date(pub.publishedDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(pub._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PublicationsManagement; 