const getNextGame = require("./games");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/api/games", async (req, res) => {
  const game = await getNextGame("games");
  res.json(game);
});

app.get("/api/standings", (req, res) => {
  res.json({ message: "Standings backend respond" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});