const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
  images: [String], // Store image URLs or paths
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed', 'Archived'], default: 'Pending' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', default: null },
  assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' }, // Added property reference
  createdAt: { type: Date, default: Date.now },
  resolvedAt: { type: Date, default: null },
  comments: [
    {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      message: String,
      timestamp: { type: Date, default: Date.now }
    }
  ],
  vendor: {
    name: String,
    contact: String
  },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  tenantRef: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  // ✅ New Feedback field
  feedback: {
    rating: { type: Number, min: 1, max: 5 },
    comment: { type: String },
    submittedAt: { type: Date }
  }

}, { timestamps: true });

module.exports = mongoose.model('Request', requestSchema);
