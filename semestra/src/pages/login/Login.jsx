import {Link} from "react-router-dom";
import { useEffect, useState } from "react";
import { MdOutlineVisibilityOff } from "react-icons/md";
import { MdOutlineVisibility } from "react-icons/md";
import "./login.css";

const Login = ({setIsLoggedIn}) => {
  const[values, setValues] = useState({username: "", password: ""});
  const[errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  
  
  // Syncs the local storage to the logged-in status
  useEffect(() => {
    const stored = localStorage.getItem("isLoggedIn");
    const setIsLoggedIn = stored?.toLowerCase() === "true";
  }, [setIsLoggedIn]); // Updates when 'isLoggedIn' changes


  // TODO: Send Request to backend to sign out a user

  
  // Sets user name and password to input
  const handleInput = (event) => {
    setValues(prev => ({...prev, [event.target.name]: event.target.value }));
  };


  // Handle submission with login
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // TODO : API should return our boolean
    const success = true;
    if (success) {
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      setIsLoggedIn(true);
    } else {
      setErrors({ form: "Invalid credentials" });
    }
  };

    
  return (
    <>
      <div className="auth-title"><h1 className="mt-2 text-4xl font-medium tracking-tight text-pretty text-black sm:text-3xl sm:text-balance">Log In</h1></div>
      <div className="auth-form-container">
        <form className="auth-form" action="" onSubmit={handleSubmit}>
          <span className="self-start font-bold text-left text-xl mb-1 text-stone-950">Username</span>
          <input
            type="text"
            placeholder="Username" 
            name="username"
            onChange={handleInput}
            className="auth-input"
          />
          {errors.username && <span className='text-danger'>{errors.username}</span>}

          <span className="self-start font-bold text-left text-xl mb-1 text-stone-950">Password</span>
          <div className="password-wrapper">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={handleInput}
              className="auth-input"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <MdOutlineVisibilityOff/> : <MdOutlineVisibility/>}
            </button>
          </div>
          {errors.password && <span className='text-danger'>{errors.password}</span>}

          <div className="auth-submit-container">
            <input
              type="submit"
              value="Log In"
              className="auth-submit-button"
            />
          </div>
        </form>
      </div>

      <div className="auth-redirect">
        Don't have an account yet?&emsp;
        <Link to="/register">Sign up for free</Link>
      </div>
    </>
  )
}

export default Login