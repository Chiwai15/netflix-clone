import React, {useState, useEffect} from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import {login, signup} from '../../utils/firebase'
import netflix_spinner from '../../assets/netflix_spinner.gif'
import {useNavigate} from 'react-router-dom'
import {toast } from 'react-toastify';

const Login = () => {

  const [signState, setSignState] = useState("Sign In")
  const [slide, setSlide] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const user_auth = async (event) => {
    event.preventDefault();
    if(signState==="Sign In"){
      if (!email || !password) {
        toast.warning("Please enter both Email and Password.");
        return;
      }
      await login(email, password);
    }else{
      if (!email || !password || !name) {
        toast.warning("All fields are required.");
        return;
      }
      setLoading(true);
      await signup(name, email, password);
    }
    setLoading(false);
  }

  useEffect(() => {
    setSlide(true);
    const timer = setTimeout(() => setSlide(false), 500); // Match the CSS transition duration
    return () => clearTimeout(timer);
  }, [signState]);

  return (
    loading?<div className="login-spinner">
      <img src={netflix_spinner} alt="" />
    </div>:
    <div className='login'>
      <img src={logo} className='login-logo' alt="" onClick={() => {navigate('/')}}/>
      <div className={`login-form`}>
        <div className={`anime-wrapper ${slide ? "slide-in" : ""}`}>
        <h1>{signState}</h1>
        <form className={`auth-form ${slide ? "slide-in" : ""}`}>
                {signState === "Sign Up" && (
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Your name"
                    />
                )}
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                />
                <button onClick={user_auth} type="submit">
                    {signState === "Sign Up" ? "Sign Up" : "Sign In"}
                </button>
                <div className="form-help">
                    <div className="remember">
                        <input type="checkbox" />
                        <label>Remember Me</label>
                    </div>
                    <p>Need Help?</p>
                </div>
                <div className={`form-switch ${signState === "Sign In" ? "slide-out" : "slide-out"}`}>
                {signState === "Sign In" ? (
                    <p>
                        New to Netflix?{" "}
                        <span onClick={() => setSignState("Sign Up")}>Sign Up Now</span>
                    </p>
                ) : (
                    <p>
                        Already have an account?{" "}
                        <span onClick={() => setSignState("Sign In")}>Sign In Now</span>
                    </p>
                )}
            </div>
            </form>
            </div>
      </div>
    </div>
  )
}

export default Login
