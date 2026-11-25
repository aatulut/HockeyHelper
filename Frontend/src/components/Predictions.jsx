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
        <div className="predictions-grid">
          {upcomingGames.map((game) => {
            const gameStarted =
              new Date() >= new Date(game.gameStart);

            return (
              <div
                className="prediction-card"
                key={game.gameId}
              >
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
                  <div className="confirmed-prediction">
                    <span>Prediction confirmed</span>

                    <strong>
                      {confirmedPredictions[game.gameId].predictedWinner}
                    </strong>

                    {confirmedPredictions[game.gameId].settled && (
                      <div className="prediction-result">
                        <div>
                          <span>Winner</span>
                          <strong>
                            {confirmedPredictions[game.gameId].actualWinner}
                          </strong>
                        </div>

                        <div>
                          <span>Points</span>
                          <strong>
                            {confirmedPredictions[game.gameId].points}
                          </strong>
                        </div>
                      </div>
                    )}
                  </div>
                ) : gameStarted ? (
                  <div className="prediction-closed">
                    <strong>Prediction closed</strong>
                    <span>No prediction</span>
                  </div>
                ) : (
                  <>
                    <div className="prediction-buttons">
                      <button
                        className={
                          selectedPrediction?.gameId === game.gameId &&
                          selectedPrediction?.predictedWinner === game.homeTeam
                            ? "selected"
                            : ""
                        }
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
                        className={
                          selectedPrediction?.gameId === game.gameId &&
                          selectedPrediction?.predictedWinner === game.awayTeam
                            ? "selected"
                            : ""
                        }
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
                      <div className="prediction-confirmation">
                        <p>
                          You picked {selectedPrediction.predictedWinner}
                        </p>

                        <p>Are you sure?</p>

                        <div className="confirmation-buttons">
                          <button onClick={() => submitPrediction(game)}>
                            Confirm
                          </button>

                          <button
                            onClick={() => setSelectedPrediction(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Predictions;