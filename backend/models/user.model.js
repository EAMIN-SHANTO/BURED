import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'staff', 'admin'],
    default: 'user'
  },
  position: {
    type: String,
    default: ''
  },
  fullName: String,
  studentId: String,
  department: String,
  batch: String,
  phone: String,
  bio: String,
  img: String
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);

export default User;