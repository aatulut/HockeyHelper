const getStandings = require("./standings");
const getNextGame = require("./games");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const PORT = 3000;
const User = require("./models/Users");

app.use(cors());
app.use(express.json());

app.get("/api/games", async (req, res) => {
  const team = req.query.team || "hifk";

  const game = await getNextGame(team);

  res.json(game);
});

app.get("/api/standings", async (req, res) => {
  const team = req.query.team || "HIFK";

  const standings = await getStandings(team);

  res.json(standings);
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error.message);
  });

app.post("/api/users", async (req, res) => {
  const existingUser = await User.findOne({
    username: req.body.username
  });

  if (existingUser) {
    return res.status(409).json({
      message: "Username already exists"
    });
  }

  const user = new User({
    username: req.body.username,
    favoriteTeam: req.body.favoriteTeam,
    homeCity: req.body.homeCity
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
});

app.get("/api/users/:username", async (req, res) => {
  const user = await User.findOne({
    username: req.params.username
  });

  res.json(user);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});