function Predictions({
  upcomingGames,
  confirmedPredictions,
  selectedPrediction,
  setSelectedPrediction,
  submitPrediction
}) {
  return (
    <div>
      <h2>Predictions</h2>

      {upcomingGames.length === 0 ? (
        <p>No upcoming games this week.</p>
      ) : (
        upcomingGames.map((game) => (
          <div key={game.gameId}>
            <h3>
              {game.homeTeam} - {game.awayTeam}
            </h3>

            <p>
              {new Date(game.gameStart).toLocaleString("fi-FI", {
                timeZone: "Europe/Helsinki"
              })}
            </p>

            <p>{game.rink}</p>
            <p>{game.city}</p>

            {confirmedPredictions[game.gameId] ? (
              <div>
                <p>
                  You predicted{" "}
                  {confirmedPredictions[game.gameId].predictedWinner}
                </p>

                {confirmedPredictions[game.gameId].settled && (
                  <>
                    <p>
                      Winner:{" "}
                      {confirmedPredictions[game.gameId].actualWinner}
                    </p>

                    <p>
                      Points:{" "}
                      {confirmedPredictions[game.gameId].points}
                    </p>
                  </>
                )}
              </div>
            ) : (
              <>
                <div>
                  <button
                    onClick={() =>
                      setSelectedPrediction({
                        gameId: game.gameId,
                        predictedWinner: game.homeTeam
                      })
                    }
                  >
                    {game.homeTeam}
                  </button>

                  <button
                    onClick={() =>
                      setSelectedPrediction({
                        gameId: game.gameId,
                        predictedWinner: game.awayTeam
                      })
                    }
                  >
                    {game.awayTeam}
                  </button>
                </div>

                {selectedPrediction?.gameId === game.gameId && (
                  <div>
                    <p>
                      You picked {selectedPrediction.predictedWinner}
                    </p>

                    <p>Are you sure?</p>

                    <button onClick={() => submitPrediction(game)}>
                      Confirm
                    </button>

                    <button
                      onClick={() => setSelectedPrediction(null)}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Predictions;