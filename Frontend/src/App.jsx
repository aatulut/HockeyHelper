import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  async function getGames() {
    const response = await fetch("http://localhost:3000/api/games");
    const data = await response.json();

    setMessage(data.message);
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

      <p>{message}</p>
    </div>
  );
}

export default App;