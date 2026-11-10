import { useState, useEffect } from "react";

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
  const [searchMessage, setSearchMessage] = useState("");
  const [city, setCity] = useState("");
  const [localGameMessage, setLocalGameMessage] = useState("");
  const [opponentStandings, setOpponentStandings] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const favoriteTeam = currentUser.favoriteTeam || "HIFK";

      setTeam(favoriteTeam);
      getGames(favoriteTeam);
    }
  }, [currentUser]);

  useEffect(() => {
  async function checkSession() {
    const response = await fetch("http://localhost:3000/api/me", {
      credentials: "include"
    });

    if (!response.ok) {
      return;
    }

    const data = await response.json();

    setCurrentUser(data);
    setTeam(data.favoriteTeam || "HIFK");
    setCity(data.homeCity || "");
  }

  checkSession();
}, []);

  async function login() {
  const response = await fetch("http://localhost:3000/api/login", {
    method: "POST",
    credentials: "include",
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
  setCity(data.homeCity || "");
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

async function getLocalGame() {
  const response = await fetch(
    `http://localhost:3000/api/games/local?city=${city}`
  );

  const data = await response.json();
  if (data.message) {
  setLocalGameMessage(data.message);
  setGame(null);
  setStandings(null);
  setOpponentStandings(null);
  return;
}
  setLocalGameMessage("");
  setGame(data);
  setStandings(null);
  setOpponentStandings(null);
}

  async function getGames(selectedTeam = team) {
  const [gameResponse, standingsResponse] = await Promise.all([
    fetch(`http://localhost:3000/api/games?team=${selectedTeam}`),
    fetch(`http://localhost:3000/api/standings?team=${selectedTeam}`)
  ]);

  const [gameData, standingsData] = await Promise.all([
    gameResponse.json(),
    standingsResponse.json()
  ]);

      if (standingsData.message) {
    setSearchMessage("Team not found");
    setGame(null);
    setStandings(null);
    return;
  }

  const opponentTeam =
  gameData.homeTeam === standingsData.teamName
    ? gameData.awayTeam
    : gameData.homeTeam;

    const opponentResponse = await fetch(
  `http://localhost:3000/api/standings?team=${opponentTeam}`
);

    const opponentData = await opponentResponse.json();

    setSearchMessage("");
    setGame(gameData);
    setStandings(standingsData);
    setGame(gameData);
    setStandings(standingsData);
    setOpponentStandings(opponentData);
  }


async function logout() {
  await fetch("http://localhost:3000/api/logout", {
    method: "POST",
    credentials: "include"
  });

  setCurrentUser(null);
  setGame(null);
  setStandings(null);
  setOpponentStandings(null);
  setTeam("");
  setCity("");
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

  <form
    onSubmit={(event) => {
      event.preventDefault();
      login();
    }}
  >
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

    <button type="submit">
      Login
    </button>
  </form>

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
<button onClick={logout}>
  Logout
</button>

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

      <button onClick={() => getGames()}>
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
  <div style={{ display: "flex", gap: "40px", justifyContent: "center" }}>
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

    </div>
  );
}

export default App;