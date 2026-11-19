import { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import Leaderboard from "./components/Leaderboard";
import Predictions from "./components/Predictions";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";

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
  const [page, setPage] = useState(
  localStorage.getItem("page") || "home"
);
  const [upcomingGames, setUpcomingGames] = useState([]);
  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [confirmedPredictions, setConfirmedPredictions] = useState({});
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const favoriteTeam = currentUser.favoriteTeam || "HIFK";

      setTeam(favoriteTeam);
      getGames(favoriteTeam);
    }
  }, [currentUser]);

  useEffect(() => {
  localStorage.setItem("page", page);
}, [page]);

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
  setPage("home");
  localStorage.setItem("page", "home");
}

 async function saveProfile() {
  const response = await fetch("http://localhost:3000/api/users", {
    method: "POST",
    credentials: "include",
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

  setProfileMessage("");

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
  setPage("home");
  localStorage.setItem("page", "home");
}

async function getUpcomingGames() {
  const response = await fetch(
    "http://localhost:3000/api/games/upcoming",
    {
      credentials: "include"
    }
  );

  const data = await response.json();

  setUpcomingGames(data);
}

useEffect(() => {
  if (!currentUser) {
    return;
  }

  if (page === "predictions") {
    getUpcomingGames();
    getUserPredictions();
  }

  if (page === "leaderboard") {
    getLeaderboard();
  }
}, [page, currentUser]);

async function submitPrediction(game) {
  const response = await fetch(
    "http://localhost:3000/api/predictions",
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        gameId: game.gameId,
        homeTeam: game.homeTeam,
        awayTeam: game.awayTeam,
        predictedWinner: selectedPrediction.predictedWinner,
        gameStart: game.gameStart
      })
    }
  );

  const data = await response.json();

  console.log(data);

  if (!response.ok) {
  console.log(data);
  return;
}

setConfirmedPredictions((previous) => ({
  ...previous,
  [game.gameId]: data
}));

setSelectedPrediction(null);

}

async function getUserPredictions() {
  const response = await fetch(
    "http://localhost:3000/api/predictions",
    {
      credentials: "include"
    }
  );

  if (!response.ok) {
    return;
  }

  const data = await response.json();

  const predictionsByGame = {};

  data.forEach((prediction) => {
    predictionsByGame[prediction.gameId] = prediction;
  });

  setConfirmedPredictions(predictionsByGame);
}

async function getLeaderboard() {
  const response = await fetch(
    "http://localhost:3000/api/leaderboard",
    {
      credentials: "include"
    }
  );

  if (!response.ok) {
    return;
  }

  const data = await response.json();

  setLeaderboard(data);
}

{/*Register*/}
if (!currentUser && showRegister) {
  return (
    <Register
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      favoriteTeam={favoriteTeam}
      setFavoriteTeam={setFavoriteTeam}
      homeCity={homeCity}
      setHomeCity={setHomeCity}
      saveProfile={saveProfile}
      setShowRegister={setShowRegister}
      profileMessage={profileMessage}
    />
  );
}

{/*login*/}
if (!currentUser) {
  return (
    <Login
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      login={login}
      setShowRegister={setShowRegister}
      profileMessage={profileMessage}
    />
  );
}

{/*logged in user*/}
  return (
  <div className="app">

  <Navigation
    page={page}
    setPage={setPage}
    logout={logout}
  />


    {/*homepage*/}
  {page === "home" && (
     <Home
    currentUser={currentUser}
    team={team}
    setTeam={setTeam}
    city={city}
    setCity={setCity}
    getGames={getGames}
    getLocalGame={getLocalGame}
    searchMessage={searchMessage}
    localGameMessage={localGameMessage}
    profileMessage={profileMessage}
    game={game}
    standings={standings}
    opponentStandings={opponentStandings}
  />
)}

    {/*prediction page*/}
  {page === "predictions" && (
        <Predictions
    upcomingGames={upcomingGames}
    confirmedPredictions={confirmedPredictions}
    selectedPrediction={selectedPrediction}
    setSelectedPrediction={setSelectedPrediction}
    submitPrediction={submitPrediction}
  />
)}

    {/*leaderboard page*/}
{page === "leaderboard" && (
  <Leaderboard leaderboard={leaderboard} />
)}
  </div>
);
}

export default App;