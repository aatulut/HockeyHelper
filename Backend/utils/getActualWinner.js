function getActualWinner(game) {
  if (!game.ended) {
    return null;
  }

  if (game.homeTeam.goals > game.awayTeam.goals) {
    return game.homeTeam.teamName;
  }

  if (game.awayTeam.goals > game.homeTeam.goals) {
    return game.awayTeam.teamName;
  }

  return null;
}

module.exports = getActualWinner;