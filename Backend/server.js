const getStandings = require("./standings");
const {
  getNextGame,
  getNextLocalGame,
  getUpcomingGames
} = require("./games");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const PORT = 3000;
const User = require("./models/Users");
const bcrypt = require("bcrypt");
const session = require("express-session");
const { default: MongoStore } = require("connect-mongo");
const Prediction = require("./models/Prediction");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI
    }),
    cookie: {
      httpOnly: true
    }
  })
);

app.get("/api/games", async (req, res) => {
  const team = req.query.team || "hifk";

  const game = await getNextGame(team);

  res.json(game);
});

app.get("/api/games/local", async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({
      message: "City is required"
    });
  }

  const game = await getNextLocalGame(city);

  res.json(game);
});

app.get("/api/standings", async (req, res) => {
  const team = req.query.team || "HIFK";

  const standings = await getStandings(team);

  res.json(standings);
});

app.get("/api/games/upcoming", async (req, res) => {
  try {
    const games = await getUpcomingGames();
    res.json(games);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch upcoming games"
    });
  }
});

app.post("/api/predictions", async (req, res) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Not authenticated"
      });
    }

    const prediction = new Prediction({
      userId,
      gameId: req.body.gameId,
      homeTeam: req.body.homeTeam,
      awayTeam: req.body.awayTeam,
      predictedWinner: req.body.predictedWinner,
      gameStart: req.body.gameStart
    });

    const savedPrediction = await prediction.save();

    res.status(201).json(savedPrediction);
  } catch (error) {
  if (error.code === 11000) {
    return res.status(409).json({
      message: "You have already set a prediction to this game"
    });
  }

  res.status(400).json({
    message: error.message
  });
}
});

app.post("/api/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({
        message: "Logout failed"
      });
    }

    res.clearCookie("connect.sid");
    res.json({
      message: "Logged out"
    });
  });
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

  res.status(201).json({
  username: savedUser.username,
  favoriteTeam: savedUser.favoriteTeam,
  homeCity: savedUser.homeCity
});
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

  req.session.userId = user._id;

  res.json({
    username: user.username,
    favoriteTeam: user.favoriteTeam,
    homeCity: user.homeCity
  });
});

app.get("/api/me", async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({
      message: "Not authenticated"
    });
  }

  const user = await User.findById(req.session.userId);

  if (!user) {
    return res.status(404).json({
      message: "User not found"
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