const getStandings = require("./standings");
const getNextGame = require("./games");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

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

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});