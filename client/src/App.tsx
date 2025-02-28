import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Homepage from "./routes/Homepage";
import Login from "./routes/Login";
import Register from "./routes/Register";
import About from './routes/About';
import Panel from './routes/Panel';
import Gallery from './routes/Gallery';
import Blog from './routes/Blog';
import BlogPost from './routes/BlogPost';
import ImageTest from './components/ImageTest';
import Profile from './routes/Profile';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './routes/admin/AdminDashboard';
import UsersManagement from './routes/admin/UsersManagement';
import AdminOverview from './routes/admin/AdminOverview';
import PanelManagement from './routes/admin/PanelManagement';
import AboutManagement from './routes/admin/AboutManagement';
import GalleryManagement from './routes/admin/GalleryManagement';
import BlogManagement from './routes/admin/BlogManagement';
import RegistrationInbox from './routes/admin/RegistrationInbox';

// Add this configuration object
const routerConfig = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router {...routerConfig}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Homepage />} />
            <Route path="login" element={
              <ProtectedRoute authRequired={false}>
                <Login />
              </ProtectedRoute>
            } />
            <Route path="register" element={
              <ProtectedRoute authRequired={false}>
                <Register />
              </ProtectedRoute>
            } />
            <Route path="profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="about" element={<About />} />
            <Route path="panel" element={<Panel />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogPost />} />
            <Route path="test" element={<ImageTest />} />
            <Route path="*" element={
              <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                  <p className="text-gray-600">Page not found</p>
                </div>
              </div>
            } />
          </Route>

          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requiredRole={['admin', 'staff']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminOverview />} />
            <Route 
              path="users" 
              element={
                <ProtectedRoute requiredRole={['admin']}>
                  <UsersManagement />
                </ProtectedRoute>
              } 
            />
            <Route path="panel" element={<PanelManagement />} />
            <Route path="about" element={<AboutManagement />} />
            <Route path="gallery" element={<GalleryManagement />} />
            <Route path="blog" element={<BlogManagement />} />
            <Route path="inbox" element={<RegistrationInbox />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App; 