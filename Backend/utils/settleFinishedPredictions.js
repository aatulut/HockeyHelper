const Prediction = require("../models/Prediction");
const settlePrediction = require("./settlePrediction");

async function settleFinishedPredictions() {
  const response = await fetch(
    "https://liiga.fi/api/v2/games?season=2027&tournament=runkosarja"
  );

  const games = await response.json();

  const unsettledPredictions = await Prediction.find({
    settled: false
  });

  let settledCount = 0;

  for (const prediction of unsettledPredictions) {
    const game = games.find(
      (game) => game.id === prediction.gameId
    );

    if (!game) {
      continue;
    }

    if (!game.ended) {
      continue;
    }

    await settlePrediction(prediction, game);

    settledCount++;
  }

  return {
    checked: unsettledPredictions.length,
    settled: settledCount
  };
}

module.exports = settleFinishedPredictions;