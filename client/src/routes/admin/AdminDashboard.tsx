import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaInbox } from 'react-icons/fa';

const AdminDashboard: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Close sidebar when route changes (for mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const navigation = [
    { name: 'Overview', href: '/admin' },
    { name: 'Users Management', href: '/admin/users' },
    { name: 'Panel Management', href: '/admin/panel' },
    { name: 'About Page', href: '/admin/about' },
    { name: 'Gallery', href: '/admin/gallery' },
    { name: 'Blog Posts', href: '/admin/blog' },
    { name: 'Registration Inbox', href: '/admin/inbox' },
    { name: 'Publications', href: '/admin/publications' }
  ];

  if (!user || (user.role !== 'admin' && user.role !== 'staff')) {
    console.log('Access denied. User role:', user?.role);
    return <div>Access Denied</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <div className="flex flex-1 h-full">
        {/* Mobile menu button */}
        <div className="fixed top-0 left-0 p-4 z-50 md:hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-500 hover:text-gray-900 focus:outline-none bg-white rounded-md p-2 shadow-md"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Sidebar */}
        <div 
          className={`fixed inset-y-0 left-0 transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 transition duration-200 ease-in-out md:relative md:flex md:flex-col md:w-64 bg-white border-r border-gray-200 z-50 md:min-h-screen`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-center h-16 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
            </div>
            <nav className="mt-5 px-2 space-y-1 flex-grow">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? 'bg-blue-100 text-blue-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {item.name === 'Registration Inbox' ? (
                      <div className="flex items-center justify-between w-full">
                        <span>{item.name}</span>
                        <FaInbox className="text-blue-500" />
                      </div>
                    ) : (
                      item.name
                    )}
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
        <div className="flex-1 md:ml-64 p-4 md:p-6 min-h-screen">
          {/* Mobile header spacing */}
          <div className="h-14 md:hidden"></div>
          
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 