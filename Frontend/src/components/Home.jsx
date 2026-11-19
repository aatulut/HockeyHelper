function Home({
  currentUser,
  team,
  setTeam,
  city,
  setCity,
  getGames,
  getLocalGame,
  searchMessage,
  localGameMessage,
  profileMessage,
  game,
  standings,
  opponentStandings
}) {
  return (
    <div className="home">

        <div className="profile-summary">
        <div>
            <span>Username</span>
            <strong>{currentUser.username}</strong>
        </div>

        <div>
            <span>Favorite team</span>
            <strong>{currentUser.favoriteTeam}</strong>
        </div>

        <div>
            <span>Home city</span>
            <strong>{currentUser.homeCity}</strong>
        </div>
        </div>

<div className="search-section">

      <form
        className="search-row"
        onSubmit={(event) => {
          event.preventDefault();
          getGames();
          setCity("");
        }}
      >
        <input
          value={team}
          onChange={(event) => setTeam(event.target.value)}
          placeholder="Enter team"
        />

        <button type="submit">
          Find next game
        </button>
      </form>

      {searchMessage && <p>{searchMessage}</p>}

      <form
        className="search-row"
        onSubmit={(event) => {
          event.preventDefault();
          getLocalGame();
          setTeam("");
        }}
      >
        <input
          value={city}
          onChange={(event) => setCity(event.target.value)}
          placeholder="Search city"
        />

        <button type="submit">
          Find local game
        </button>
      </form>
      </div>

      {localGameMessage && <p>{localGameMessage}</p>}
      <p>{profileMessage}</p>

      {game && (
       <div className="game-card">
    <p className="card-label">Next game</p>

          <h2 className="game-teams">
            {game.homeTeam} - {game.awayTeam}
          </h2>

        <div className="game-details">
          <p>{game.date}</p>
          <p>{game.rink}</p>
          <p>{game.city}</p>
          <p>{game.address}</p>
        </div>

         <a
        className="ticket-button"
        href={game.tickets}
        target="_blank"
        rel="noreferrer"
        >
            Tickets
          </a>
        </div>
      )}

      {standings && (
        <div className="standings-grid">
          <div className="standings-card">
            <h2>{standings.teamName}</h2>
            <p>Ranking: {standings.ranking}</p>
            <p>Games: {standings.games}</p>
            <p>Wins: {standings.wins}</p>
            <p>Overtime wins: {standings.overtimeWins}</p>
            <p>Losses: {standings.losses}</p>
            <p>Ties: {standings.ties}</p>
            <p>Points: {standings.points}</p>
            <p>Goals: {standings.goals}</p>
            <p>Goals against: {standings.goalsAgainst}</p>
          </div>

          {opponentStandings && (
            <div className="standings-card">
              <h2>{opponentStandings.teamName}</h2>
              <p>Ranking: {opponentStandings.ranking}</p>
              <p>Games: {opponentStandings.games}</p>
              <p>Wins: {opponentStandings.wins}</p>
              <p>Overtime wins: {opponentStandings.overtimeWins}</p>
              <p>Losses: {opponentStandings.losses}</p>
              <p>Ties: {opponentStandings.ties}</p>
              <p>Points: {opponentStandings.points}</p>
              <p>Goals: {opponentStandings.goals}</p>
              <p>Goals against: {opponentStandings.goalsAgainst}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;