import mongoose from "mongoose";

const panelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['President', 'Vice President', 'Senior Executive', 'Member']
  },
  image: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  socialLinks: {
    twitter: String,
    linkedin: String
  },
  order: {
    type: Number,
    default: 0
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Panel = mongoose.model("Panel", panelSchema);

export default Panel; 