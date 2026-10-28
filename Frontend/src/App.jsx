import { useState } from "react";

function App() {
  const [game, setGame] = useState(null);
  const [team, setTeam] = useState("HIFK");
  const [standings, setStandings] = useState(null);
  const [username, setUsername] = useState("");
  const [favoriteTeam, setFavoriteTeam] = useState("");
  const [homeCity, setHomeCity] = useState("");
  const [profileMessage, setProfileMessage] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  async function login() {
  const response = await fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  });

  const data = await response.json();

  if (!response.ok) {
    setProfileMessage(data.message);
    return;
  }

  setCurrentUser(data);
  setProfileMessage("");
  setTeam(data.favoriteTeam);
}

 async function saveProfile() {
  const response = await fetch("http://localhost:3000/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username,
      favoriteTeam: favoriteTeam,
      homeCity: homeCity,
      password: password
    })
  });

  const data = await response.json();

  if (!response.ok) {
    setProfileMessage(data.message);
    return;
  }

  setCurrentUser(data);
  setTeam(data.favoriteTeam);

  setProfileMessage("Profile saved");

  setUsername("");
  setFavoriteTeam("");
  setHomeCity("");
  setPassword("");
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

if (!currentUser && showRegister) {
  return (
    <div>
      <h1>Create account</h1>

      <input
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="Username"
      />

      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Password"
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

      <button onClick={saveProfile}>
        Create account
      </button>

      <button onClick={() => setShowRegister(false)}>
        Back to login
      </button>

      <p>{profileMessage}</p>
    </div>
  );
}

if (!currentUser) {
  return (
    <div>
      <h1>HockeyHelper</h1>

      <input
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="Username"
      />

      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Password"
      />

      <button onClick={login}>
        Login
      </button>

      <p>No existing account?</p>

      <button onClick={() => setShowRegister(true)}>
        Register
      </button>

      <p>{profileMessage}</p>
    </div>
  );
}

  return (
    <div>
      <h1>HockeyHelper</h1>

<h2>Welcome {currentUser.username}</h2>

<p>Favorite team: {currentUser.favoriteTeam}</p>
<p>Home city: {currentUser.homeCity}</p>

<input
  value={team}
  onChange={(event) => setTeam(event.target.value)}
  placeholder="Enter team"
/>

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