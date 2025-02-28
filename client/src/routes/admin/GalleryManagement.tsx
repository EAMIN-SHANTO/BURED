import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface GalleryItem {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  active: boolean;
  order: number;
}

interface GalleryForm {
  title: string;
  description: string;
  category: string;
  image: File | null;
}

const GalleryManagement: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const API_URL = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState<GalleryForm>({
    title: '',
    description: '',
    category: 'Event',
    image: null
  });

  const categories = ['Event', 'Workshop', 'Conference', 'Other'];

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const res = await fetch(`${API_URL}/api/gallery`, {
        credentials: 'include'
      });
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('category', formData.category);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      const url = selectedItem 
        ? `${API_URL}/api/gallery/${selectedItem._id}`
        : `${API_URL}/api/gallery`;

      const res = await fetch(url, {
        method: selectedItem ? 'PUT' : 'POST',
        credentials: 'include',
        body: formDataToSend
      });

      const data = await res.json();

      if (data.success) {
        await fetchGalleryItems();
        setSuccess(selectedItem ? 'Item updated successfully' : 'Item added successfully');
        resetForm();
      } else {
        setError(data.message || 'Operation failed');
      }
    } catch (err) {
      setError('Something went wrong');
    }
  };

  const handleEdit = (item: GalleryItem) => {
    setIsEditing(true);
    setSelectedItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category,
      image: null
    });
    setImagePreview(item.image);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/api/gallery/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      const data = await res.json();

      if (data.success) {
        await fetchGalleryItems();
        setSuccess('Item deleted successfully');
      } else {
        setError(data.message || 'Failed to delete item');
      }
    } catch (err) {
      setError('Failed to delete item');
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setSelectedItem(null);
    setFormData({
      title: '',
      description: '',
      category: 'Event',
      image: null
    });
    setImagePreview('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">
          {isEditing ? 'Edit Gallery Item' : 'Add New Gallery Item'}
        </h2>

        {/* Error and Success messages */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg">
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg p-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 block w-full"
                required={!isEditing}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 h-32 w-32 object-cover rounded-lg"
                />
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              {isEditing ? 'Update Item' : 'Add Item'}
            </button>
          </div>
        </form>
      </div>

      {/* Gallery Items List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item._id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img
              src={`${API_URL}${item.image}`}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">{item.category}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <FaEdit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FaTrash className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryManagement; 