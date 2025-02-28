import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './lib/connectDB.js';
import authRouter from './routes/auth.route.js';
import adminRoutes from './routes/admin.route.js';
import panelRoutes from './routes/panel.route.js';
import galleryRoutes from './routes/gallery.route.js';
import path from 'path';
import { fileURLToPath } from 'url';

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

// Add this after your middleware configurations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from uploads directory with proper CORS
app.use('/uploads', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
}, express.static(path.join(__dirname, 'uploads')));

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
