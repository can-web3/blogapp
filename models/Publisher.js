const mongoose = require("mongoose");

const PublisherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  short_description: {
    type: String,
    trim: true,
    maxLength: 200
  }
}, { timestamps: true });

module.exports = mongoose.model("Publisher", PublisherSchema);