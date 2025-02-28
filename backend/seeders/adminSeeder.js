import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const createAdmin = async () => {
  try {
    // Check if admin already exists
    const adminExists = await User.findOne({ email: "admin@bured.org" });
    
    if (adminExists) {
      console.log('Admin already exists');
      return;
    }

    // Create admin user
    const hashedPassword = await bcryptjs.hash("admin123", 10);
    
    const admin = new User({
      username: "admin",
      email: "admin@bured.org",
      password: hashedPassword,
      role: "admin",
      position: "Super Admin"
    });

    await admin.save();
    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    mongoose.connection.close();
  }
};

createAdmin(); 