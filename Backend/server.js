const getStandings = require("./standings");
const getNextGame = require("./games");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const PORT = 3000;
const User = require("./models/Users");
const bcrypt = require("bcrypt");

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

  const passwordHash = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    username: req.body.username,
    favoriteTeam: req.body.favoriteTeam,
    homeCity: req.body.homeCity,
    passwordHash: passwordHash
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

app.post("/api/login", async (req, res) => {
  const username = req.body.username.trim().toLowerCase();
  const password = req.body.password;

  const user = await User.findOne({ username });

  if (!user || !user.passwordHash) {
    return res.status(401).json({
      message: "Invalid username or password"
    });
  }

  const passwordMatches = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!passwordMatches) {
    return res.status(401).json({
      message: "Invalid username or password"
    });
  }

  res.json({
    username: user.username,
    favoriteTeam: user.favoriteTeam,
    homeCity: user.homeCity
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});