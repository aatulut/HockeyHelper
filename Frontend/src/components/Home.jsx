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
    <>
      <p>Favorite team: {currentUser.favoriteTeam}</p>
      <p>Home city: {currentUser.homeCity}</p>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          getGames();
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
        onSubmit={(event) => {
          event.preventDefault();
          getLocalGame();
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

      {localGameMessage && <p>{localGameMessage}</p>}
      <p>{profileMessage}</p>

      {game && (
        <div>
          <h2>
            {game.homeTeam} - {game.awayTeam}
          </h2>

          <p>{game.date}</p>
          <p>{game.rink}</p>
          <p>{game.city}</p>
          <p>{game.address}</p>

          <a href={game.tickets} target="_blank">
            Tickets
          </a>
        </div>
      )}

      {standings && (
        <div
          style={{
            display: "flex",
            gap: "40px",
            justifyContent: "center"
          }}
        >
          <div>
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
            <div>
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
    </>
  );
}

export default Home;