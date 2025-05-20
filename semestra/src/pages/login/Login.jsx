import {Link, useNavigate, useOutletContext} from "react-router-dom";
import { useEffect, useState } from "react";
import { MdOutlineVisibilityOff } from "react-icons/md";
import { MdOutlineVisibility } from "react-icons/md";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useOutletContext(); // Get setIsLoggedIn from context
  const [values, setValues] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleInput = (e) =>
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (response.ok) {
        // Save token and user
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setIsLoggedIn(true); // Update login state
        navigate('/');
      } else {
        setErrors({ form: data.message || 'Login failed' });
      }
    } catch (err) {
      console.error('Login fetch error:', err);
      setErrors({ form: 'Network error. Please try again.' });
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
        Don't have an account yet?&nbsp;
        <Link to="/register">Sign up for free</Link>
      </div>
    </>
  )
}

export default Login
