import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FiUser, FiMail, FiTag, FiBook, FiPhone, FiInfo, 
  FiEdit2, FiLogOut, FiSave, FiX, FiAward, FiBriefcase, FiHash,
  FiChevronRight
} from 'react-icons/fi';

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
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
      try {
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [API_URL, navigate]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

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
    } finally {
      setIsLoading(false);
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

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  // Get a consistent color based on username
  const getAvatarColor = (username: string) => {
    const colors = [
      'bg-blue-600', 'bg-green-600', 'bg-purple-600', 
      'bg-red-600', 'bg-indigo-600', 'bg-pink-600', 
      'bg-yellow-600', 'bg-teal-600'
    ];
    
    // Simple hash function to get consistent color
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  if (isLoading && !user) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 md:pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 md:pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">Unable to load profile</div>
          <button 
            onClick={() => navigate('/login')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Refined Background Graphics */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Clean grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="h-full w-full" style={{ 
            backgroundImage: 'linear-gradient(to right, #3B82F6 1px, transparent 1px), linear-gradient(to bottom, #3B82F6 1px, transparent 1px)',
            backgroundSize: '40px 40px' 
          }}></div>
        </div>
        
        {/* Subtle radial gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-blue-50 to-transparent opacity-30" style={{ 
          background: 'radial-gradient(circle at 70% 20%, rgba(59, 130, 246, 0.05) 0%, rgba(59, 130, 246, 0) 50%)' 
        }}></div>
      </div>

      {/* Alerts - Fixed at top for mobile */}
      {(error || success) && (
        <div className="fixed top-16 md:top-20 inset-x-0 z-50 px-4">
          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center shadow-lg">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium">{error}</p>
              </div>
              <button 
                onClick={() => setError('')}
                className="ml-auto text-red-500 hover:text-red-600"
              >
                <FiX size={20} />
              </button>
            </div>
          )}
          
          {success && (
            <div className="mt-4 bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl flex items-center shadow-lg">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium">{success}</p>
              </div>
              <button 
                onClick={() => setSuccess('')}
                className="ml-auto text-green-500 hover:text-green-600"
              >
                <FiX size={20} />
              </button>
            </div>
          )}
        </div>
      )}

      <div className="pt-16 md:pt-24 pb-12 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 sm:p-8 rounded-t-xl relative overflow-hidden">
              {/* Clean header pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%">
                  <defs>
                    <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#smallGrid)" />
                </svg>
              </div>
              
              {/* Subtle curved line */}
              <div className="absolute bottom-0 left-0 w-full overflow-hidden h-8">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-8">
                  <path d="M0,0 L1200,0 C1000,20 800,40 600,30 C400,20 200,10 0,30 L0,0 Z" fill="white" fillOpacity="0.1"></path>
                </svg>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between relative z-10">
                <div className="flex flex-col sm:flex-row items-center">
                  {/* First Letter Avatar with cleaner styling */}
                  <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full bg-white p-1.5 shadow-sm flex-shrink-0">
                    <div className={`h-full w-full rounded-full ${getAvatarColor(user.username)} flex items-center justify-center text-white text-4xl font-bold`}>
                      {getInitials(user.username)}
                    </div>
                  </div>
                  
                  <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
                    <h1 className="text-2xl font-bold text-white">{user.username}</h1>
                    <div className="flex flex-col sm:flex-row items-center sm:items-start mt-1">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-800 text-white">
                        {user.role || 'Member'}
                      </span>
                      <span className="mt-1 sm:mt-0 sm:ml-2 text-blue-100">{user.email}</span>
                    </div>
                    
                    {/* Add Position Display */}
                    {user.position && (
                      <div className="mt-2 flex items-center justify-center sm:justify-start">
                        <FiBriefcase className="text-blue-200 mr-1" size={14} />
                        <span className="text-sm text-blue-100">{user.position}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-6 sm:mt-0 flex space-x-3">
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="inline-flex items-center px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors shadow-sm"
                    >
                      <FiEdit2 className="mr-2" />
                      <span>Edit Profile</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsEditing(false)}
                      className="inline-flex items-center px-4 py-2 bg-white text-blue-700 rounded-lg hover:bg-blue-50 transition-colors shadow-sm"
                    >
                      <FiX className="mr-2" />
                      <span>Cancel</span>
                    </button>
                  )}
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center px-4 py-2 bg-white text-blue-700 rounded-lg hover:bg-blue-50 transition-colors shadow-sm"
                  >
                    <FiLogOut className="mr-2" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="p-6 sm:p-8 relative">
              {/* Cleaner content background */}
              <div className="absolute inset-0 opacity-[0.02]">
                <svg width="100%" height="100%">
                  <defs>
                    <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="10" cy="10" r="1" fill="#3B82F6" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#dots)" />
                </svg>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                    <span className="w-1 h-6 bg-blue-500 rounded-full mr-2"></span>
                    {isEditing ? 'Edit Profile Information' : 'Profile Information'}
                  </h2>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <FiEdit2 className="mr-1" size={16} />
                      Edit
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <form onSubmit={handleUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700 flex items-center">
                          <FiUser className="mr-2" />
                          Username (read-only)
                        </label>
                        <input
                          type="text"
                          value={user.username}
                          disabled
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 text-gray-500"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700 flex items-center">
                          <FiMail className="mr-2" />
                          Email (read-only)
                        </label>
                        <input
                          type="email"
                          value={user.email}
                          disabled
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 text-gray-500"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700 flex items-center">
                          <FiAward className="mr-2" />
                          Role (read-only)
                        </label>
                        <input
                          type="text"
                          value={user?.role || 'User'}
                          disabled
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 text-gray-500"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700 flex items-center">
                          <FiBriefcase className="mr-2" />
                          Position (read-only)
                        </label>
                        <input
                          type="text"
                          value={user?.position || '-'}
                          disabled
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 text-gray-500"
                        />
                      </div>

                      {/* Editable fields */}
                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700 flex items-center">
                          <FiUser className="mr-2" />
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700 flex items-center">
                          <FiHash className="mr-2" />
                          Student ID
                        </label>
                        <input
                          type="text"
                          value={formData.studentId}
                          onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter your student ID"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700 flex items-center">
                          <FiBook className="mr-2" />
                          Department
                        </label>
                        <input
                          type="text"
                          value={formData.department}
                          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter your department"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700 flex items-center">
                          <FiTag className="mr-2" />
                          Batch
                        </label>
                        <input
                          type="text"
                          value={formData.batch}
                          onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter your batch"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700 flex items-center">
                          <FiPhone className="mr-2" />
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700 flex items-center">
                        <FiInfo className="mr-2" />
                        Bio
                      </label>
                      <textarea
                        rows={4}
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Tell us about yourself"
                      />
                    </div>

                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <FiX className="mr-2" />
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        {isLoading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                          </>
                        ) : (
                          <>
                            <FiSave className="mr-2" />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {/* Section headers with decorative elements */}
                    <div className="py-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
                        <span className="w-1 h-4 bg-blue-400 rounded-full mr-2"></span>
                        PERSONAL INFORMATION
                      </h3>
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center">
                          <div className="w-full sm:w-1/3 flex items-center text-sm font-medium text-gray-500">
                            <FiUser className="mr-2 text-gray-400 flex-shrink-0" />
                            <span>Username</span>
                          </div>
                          <div className="mt-1 sm:mt-0 sm:w-2/3 text-base text-gray-900 font-medium">
                            {user.username}
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center">
                          <div className="w-full sm:w-1/3 flex items-center text-sm font-medium text-gray-500">
                            <FiMail className="mr-2 text-gray-400 flex-shrink-0" />
                            <span>Email</span>
                          </div>
                          <div className="mt-1 sm:mt-0 sm:w-2/3 text-base text-gray-900">
                            {user.email}
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center">
                          <div className="w-full sm:w-1/3 flex items-center text-sm font-medium text-gray-500">
                            <FiUser className="mr-2 text-gray-400 flex-shrink-0" />
                            <span>Full Name</span>
                          </div>
                          <div className="mt-1 sm:mt-0 sm:w-2/3 text-base text-gray-900">
                            {user.fullName || '-'}
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center">
                          <div className="w-full sm:w-1/3 flex items-center text-sm font-medium text-gray-500">
                            <FiPhone className="mr-2 text-gray-400 flex-shrink-0" />
                            <span>Phone</span>
                          </div>
                          <div className="mt-1 sm:mt-0 sm:w-2/3 text-base text-gray-900">
                            {user.phone || '-'}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="py-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
                        <span className="w-1 h-4 bg-green-400 rounded-full mr-2"></span>
                        ACADEMIC INFORMATION
                      </h3>
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center">
                          <div className="w-full sm:w-1/3 flex items-center text-sm font-medium text-gray-500">
                            <FiHash className="mr-2 text-gray-400 flex-shrink-0" />
                            <span>Student ID</span>
                          </div>
                          <div className="mt-1 sm:mt-0 sm:w-2/3 text-base text-gray-900">
                            {user.studentId || '-'}
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center">
                          <div className="w-full sm:w-1/3 flex items-center text-sm font-medium text-gray-500">
                            <FiBook className="mr-2 text-gray-400 flex-shrink-0" />
                            <span>Department</span>
                          </div>
                          <div className="mt-1 sm:mt-0 sm:w-2/3 text-base text-gray-900">
                            {user.department || '-'}
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center">
                          <div className="w-full sm:w-1/3 flex items-center text-sm font-medium text-gray-500">
                            <FiTag className="mr-2 text-gray-400 flex-shrink-0" />
                            <span>Batch</span>
                          </div>
                          <div className="mt-1 sm:mt-0 sm:w-2/3 text-base text-gray-900">
                            {user.batch || '-'}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="py-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
                        <span className="w-1 h-4 bg-purple-400 rounded-full mr-2"></span>
                        ROLE INFORMATION
                      </h3>
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center">
                          <div className="w-full sm:w-1/3 flex items-center text-sm font-medium text-gray-500">
                            <FiAward className="mr-2 text-gray-400 flex-shrink-0" />
                            <span>Role</span>
                          </div>
                          <div className="mt-1 sm:mt-0 sm:w-2/3">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {user.role || 'User'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center">
                          <div className="w-full sm:w-1/3 flex items-center text-sm font-medium text-gray-500">
                            <FiBriefcase className="mr-2 text-gray-400 flex-shrink-0" />
                            <span>Position</span>
                          </div>
                          <div className="mt-1 sm:mt-0 sm:w-2/3 text-base text-gray-900">
                            {user.position || '-'}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="py-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
                        <span className="w-1 h-4 bg-yellow-400 rounded-full mr-2"></span>
                        BIO
                      </h3>
                      <div className="text-base text-gray-900 whitespace-pre-line">
                        {user.bio || 'No bio information provided.'}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 