const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  favoriteTeam: String,
  homeCity: String,
  passwordHash: {
  type: String,
  required: true
}
});

module.exports = mongoose.model("User", userSchema);