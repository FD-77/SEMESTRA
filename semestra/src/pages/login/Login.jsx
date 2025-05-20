import {Link, useNavigate, useOutletContext} from "react-router-dom";
import { useEffect, useState } from "react";
import { MdOutlineVisibilityOff } from "react-icons/md";
import { MdOutlineVisibility } from "react-icons/md";

const Login = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useOutletContext();
  const [values, setValues] = useState({ 
    username: '', 
    password: '' 
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
    <div className="w-full max-w-md mx-auto mb-8">
        <h1 className="text-4xl font-bold text-[#EF601E] text-center mb-8">
            Log In
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Username Field */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        value={values.username}
                        onChange={handleInput}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter your username"
                    />
                    {errors.username && (
                        <p className="text-red-500 text-sm">{errors.username}</p>
                    )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={values.password}
                            onChange={handleInput}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Enter your password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <MdOutlineVisibilityOff size={20}/> : <MdOutlineVisibility size={20}/>}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password}</p>
                    )}
                </div>

                {/* Error Message */}
                {errors.form && (
                    <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
                        {errors.form}
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors duration-200"
                >
                    Log In
                </button>
            </form>

            {/* Sign Up Link */}
            <p className="mt-4 text-center text-gray-600">
                Don't have an account yet?{" "}
                <Link to="/register" className="text-purple-500 hover:text-purple-700 font-semibold">
                    Sign up for free
                </Link>
            </p>
        </div>
    </div>
  );
};

export default Login;
