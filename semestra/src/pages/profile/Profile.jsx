import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate, useOutletContext } from 'react-router-dom'; // Add useOutletContext

const Profile = () => {
    const navigate = useNavigate();
    const { setIsLoggedIn } = useOutletContext(); // Add this line

    // Initial data of user profile
    const [profile, setProfile] = useState({
        username: "",
        school: "",
        gpa: "",
        major: "",
        email: "",
        phone: "",
    });

    // Edit mode switch
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState("");
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // Fetch user profile on component mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/profile`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setProfile({
                        username: data.username || "",
                        school: data.school || "",
                        gpa: data.gpa || "",
                        major: data.major || "",
                        email: data.email || "",
                        phone: data.phone || "",
                    });
                } else {
                    setError("Failed to load profile");
                }
            } catch (err) {
                setError("Error loading profile");
                console.error(err);
            }
        };

        fetchProfile();
    }, []);

    // Handle input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Save user information
    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(profile)
            });

            if (response.ok) {
                setIsEditing(false);
                setError("");
            } else {
                const data = await response.json();
                setError(data.message || "Failed to update profile");
            }
        } catch (err) {
            setError("Error updating profile");
            console.error(err);
        }
    };

    // Delete user account
    const handleDeleteAccount = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/profile`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                // Clear local storage
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                // Update logged in state
                setIsLoggedIn(false);
                // Redirect to login page instead of register
                navigate('/login');
            } else {
                const data = await response.json();
                setError(data.message || "Failed to delete account");
            }
        } catch (err) {
            setError("Error deleting account");
            console.error(err);
        }
    };

    return (
        <main>
            <div className="max-w-3xl mx-auto my-10 ">
                <h1 className="text-5xl pb-10">Profile</h1>

                <div className="flex flex-col items-center bg-amber-100 py-10 rounded-3xl shadow-lg">
                    <FaUserCircle className="size-40 text-purple-300 mb-10" />

                    {error && (
                        <div className="text-red-500 mb-4">{error}</div>
                    )}

                    <form className="space-y-6 w-4/5 text-xl">
                        {[
                            { label: "Username", name: "username", type: "text" },
                            { label: "School", name: "school", type: "text" },
                            { 
                                label: "GPA", 
                                name: "gpa", 
                                type: "number", 
                                step: "0.01", 
                                min: "0", 
                                max: "4.0",
                                readOnly: true,
                                disabled: true
                            },
                            { label: "Major", name: "major", type: "text" },
                            { label: "Email", name: "email", type: "email" },
                            { label: "Phone", name: "phone", type: "tel" },
                        ].map((field) => (
                            <div key={field.name} className="flex items-center">
                                <label className="flex-2 text-right pr-3 font-semibold">
                                    {field.label}:
                                </label>
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={profile[field.name]}
                                    onChange={handleChange}
                                    disabled={!isEditing || field.name === 'gpa'}
                                    className={`flex-8 px-4 py-2 font-normal rounded border ${
                                        !isEditing
                                            ? "border-gray-300 bg-gray-50"
                                            : "border-gray-400 bg-white text-black"
                                    }`}
                                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                                    {...field}
                                />
                            </div>
                        ))}

                        {isEditing ? (
                            <button
                                type="button"
                                onClick={handleSave}
                                className="bg-purple-300 text-white px-6 py-2 rounded-full hover:bg-purple-400 cursor-pointer"
                            >
                                Save
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setIsEditing(true)}
                                className="bg-purple-300 text-white px-6 py-2 rounded-full hover:bg-purple-400 cursor-pointer"
                            >
                                Edit
                            </button>
                        )}
                    </form>

                    {/* Delete account section */}
                    <div className="mt-8 pt-8 border-t border-gray-300 w-4/5">
                        <button
                            type="button"
                            onClick={() => setShowDeleteConfirm(true)}
                            className="w-full bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 cursor-pointer"
                        >
                            Delete Account
                        </button>
                    </div>

                    {/* Delete Confirmation Modal */}
                    {showDeleteConfirm && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
                                <h2 className="text-2xl font-bold mb-4">Delete Account</h2>
                                <p className="text-gray-600 mb-6">
                                    Are you sure you want to delete your account? This action cannot be undone and will delete all your data including classes, grades, tasks, and semester information.
                                </p>
                                <div className="flex justify-center gap-4">
                                    <button
                                        onClick={() => setShowDeleteConfirm(false)}
                                        className="px-6 py-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleDeleteAccount();
                                            setShowDeleteConfirm(false);
                                        }}
                                        className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                    >
                                        Delete Account
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Profile;
