function Leaderboard({ leaderboard }) {
  return (
    <div className="leaderboard-card">
      <h2>TOP 10 Standings</h2>

      <div className="leaderboard-header">
        <span>Placement</span>
        <span>User</span>
        <span>Score</span>
      </div>

      {leaderboard.map((user, index) => (
        <div
  className={`leaderboard-row ${
    index === 0
            ? "first-place"
            : index === 1
            ? "second-place"
            : index === 2
            ? "third-place"
            : ""
        }`}
        key={user.username}
        >
          <span>{index + 1}</span>
          <span>{user.username}</span>
          <strong>{user.points}</strong>
        </div>
      ))}
    </div>
  );
}

export default Leaderboard;