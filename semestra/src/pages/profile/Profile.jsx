import React, { useState } from "react";

import { FaUserCircle } from "react-icons/fa";

const Profile = () => {
    // Initial data of user profile
    const [profile, setProfile] = useState({
        name: "Test Name",
        school: "The City College of New York",
        gpa: "4.0",
        major: "Computer Science",
        email: "tn111@citymail.cuny.edu",
        phone: "111-1111-1111",
    });

    // Edit mode switch
    const [isEditing, setIsEditing] = useState(false);

    // Handle input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Save user information
    const handleSave = () => {
        setIsEditing(false);
        console.log("Saved user information: ", profile);
        // TODO: Call API to save user information
    };

    return (
        <main>
            <div className="max-w-3xl mx-auto my-10 ">
                <h1 className="text-5xl pb-10">Profile</h1>

                <div className="flex flex-col items-center bg-amber-100 py-10 rounded-3xl shadow-lg">
                    <FaUserCircle className="size-40 text-purple-300 mb-10" />

                    <form className="space-y-6 w-4/5 text-xl">
                        {[
                            { label: "Name", name: "name", type: "text" },
                            { label: "School", name: "school", type: "text" },
                            { label: "GPA", name: "gpa", type: "text" },
                            { label: "Major", name: "major", type: "text" },
                            { label: "Email", name: "email", type: "email" },
                            { label: "Phone", name: "phone", type: "tel" },
                        ].map((field) => (
                            <div key={field.name} className="flex items-center">
                                <label className="flex-2 text-right pr-3  font-semibold">
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
                                />
                            </div>
                        ))}

                        {isEditing ? (
                            <button
                                onClick={handleSave}
                                className="bg-purple-300 text-white px-6 py-2 rounded-full hover:bg-purple-400 cursor-pointer"
                            >
                                Save
                            </button>
                        ) : (
                            <button
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
