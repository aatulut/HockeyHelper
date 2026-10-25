const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/api/games", (req, res) => {
  res.json({ message: "Games backend respond" });
});

app.get("/api/standings", (req, res) => {
  res.json({ message: "Standings backend respond" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});