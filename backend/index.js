import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './lib/connectDB.js';
import authRouter from './routes/auth.route.js';
import adminRoutes from './routes/admin.route.js';
import panelRoutes from './routes/panel.route.js';
import galleryRoutes from './routes/gallery.route.js';
import blogRoutes from './routes/blog.route.js';
import registrationRoutes from './routes/registration.route.js';
import publicationRoutes from './routes/publication.route.js';
import path from 'path';
import { fileURLToPath } from 'url';
import certificateRoutes from './routes/certificate.routes.js';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS configuration
app.use((req, res, next) => {
  // Allow multiple origins
  const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRoutes);
app.use('/api/panel', panelRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/registration', registrationRoutes);
app.use('/api/publications', publicationRoutes);
app.use('/api/certificates', certificateRoutes);

// Add this after your middleware configurations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from uploads directory with proper CORS
app.use('/uploads', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  console.log('Serving file:', req.url); // Add this for debugging
  next();
}, express.static(path.join(__dirname, 'uploads')));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 5001;

// Start server
const startServer = async () => {
  try {
    // Connect to MongoDB first
    await connectDB();
    console.log('Connected to MongoDB');

    // Then start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1); // Exit if we can't connect to MongoDB
  }
};

// Error handling
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  process.exit(1);
});

startServer();
