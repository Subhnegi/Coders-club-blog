import "./register.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try{
    const res =await axios.post("http://localhost:5000/api/auth/register",{
      username,
      email,
      password,
    });
    res.data && window.location.replace("/login");
  }catch(err){
    setError(true);
  }
  }
  const googleclick = () => {
    window.open('http://localhost:5000/api/auth/google','_self');
  }
  

  return (
    <div className="register">
        <span className="registerTitle">Register</span>
        <form className="registerForm" onSubmit={handleSubmit}>
            <label>Username</label>
            <input type="text" name="text" className="registerInput" placeholder="Enter your username...."
              onChange={e=>setUsername(e.target.value)} />
            <label>Email</label>
            <input type="email" name="email" className="registerInput" placeholder="Enter your email...." 
              onChange={e=>setEmail(e.target.value)}
            />
            <label>Password</label>
            <input type="password" name="password" className="registerInput" placeholder="Enter your password...." 
              onChange={e=>setPassword(e.target.value)}
            />
            <button className="registerButton" type="submit">Register</button>
            <button className="registerLoginButton"><Link to="/login" className="link">Login</Link></button>
            {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
        </form>
        <p>Or</p>
        <div className="googleRegister">
          <button className="googleRegisterButton" onClick={googleclick}><i className="fa-brands fa-google"></i>  Continue with Google</button>
        </div>
    </div>
  )
}
