import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaInbox } from 'react-icons/fa';

const AdminDashboard: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  console.log('Current user:', user);

  const navigation = [
    { name: 'Overview', href: '/admin' },
    { name: 'Users Management', href: '/admin/users' },
    { name: 'Panel Management', href: '/admin/panel' },
    { name: 'About Page', href: '/admin/about' },
    { name: 'Gallery', href: '/admin/gallery' },
    { name: 'Blog Posts', href: '/admin/blog' },
    { name: 'Registration Inbox', href: '/admin/inbox' }
  ];

  if (!user || (user.role !== 'admin' && user.role !== 'staff')) {
    console.log('Access denied. User role:', user?.role);
    return <div>Access Denied</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm h-screen fixed">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-center h-16 px-4 bg-blue-600">
              <h2 className="text-xl font-semibold text-white">
                {user.role === 'admin' ? 'Admin' : 'Staff'} Dashboard
              </h2>
            </div>
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10">
                  <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">{user.username}</p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 ml-64">
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 