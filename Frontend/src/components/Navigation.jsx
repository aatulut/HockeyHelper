function Navigation({ setPage, logout }) {
  return (
    <>
      <nav>
        <button onClick={() => setPage("home")}>
          Home
        </button>

        <button onClick={() => setPage("predictions")}>
          Predictions
        </button>

        <button onClick={() => setPage("leaderboard")}>
          Leaderboard
        </button>
      </nav>

      <button onClick={logout}>
        Logout
      </button>
    </>
  );
}

export default Navigation;