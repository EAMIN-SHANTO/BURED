import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface User {
  id: string;
  username: string;
  email: string;
  role?: string;
  fullName?: string;
  studentId?: string;
  department?: string;
  batch?: string;
  phone?: string;
  position?: string;
  bio?: string;
  img?: string;
}

interface UpdateableFields {
  fullName: string;
  studentId: string;
  department: string;
  batch: string;
  phone: string;
  bio: string;
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user: authUser, setUser } = useAuth();
  const [user, setLocalUser] = useState<User | null>(null);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState<UpdateableFields>({
    fullName: '',
    studentId: '',
    department: '',
    batch: '',
    phone: '',
    bio: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log('Fetching user profile from:', `${API_URL}/api/auth/profile`);
        const res = await fetch(`${API_URL}/api/auth/profile`, {
          credentials: 'include',
        });

        if (!res.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await res.json();

        if (!data.success) {
          setError(data.message);
          navigate('/login');
          return;
        }

        setLocalUser(data.user);
        setFormData({
          fullName: data.user.fullName || '',
          studentId: data.user.studentId || '',
          department: data.user.department || '',
          batch: data.user.batch || '',
          phone: data.user.phone || '',
          bio: data.user.bio || ''
        });
      } catch (err) {
        console.error('Failed to fetch user:', err);
        setError('Failed to fetch user data');
        navigate('/login');
      }
    };

    fetchUser();
  }, [API_URL, navigate]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`${API_URL}/api/auth/update-profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message);
        return;
      }

      setLocalUser(data.user);
      setUser(data.user);
      setSuccess('Profile updated successfully');
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/logout`, {
        method: 'GET',
        credentials: 'include',
      });

      const data = await res.json();

      if (data.success) {
        setUser(null);
        navigate('/login');
      }
    } catch (err) {
      setError('Failed to logout');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Profile Information
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Personal details and account settings.
                </p>
              </div>
              <div className="flex gap-3">
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Edit Profile
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Logout
                </button>
              </div>
            </div>
            <div className="border-t border-gray-200">
              {isEditing ? (
                <form onSubmit={handleUpdate}>
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      {/* Read-only fields */}
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-500">
                          Username (read-only)
                        </label>
                        <input
                          type="text"
                          value={user?.username}
                          disabled
                          className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-500"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-500">
                          Email (read-only)
                        </label>
                        <input
                          type="email"
                          value={user?.email}
                          disabled
                          className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-500"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-500">
                          Role (read-only)
                        </label>
                        <input
                          type="text"
                          value={user?.role || 'User'}
                          disabled
                          className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-500"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-500">
                          Position (read-only)
                        </label>
                        <input
                          type="text"
                          value={user?.position || '-'}
                          disabled
                          className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-500"
                        />
                      </div>

                      {/* Editable fields */}
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-700">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-700">
                          Student ID
                        </label>
                        <input
                          type="text"
                          value={formData.studentId}
                          onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-700">
                          Department
                        </label>
                        <input
                          type="text"
                          value={formData.department}
                          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-700">
                          Batch
                        </label>
                        <input
                          type="text"
                          value={formData.batch}
                          onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-700">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div className="col-span-6">
                        <label className="block text-sm font-medium text-gray-700">
                          Bio
                        </label>
                        <textarea
                          rows={4}
                          value={formData.bio}
                          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="mr-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Username</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.username}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.email}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.fullName || '-'}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Student ID</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.studentId || '-'}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Department</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.department || '-'}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Batch</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.batch || '-'}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Phone</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.phone || '-'}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Role</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.role || 'User'}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Position</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.position || '-'}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Bio</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.bio || '-'}
                    </dd>
                  </div>
                </dl>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 