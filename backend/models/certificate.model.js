import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  certificateId: {
    type: String,
    required: true,
    unique: true
  },
  memberName: {
    type: String,
    required: true
  },
  studentId: {
    type: String,
    required: true
  },
  clubDepartment: {
    type: String,
    required: true
  },
  certificateTitle: {
    type: String,
    required: true
  },
  issueDate: {
    type: Date,
    required: true
  },
  issuedBy: {
    type: String,
    required: true
  },
  issuerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  verificationUrl: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Certificate', certificateSchema); 