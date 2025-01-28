// LoginForm.jsx
import { useState } from "react";

const LoginForm = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para manejar el login
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="username"
        placeholder="username"
        value={username}
        onChange={(e) => setusername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;