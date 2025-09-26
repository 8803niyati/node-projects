const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String },
  price: { type: Number, required: true },
  year: { type: Number },
  coverImage: { type: String },
});

module.exports = mongoose.model("Book", bookSchema);
