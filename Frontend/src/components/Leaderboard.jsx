function Leaderboard({ leaderboard }) {
  return (
    <div>
      <h2>TOP 10 Standings</h2>

      {leaderboard.length === 0 ? (
        <p>No scores yet.</p>
      ) : (
        leaderboard.map((player, index) => (
          <div key={player.username}>
            <p>
              {index + 1}. {player.username} - {player.points} pts
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Leaderboard;