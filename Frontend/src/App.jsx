import { useState } from "react";

function App() {
  const [game, setGame] = useState(null);
  const [team, setTeam] = useState("HIFK");
  const [standings, setStandings] = useState(null);
  const [username, setUsername] = useState("");
  const [favoriteTeam, setFavoriteTeam] = useState("");
  const [homeCity, setHomeCity] = useState("");
  const [profileMessage, setProfileMessage] = useState("");

 async function saveProfile() {
  const response = await fetch("http://localhost:3000/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username,
      favoriteTeam: favoriteTeam,
      homeCity: homeCity
    })
  });

  const data = await response.json();

  if (!response.ok) {
    setProfileMessage(data.message);
    return;
  }

  setProfileMessage("Profile saved");

  setUsername("");
  setFavoriteTeam("");
  setHomeCity("");
}

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
  value={username}
  onChange={(event) => setUsername(event.target.value)}
  placeholder="Username"
/>

<input
  value={favoriteTeam}
  onChange={(event) => setFavoriteTeam(event.target.value)}
  placeholder="Favorite team"
/>

<input
  value={homeCity}
  onChange={(event) => setHomeCity(event.target.value)}
  placeholder="Home city"
/>

<input
  value={team}
  onChange={(event) => setTeam(event.target.value)}
  placeholder="Enter team"
/>

      <button onClick={saveProfile}>
        Save profile
      </button>

<p>{profileMessage}</p>

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