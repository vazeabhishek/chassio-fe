import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Reset error message
    setError("");

    // Basic validation
    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }

    // Simulate login logic (e.g., API call)
    console.log("Logging in with", { username, password });

    // Here you would typically call your authentication service
    // Example:
    // authService.login(username, password).then(() => {
    //   // Handle successful login
    // }).catch((err) => {
    //   setError("Login failed: " + err.message);
    // });
  };

  return (
    <div className="container mt-5">
      <h1>Login</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;