const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  year: { type: Number, required: true },
  releaseDate: { type: Date },
  director: { type: String },
  rating: { type: Number },
  language: { type: String },
  description: { type: String },
  poster: { type: String },
});

module.exports = mongoose.model("Movie", movieSchema);
