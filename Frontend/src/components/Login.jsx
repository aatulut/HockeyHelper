import liigahelper from "../assets/liigahelper.png";

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
    <div className="auth-page">
      <div className="auth-card">
        <img
  className="auth-logo"
  src={liigahelper}
  alt="Liiga Helper"
/>
        <h2>Sign in</h2>

      <form
        className="auth-form"
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

      <p className="auth-text">No existing account?</p>

      <button
       className="secondary-button"
       onClick={() => setShowRegister(true)}
       >
        Register
      </button>

        {profileMessage && (
        <p className="error-message">{profileMessage}</p>
        )}
      </div>
    </div>
  );
}

export default Login;