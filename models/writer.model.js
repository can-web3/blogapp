const mongoose = require("mongoose");

const WriterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  image: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required: true
  },
  short_description: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Writer", WriterSchema);
