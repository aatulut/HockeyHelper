const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  favoriteTeam: String,
  homeCity: String
});

module.exports = mongoose.model("User", userSchema);