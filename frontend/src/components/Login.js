import { useState } from "react";
import API from "../services/api";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/users/login", { email, password });
      localStorage.setItem("token", res.data.token);
      onLogin();
    } catch (error) {
  const msg =
    error.response?.data?.message ||
    "Login failed";

  alert(msg + ". Please register first if you are a new user.");
}


  };
  

  return (
    <div className="login-container">
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />
        <button type="submit">Login</button>
<p style={{ marginTop: "10px" }}>
  New user?
</p>

<button
  type="button"
  className="register-btn"
  onClick={() => alert("Please register using the Register option i will impliment this in future enhancement ")}
>
  Register
</button>


      </form>
    </div>
  );
}

export default Login;
