import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './lib/connectDB.js';
import authRouter from './routes/auth.route.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

// CORS configuration
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// Routes
app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is busy, trying ${PORT + 1}`);
    app.listen(PORT + 1);
  } else {
    console.error(err);
  }
});
