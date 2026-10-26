import { useState } from "react";

function App() {
  const [game, setGame] = useState(null);

async function getGames() {
  const response = await fetch("http://localhost:3000/api/games");
  const data = await response.json();

  setGame(data);
}

  async function getStandings() {
    const response = await fetch("http://localhost:3000/api/standings");
    const data = await response.json();

    setMessage(data.message);
  }

  return (
    <div>
      <h1>HockeyHelper</h1>

      <button onClick={getGames}>
        Games
      </button>

      <button onClick={getStandings}>
        Standings
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
    </div>
  );
}

export default App;