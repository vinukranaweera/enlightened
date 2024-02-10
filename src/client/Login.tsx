import { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function handleLogin() {
    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }
    
    try {
      const response = await axios.post("/api/login", {username,password,});
      console.log(response.data);
      setIsLoggedIn(true);
      setError("");
    } catch (err) {
      console.error(err);
      setIsLoggedIn(false);
      setError("Invalid username or password");
    }
  }

  if (isLoggedIn) {
    const userInfo = {"logged_in": true, "username": username}
    sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
    window.location.href = "/";
  } else {
    const userInfo = {"logged_in": false,}
    sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
  }

  return (
    <div className="login-container">
      <Header/>
      <div className="login-box">
        <header className="login-header">Login</header>
        <div className="input-container">
          <label htmlFor="username">Username</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" id="username"/>
        </div>
        <div className="input-container">
          <label htmlFor="password">Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" id="password" />
        </div>
        <button className="login-button" onClick={handleLogin}>Login</button>
        <div className="login-below-button">
          {error && <div className="error-msg">&#x26A0; &nbsp;{error}</div> }
          <p>Don't have an account? <Link to="/createuser"><b>Create one</b></Link></p>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Login;