import { useState } from "react";

function App() {
  const [game, setGame] = useState(null);
  const [team, setTeam] = useState("HIFK");
  const [standings, setStandings] = useState(null);

async function getGames() {
  const gameResponse = await fetch(
    `http://localhost:3000/api/games?team=${team}`
  );

  const gameData = await gameResponse.json();
  const standingsResponse = await fetch(
    `http://localhost:3000/api/standings?team=${team}`
  );
  const standingsData = await standingsResponse.json();

  setGame(gameData);
  setStandings(standingsData);
}

  return (
    <div>
      <h1>HockeyHelper</h1>

<input
  value={team}
  onChange={(event) => setTeam(event.target.value)}
  placeholder="Enter team"
/>

      <button onClick={getGames}>
        Find next game
      </button>

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
  <div>
    <h2>{standings.teamName} standings</h2>

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
)}

    </div>
  );
}

export default App;