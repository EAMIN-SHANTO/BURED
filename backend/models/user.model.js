import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'staff'],
    default: 'user'
  },
  fullName: String,
  studentId: String,
  department: String,
  batch: String,
  phone: String,
  position: String,
  bio: String,
  img: String,
}, { timestamps: true });

export default mongoose.model("User", userSchema);