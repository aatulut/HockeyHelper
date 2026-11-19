import liigaHelperLogo from "../assets/liigahelper.png";

function Navigation({ page, setPage, logout }) {
  return (
    <header className="app-header">
      <img
        className="app-logo"
        src={liigaHelperLogo}
        alt="Liiga Helper"
        />

      <nav className="nav-links">
        <button
          className={page === "home" ? "active" : ""}
          onClick={() => setPage("home")}
        >
          Home
        </button>

        <button
          className={page === "predictions" ? "active" : ""}
          onClick={() => setPage("predictions")}
        >
          Predictions
        </button>

        <button
          className={page === "leaderboard" ? "active" : ""}
          onClick={() => setPage("leaderboard")}
        >
          Leaderboard
        </button>
      </nav>

      <button className="logout-button" onClick={logout}>
        Logout
      </button>
    </header>
  );
}

export default Navigation;