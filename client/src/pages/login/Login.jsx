import { useRef , useContext} from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import axios from "axios";
import "./login.css";

export default function Login() {

  const userRef = useRef();
  const passwordRef = useRef();
  const {dispatch, isFetching} = useContext(Context);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    dispatch({type:"LOGIN_START"});
    try{
          const res = await axios.post("http://localhost:5000/api/auth/login", {
              username: userRef.current.value,
              password: passwordRef.current.value,
          })
          dispatch({type:"LOGIN_SUCCESS", payload: res.data});
    }catch(err){
      dispatch({type:"LOGIN_FAILURE"});
    }
  };
  const googleclick = async () => {
    dispatch({type:"LOGIN_START"});
    try{
          const res = await axios.post("http://localhost:5000/api/auth/google")
          dispatch({type:"LOGIN_SUCCESS", payload: res.data});
    }catch(err){
      dispatch({type:"LOGIN_FAILURE"});
    }
  };

  return (
    <div className="login">
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={handleSubmit}>
            <label>Username</label>
            <input type="text" name="username" className="loginInput" placeholder="Enter your username...." 
              ref={userRef}
            />
            <label>Password</label>
            <input type="password" name="password" className="loginInput" placeholder="Enter your password...." 
              ref={passwordRef}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
            <button className="loginRegisterButton"><Link to="/register" className="link">Register</Link></button>
        </form>
        <p>Or</p>
        <div className="googleRegister">
          <button className="googleRegisterButton" onClick={googleclick}><i className="fa-brands fa-google"></i>  Continue with Google</button>
        </div>
    </div>
  )
}
