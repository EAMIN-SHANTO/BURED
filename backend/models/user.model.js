import { Schema } from "mongoose";
import mongoose from "mongoose";
const userSchema = new Schema(
    {
      username: { type: String, required: true, unique: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      role: { 
        type: String, 
        enum: ['user', 'staff', 'admin'],
        default: 'user'  // This sets the default role
      },
      img: { type: String },
      

    },
    { timestamps: true }
  );


  export default mongoose.model("User", userSchema);