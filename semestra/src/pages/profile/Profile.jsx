import React, { useState, useEffect } from "react";

import { FaUserCircle } from "react-icons/fa";

const Profile = () => {
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

    // Fetch user profile on component mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:3000/api/profile', {
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
            const response = await fetch('http://localhost:3000/api/profile', {
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
                            { label: "GPA", name: "gpa", type: "number", step: "0.01", min: "0", max: "4.0" },
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
                                    disabled={!isEditing}
                                    className={`flex-8 px-4 py-2 font-normal rounded border ${
                                        isEditing
                                            ? "border-gray-400"
                                            : "border-gray-300 text-gray-500 cursor-not-allowed"
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
                </div>
            </div>
        </main>
    );
};

export default Profile;
