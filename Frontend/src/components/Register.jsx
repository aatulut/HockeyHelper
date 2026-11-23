import liigahelper from "../assets/liigahelper.png";

function Register({
  username,
  setUsername,
  password,
  setPassword,
  favoriteTeam,
  setFavoriteTeam,
  homeCity,
  setHomeCity,
  saveProfile,
  setShowRegister,
  profileMessage
}) {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <img
          className="auth-logo"
          src={liigahelper}
          alt="Liiga Helper"
        />

        <h2>Create account</h2>

        <form
          className="auth-form"
          onSubmit={(event) => {
            event.preventDefault();
            saveProfile();
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

          <button type="submit">
            Create account
          </button>
        </form>

        <p className="auth-text">Already have an account?</p>

        <button
          className="secondary-button"
          onClick={() => setShowRegister(false)}
        >
          Back to login
        </button>

        {profileMessage && (
          <p className="auth-message">{profileMessage}</p>
        )}
      </div>
    </div>
  );
}

export default Register;