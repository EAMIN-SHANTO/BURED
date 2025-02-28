import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

interface Registration {
  _id: string;
  name: string;
  email: string;
  semester: string;
  status: 'unread' | 'read';
  createdAt: string;
}

const RegistrationInbox: React.FC = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { API_URL } = useAuth();

  useEffect(() => {
    if (API_URL) {  // Only fetch if API_URL is available
      fetchRegistrations();
    }
  }, [API_URL]);

  const fetchRegistrations = async () => {
    if (!API_URL) {
      setError('API URL is not configured');
      setLoading(false);
      return;
    }

    try {
      console.log('Fetching registrations from:', `${API_URL}/api/registration`);
      
      const res = await fetch(`${API_URL}/api/registration`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log('Registration data:', data);

      if (data.success) {
        setRegistrations(data.registrations);
      } else {
        setError(data.message || 'Failed to fetch registrations');
      }
    } catch (err) {
      console.error('Registration fetch error:', err);
      setError('Failed to fetch registrations. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/api/registration/${id}/read`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });

      const data = await res.json();

      if (data.success) {
        setRegistrations(registrations.map(reg => 
          reg._id === id ? { ...reg, status: 'read' } : reg
        ));
      } else {
        console.error('Failed to mark as read:', data.message);
      }
    } catch (err) {
      console.error('Failed to mark as read:', err);
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
      <h2 className="text-2xl font-bold mb-6">Registration Inbox</h2>

      {error && (
        <div className="mb-4 text-red-600 bg-red-50 border border-red-200 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Semester
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {registrations.map((registration) => (
              <tr key={registration._id} className={registration.status === 'unread' ? 'bg-blue-50' : ''}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {registration.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {registration.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {registration.semester}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(registration.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    registration.status === 'unread' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {registration.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {registration.status === 'unread' && (
                    <button
                      onClick={() => handleMarkAsRead(registration._id)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Mark as Read
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {registrations.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No registration requests found.
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationInbox; 