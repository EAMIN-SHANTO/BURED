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
import ImageTest from './components/ImageTest';
import Profile from './routes/Profile';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
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
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App; 