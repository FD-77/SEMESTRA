import React, { useState } from 'react';
import Task from './Task';

const TaskList = ({ tasks, onToggle, onUpdate, onDelete, classId }) => {
    const [showOptions, setShowOptions] = useState(null);
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [editingTask, setEditingTask] = useState(null);
    const [error, setError] = useState("");

    const handleAddTask = async () => {
        if (newTaskTitle.trim()) {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:3000/api/tasks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        title: newTaskTitle,
                        classId: classId
                    })
                });

                if (response.ok) {
                    const newTask = await response.json();
                    onUpdate(newTask);
                    setNewTaskTitle("");
                    setIsAddingTask(false);
                    setError("");
                } else {
                    const data = await response.json();
                    setError(data.message || "Failed to add task");
                }
            } catch (err) {
                setError("Error adding task");
                console.error('Error adding task:', err);
            }
        }
    };

    const handleEditTask = (taskId) => {
        const task = tasks.find(t => t._id === taskId);
        if (task) {
            setEditingTask({ id: taskId, title: task.title });
            setShowOptions(null);
        }
    };

    const handleUpdateTask = async () => {
        if (editingTask && editingTask.title.trim()) {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:3000/api/tasks/${editingTask.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        title: editingTask.title,
                        completed: tasks.find(t => t._id === editingTask.id)?.completed || false
                    })
                });

                if (response.ok) {
                    const updatedTask = await response.json();
                    onUpdate(tasks.map(task =>
                        task._id === updatedTask._id ? updatedTask : task
                    ));
                    setEditingTask(null);
                    setError("");
                } else {
                    const data = await response.json();
                    setError(data.message || "Failed to update task");
                }
            } catch (err) {
                setError("Error updating task");
                console.error('Error updating task:', err);
            }
        }
    };

    return (
        <div>
            {error && (
                <div className="text-red-500 mb-4">{error}</div>
            )}
            
            <div className="space-y-3 md:space-y-4">
                {tasks.map((task) => (
                    <Task
                        key={task._id}
                        task={task}
                        onToggle={onToggle}
                        onEdit={handleEditTask}
                        onDelete={onDelete}
                        isEditing={editingTask?.id === task._id}
                        editingTitle={editingTask?.title}
                        onEditChange={(title) => setEditingTask({ ...editingTask, title })}
                        onSave={handleUpdateTask}
                        onCancel={() => setEditingTask(null)}
                        showOptions={showOptions === task._id}
                        onOptionsClick={(id) => setShowOptions(showOptions === id ? null : id)}
                    />
                ))}
            </div>
            
            {isAddingTask ? (
                <div className="mt-4 md:mt-6 space-y-3 md:space-y-4">
                    <input
                        type="text"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        placeholder="Enter task title"
                        className="w-full px-3 md:px-4 py-2 md:py-3 rounded-2xl border text-sm md:text-base"
                        autoFocus
                    />
                    <div className="flex gap-3 md:gap-4">
                        <button
                            onClick={handleAddTask}
                            className="flex-1 bg-green-500 text-white rounded-2xl py-2 md:py-3 text-base md:text-xl"
                        >
                            Add
                        </button>
                        <button
                            onClick={() => {
                                setIsAddingTask(false);
                                setNewTaskTitle("");
                                setError("");
                            }}
                            className="flex-1 bg-gray-500 text-white rounded-2xl py-2 md:py-3 text-base md:text-xl"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setIsAddingTask(true)}
                    className="w-full bg-pink-200 rounded-2xl py-3 md:py-4 mt-4 md:mt-6 text-base md:text-xl"
                >
                    ADD TASK
                </button>
            )}
        </div>
    );
};

export default TaskList;