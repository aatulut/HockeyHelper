const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  gameId: {
    type: Number,
    required: true
  },

  homeTeam: {
    type: String,
    required: true
  },

  awayTeam: {
    type: String,
    required: true
  },

  predictedWinner: {
    type: String,
    required: true
  },

  gameStart: {
    type: Date,
    required: true
  },

  settled: {
    type: Boolean,
    default: false
  },

  points: {
    type: Number,
    default: 0
  }
});

predictionSchema.index(
  { userId: 1, gameId: 1 },
  { unique: true }
);

module.exports = mongoose.model("Prediction", predictionSchema);