const calculatePredictionPoints = require("./calculatePredictionPoints");
const getActualWinner = require("./getActualWinner");

async function settlePrediction(prediction, game) {
  const actualWinner = getActualWinner(game);

  if (!actualWinner) {
    return prediction;
  }

  const points = calculatePredictionPoints(
    prediction.predictedWinner,
    actualWinner
  );

  prediction.actualWinner = actualWinner;
  prediction.points = points;
  prediction.settled = true;

  await prediction.save();

  return prediction;
}

module.exports = settlePrediction;