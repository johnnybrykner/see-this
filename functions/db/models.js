const mongoose = require("mongoose");

const filmSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  year: String,
  liked: false,
  disliked: false,
});

module.exports = {
  Film: mongoose.model("Film", filmSchema),
};
