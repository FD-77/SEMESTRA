import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

const ClassModal = ({ isOpen, onClose, onSubmit, editData }) => {
    const [formData, setFormData] = useState({
        classNo: "",
        className: "",
        term: "",
        grade: 4.0,
        professor: "",
        classTimes: "",
        room: "",
        bgColor: "bg-purple-200",
    });

    useEffect(() => {
        if (editData) {
            setFormData(editData);
        }
    }, [editData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
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
                                name="name"
                                value={formData.className}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Term
                            </label>
                            <input
                                type="text"
                                name="term"
                                value={formData.term}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                            />
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
                                Class Times
                            </label>
                            <input
                                type="text"
                                name="classTimes"
                                value={formData.classTimes}
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
