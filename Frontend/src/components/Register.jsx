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

export default Register;