import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useState } from "react";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";

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
        <div className="w-full max-w-md mx-auto mb-8">
            <h1 className="text-4xl font-bold text-[#EF601E] text-center mb-8">
                Sign Up
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
                            onChange={handleInput}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Enter your username"
                        />
                        {errors.username && (
                            <p className="text-red-500 text-sm">{errors.username}</p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleInput}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="you@example.com"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email}</p>
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

                    {/* Confirm Password Field */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirm ? "text" : "password"}
                                name="confirmPassword"
                                onChange={handleInput}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="Confirm your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                aria-label={showConfirm ? "Hide password" : "Show password"}
                            >
                                {showConfirm ? <MdOutlineVisibilityOff size={20}/> : <MdOutlineVisibility size={20}/>}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
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
                        Sign Up
                    </button>
                </form>

                {/* Login Link */}
                <p className="mt-4 text-center text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-purple-500 hover:text-purple-700 font-semibold">
                        Log in here
                    </Link>
                </p>
            </div>
        </div>
    );
};
  
export default Register;
