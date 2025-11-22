const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 32,
    unique: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Category", CategorySchema);
