import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

const ClassModal = ({ isOpen, onClose, onSubmit, editData }) => {
    const [formData, setFormData] = useState({
        classNo: "",
        className: "",
        term: "",
        year: new Date().getFullYear().toString(), // Initialize with current year
        season: "", // Initialize empty
        grade: 4.0,
        professor: "",
        schedule: [],
        room: "",
        credits: "",
        bgColor: "bg-purple-200",
    });

    useEffect(() => {
        if (editData) {
            // Parse existing term (e.g., "2024 Spring Term")
            const termParts = editData.term?.split(' ') || [];
            const year = termParts[0];
            const season = termParts[1]?.toLowerCase();

            const formattedData = {
                ...editData,
                year: year || new Date().getFullYear().toString(),
                season: season?.toLowerCase() || "",
                schedule: editData.schedule || [],
            };

            // Ensure term is properly formatted
            if (formattedData.year && formattedData.season) {
                const capitalizedSeason = formattedData.season.charAt(0).toUpperCase() + formattedData.season.slice(1);
                formattedData.term = `${formattedData.year} ${capitalizedSeason} Term`;
            }

            setFormData(formattedData);
        }
    }, [editData]);

    const [scheduleItem, setScheduleItem] = useState({
        days: [],
        startTime: "",
        endTime: "",
    });

    const daysOfWeek = [
        { id: "mon", label: "Mon" },
        { id: "tue", label: "Tue" },
        { id: "wed", label: "Wed" },
        { id: "thu", label: "Thu" },
        { id: "fri", label: "Fri" },
    ];

    // Add available seasons and years
    const seasons = [
        { id: "spring", label: "Spring" },
        { id: "summer", label: "Summer" },
        { id: "fall", label: "Fall" },
        { id: "winter", label: "Winter" }
    ];

    const years = Array.from({ length: 10 }, (_, i) => {
        const year = new Date().getFullYear() + i;
        return { id: year.toString(), label: year.toString() };
    });

    // Modify handleChange to update term when year or season changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newState = {
                ...prev,
                [name]: value
            };
            
            // Update term when year or season changes
            if (name === 'year' || name === 'season') {
                if (newState.year && newState.season) {
                    const capitalizedSeason = newState.season.charAt(0).toUpperCase() + newState.season.slice(1);
                    newState.term = `${newState.year} ${capitalizedSeason} Term`;
                }
            }
            
            return newState;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ensure term is properly formatted before submitting
        const formDataWithTerm = {
            ...formData,
            term: `${formData.year} ${formData.season.charAt(0).toUpperCase() + formData.season.slice(1)} Term`
        };
        onSubmit(formDataWithTerm);
        onClose();
    };

    const handleDayToggle = (dayId) => {
        setScheduleItem((prev) => ({
            ...prev,
            days: prev.days.includes(dayId)
                ? prev.days.filter((d) => d !== dayId)
                : [...prev.days, dayId],
        }));
    };

    const handleAddSchedule = () => {
        if (
            scheduleItem.days.length &&
            scheduleItem.startTime &&
            scheduleItem.endTime
        ) {
            setFormData((prev) => ({
                ...prev,
                schedule: [...prev.schedule, { ...scheduleItem }],
            }));
            setScheduleItem({ days: [], startTime: "", endTime: "" });
        }
    };

    const handleRemoveSchedule = (index) => {
        setFormData((prev) => ({
            ...prev,
            schedule: prev.schedule.filter((_, i) => i !== index),
        }));
    };

    if (!isOpen) return null;

    const colorOptions = [
        "bg-purple-200",
        "bg-red-200",
        "bg-green-200",
        "bg-blue-200",
        "bg-yellow-200",
        "bg-pink-200",
        "bg-orange-200",
    ];

    return (
        <div className="fixed inset-0 bg-purple-200 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">
                        {editData ? "Edit Class" : "Add New Class"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <IoClose className="size-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Class Number
                            </label>
                            <input
                                type="text"
                                name="classNo"
                                value={formData.classNo}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Class Name
                            </label>
                            <input
                                type="text"
                                name="className"
                                value={formData.className}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Year
                            </label>
                            <select
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                            >
                                <option value="">Select Year</option>
                                {years.map(year => (
                                    <option key={year.id} value={year.id}>
                                        {year.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Season
                            </label>
                            <select
                                name="season"
                                value={formData.season}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                            >
                                <option value="">Select Season</option>
                                {seasons.map(season => (
                                    <option key={season.id} value={season.id}>
                                        {season.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Professor
                            </label>
                            <input
                                type="text"
                                name="professor"
                                value={formData.professor}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Room
                            </label>
                            <input
                                type="text"
                                name="room"
                                value={formData.room}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Credits
                            </label>
                            <input
                                type="number"
                                name="credits"
                                value={formData.credits}
                                onChange={handleChange}
                                required
                                min="0"
                                max="6"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Card Color
                        </label>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {colorOptions.map((color) => (
                                <button
                                    key={color}
                                    type="button"
                                    onClick={() =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            bgColor: color,
                                        }))
                                    }
                                    className={`w-8 h-8 rounded-full ${color} ${
                                        formData.bgColor === color
                                            ? "ring-2 ring-offset-2 ring-purple-500"
                                            : ""
                                    }`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="border rounded-lg p-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Class Schedule
                            </label>

                            {/* Day selector */}
                            <div className="flex gap-2 mb-3">
                                {daysOfWeek.map((day) => (
                                    <button
                                        key={day.id}
                                        type="button"
                                        onClick={() => handleDayToggle(day.id)}
                                        className={`px-3 py-2 rounded-full ${
                                            scheduleItem.days.includes(day.id)
                                                ? "bg-purple-600 text-white"
                                                : "bg-gray-200 text-gray-700"
                                        }`}
                                    >
                                        {day.label}
                                    </button>
                                ))}
                            </div>

                            {/* Time inputs */}
                            <div className="grid grid-cols-2 gap-4 mb-3">
                                <div>
                                    <label className="block text-sm text-gray-700">
                                        Start Time
                                    </label>
                                    <input
                                        type="time"
                                        value={scheduleItem.startTime}
                                        onChange={(e) =>
                                            setScheduleItem((prev) => ({
                                                ...prev,
                                                startTime: e.target.value,
                                            }))
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-700">
                                        End Time
                                    </label>
                                    <input
                                        type="time"
                                        value={scheduleItem.endTime}
                                        onChange={(e) =>
                                            setScheduleItem((prev) => ({
                                                ...prev,
                                                endTime: e.target.value,
                                            }))
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                    />
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleAddSchedule}
                                className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                            >
                                Add Time Slot
                            </button>
                        </div>

                        {/* Display schedule items - Add null check */}
                        {formData.schedule?.length > 0 && (
                            <div className="space-y-2">
                                {formData.schedule.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between items-center bg-gray-50 p-3 rounded-md"
                                    >
                                        <span>
                                            {item.days
                                                .map(
                                                    (d) =>
                                                        daysOfWeek.find(
                                                            (day) => day.id === d
                                                        )?.label
                                                )
                                                .join(", ")}
                                            {" "}
                                            {item.startTime} - {item.endTime}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveSchedule(index)}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            <IoClose className="size-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end space-x-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
                        >
                            {editData ? "Save Changes" : "Add Class"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ClassModal;
