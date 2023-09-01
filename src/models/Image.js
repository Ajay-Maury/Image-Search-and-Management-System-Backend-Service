const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  title: { type: String,  required: true},
  description: { type: String,  required: true},
  imageUrl: { type: String,  required: true},
  dimensions: { type: String,  required: true},
  size: { type: Number,  required: true},
  keywords: { type: [String],  required: true},
  tags: { type: [String],  required: true},
  uploadedAt: { type: Date, default: Date.now },
  });

module.exports = mongoose.model('Image', imageSchema);
