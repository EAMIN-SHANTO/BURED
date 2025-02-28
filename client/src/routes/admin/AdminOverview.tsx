import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FaInbox } from 'react-icons/fa';

const AdminOverview: React.FC = () => {
  const { user, API_URL } = useAuth();
  const [stats, setStats] = useState({
    unreadRegistrations: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch registration stats
        const regRes = await fetch(`${API_URL}/api/registration`, {
          credentials: 'include'
        });
        const regData = await regRes.json();
        
        if (regData.success) {
          const unreadCount = regData.registrations.filter(
            (reg: any) => reg.status === 'unread'
          ).length;
          
          setStats(prev => ({
            ...prev,
            unreadRegistrations: unreadCount
          }));
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, [API_URL]);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-semibold mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">Welcome</h3>
          <p className="mt-2 text-gray-600">
            You are logged in as {user?.username} ({user?.role})
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <a href="/admin/users" className="text-blue-600 hover:text-blue-800">
                Manage Users
              </a>
            </li>
            <li>
              <a href="/admin/panel" className="text-blue-600 hover:text-blue-800">
                Update Panel
              </a>
            </li>
            <li>
              <a href="/admin/blog" className="text-blue-600 hover:text-blue-800">
                Create New Blog Post
              </a>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">System Status</h3>
          <div className="mt-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Status</span>
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                Active
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">New Registrations</h3>
            <FaInbox className="w-5 h-5 text-blue-500" />
          </div>
          <p className="mt-2 text-3xl font-bold text-blue-600">
            {stats.unreadRegistrations}
          </p>
          <p className="mt-1 text-sm text-gray-500">Unread requests</p>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview; 