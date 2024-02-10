import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import "./App.css";

function CreateUser() {
  const [formData, setFormData] = useState({username: "", password: "", email: "",});
  const [error, setError] = useState<string>("");

  const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({...prevFormData, [name]: value,
    }));
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (!formData.username || !formData.password || !formData.email) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("/api/register", formData);
      console.log(response.data); 
      window.location.href = "/login";
    } catch (error: any) {
      console.log(error);
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError("Server error. Please try again later.");
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="login-container">
          <div className="login-box">
            <header className="login-header">Sign Up</header>
            <div className="input-container">
              <label htmlFor="username">Username</label>
              <input value={formData.username} onChange={handleInputChange} required autoComplete="off" type="text" placeholder="Username" name="username"/>
            </div>
            <div className="input-container">
              <label htmlFor="password">Password</label>
              <input value={formData.password} onChange={handleInputChange} required autoComplete="off" type="password" placeholder="Password" name="password" />
            </div>
            <div className="input-container">
              <label htmlFor="email">Email</label>
              <input value={formData.email} onChange={handleInputChange} required autoComplete="off" type="email" placeholder="Email" name="email" />
            </div>
            <button className="login-button" onClick={handleSubmit}>Sign Up</button>
            <div className="login-below-button">
              {error && <div className="error-msg">&#x26A0; &nbsp;{error}</div> }
              <p>Already have an account? <Link to="/login"><b>Log In</b></Link></p>
            </div>
          </div>
        </div>
        <Footer/>
    </div>
    );
}
  
export default CreateUser;