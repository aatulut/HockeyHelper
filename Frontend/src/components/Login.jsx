function Login({
  username,
  setUsername,
  password,
  setPassword,
  login,
  setShowRegister,
  profileMessage
}) {
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

export default Login;