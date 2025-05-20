import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useState } from "react";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import "../login/login.css"; 

const Register = () => {
    const { setIsLoggedIn } = useOutletContext();
    const navigate = useNavigate();
    const [values, setValues] = useState({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
  
    const handleInput = (e) =>
      setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      // Basic client-side validation
      const newErrors = {};
      if (!values.username) newErrors.username = "Username is required.";
      if (!values.email) newErrors.email = "Email is required.";
      if (!values.password) newErrors.password = "Password is required.";
      if (values.password !== values.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match.";
      setErrors(newErrors);
      if (Object.keys(newErrors).length) return;
  
      try {
        const response = await fetch('http://localhost:3000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: values.username,
            email: values.email,
            password: values.password,
          }),
        });
  
        const data = await response.json();
        
        if (response.ok) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          setIsLoggedIn(true);
          navigate('/'); // Redirect to home page
        } else {
          setErrors({ form: data.message || 'Registration failed' });
        }
      } catch (error) {
        console.error('Registration error:', error);
        setErrors({ form: 'Network error. Please try again.' });
      }
    };
  
    return (
      <>
        <div className="auth-title">
          <h1 className="mt-2 text-4xl font-medium tracking-tight text-pretty text-black sm:text-3xl sm:text-balance">
            Register
          </h1>
        </div>
  
        <div className="auth-form-container">
          <form className="auth-form" onSubmit={handleSubmit}>
            {/* Username */}
            <span className="self-start font-bold text-left text-xl mb-1 text-stone-950">
              Username
            </span>
            <input
              name="username"
              placeholder="Username"
              onChange={handleInput}
              className="auth-input"
            />
            {errors.username && (
              <span className="text-danger">{errors.username}</span>
            )}
  
            {/* Email */}
            <span className="self-start font-bold text-left text-xl mb-1 text-stone-950">
              Email
            </span>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              onChange={handleInput}
              className="auth-input"
            />
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
  
            {/* Password */}
            <span className="self-start font-bold text-left text-xl mb-1 text-stone-950">
              Password
            </span>
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
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}
              </button>
            </div>
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
  
            {/* Confirm Password */}
            <span className="self-start font-bold text-left text-xl mb-1 text-stone-950">
              Confirm Password
            </span>
            <div className="password-wrapper">
              <input
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                onChange={handleInput}
                className="auth-input"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirm((v) => !v)}
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="text-danger">{errors.confirmPassword}</span>
            )}
  
            {/* Form-level error */}
            {errors.form && <div className="text-danger mt-2">{errors.form}</div>}
  
            {/* Submit */}
            <div className="auth-submit-container">
              <input
                type="submit"
                value="Register"
                className="auth-submit-button"
              />
            </div>
          </form>
        </div>
  
        <div className="auth-redirect">
          Already have an account?&nbsp;
          <Link to="/login">Log in here</Link>
        </div>
      </>
    );
  };
  
  export default Register;
