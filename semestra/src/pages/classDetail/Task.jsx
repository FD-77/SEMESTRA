import React from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";

const Task = ({ 
    task, 
    onToggle, 
    onEdit, 
    onDelete, 
    isEditing, 
    editingTitle,
    onEditChange,
    onSave,
    onCancel,
    showOptions,
    onOptionsClick 
}) => {
    const TaskOptions = () => (
        <div className="absolute right-4 top-14 bg-white shadow-lg rounded-lg py-2 z-10">
            <button
                onClick={() => onEdit(task._id)}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-sm md:text-base"
            >
                <FiEdit className="size-4 md:size-5" /> Edit
            </button>
            <button
                onClick={() => onDelete(task._id)}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-red-600 text-sm md:text-base"
            >
                <RiDeleteBin6Line className="size-4 md:size-5" /> Delete
            </button>
        </div>
    );

    return (
        <div className={`${task.completed ? 'bg-purple-200' : 'bg-blue-100'} 
            rounded-2xl p-3 md:p-4 flex items-center justify-between relative`}
        >
            <div className="flex items-center gap-2 md:gap-4 flex-1">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggle(task._id)}
                    className="size-5 md:size-6"
                />
                {isEditing ? (
                    <div className="flex-1 flex gap-2">
                        <input
                            type="text"
                            value={editingTitle}
                            onChange={(e) => onEditChange(e.target.value)}
                            className="flex-1 bg-white rounded px-2 py-1 text-sm md:text-base"
                            autoFocus
                        />
                        <button
                            onClick={onSave}
                            className="bg-green-500 text-white px-2 md:px-3 py-1 rounded text-sm md:text-base"
                        >
                            Save
                        </button>
                        <button
                            onClick={onCancel}
                            className="bg-gray-500 text-white px-2 md:px-3 py-1 rounded text-sm md:text-base"
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <span className="text-base md:text-xl">{task.title}</span>
                )}
            </div>
            <div className="relative">
                <BsThreeDotsVertical
                    className="size-5 md:size-6 cursor-pointer"
                    onClick={() => onOptionsClick(task._id)}
                />
                {showOptions && <TaskOptions />}
            </div>
        </div>
    );
};

export default Task; 