function calculatePredictionPoints(predictedWinner, actualWinner) {
  if (predictedWinner === actualWinner) {
    return 2;
  }

  return 0;
}

module.exports = calculatePredictionPoints;