import React, { useState } from 'react';
import Task from './Task';

const TaskList = ({ tasks, onToggle, onUpdate, onDelete }) => {
    const [showOptions, setShowOptions] = useState(null);
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [editingTask, setEditingTask] = useState(null);

    const handleAddTask = () => {
        if (newTaskTitle.trim()) {
            const newTask = {
                id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
                title: newTaskTitle,
                completed: false
            };
            onUpdate([...tasks, newTask]);
            setNewTaskTitle("");
            setIsAddingTask(false);
        }
    };

    const handleEditTask = (taskId) => {
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            setEditingTask({ id: taskId, title: task.title });
            setShowOptions(null);
        }
    };

    const handleUpdateTask = () => {
        if (editingTask && editingTask.title.trim()) {
            onUpdate(tasks.map(task =>
                task.id === editingTask.id ? { ...task, title: editingTask.title } : task
            ));
            setEditingTask(null);
        }
    };

    return (
        <div>
            <div className="space-y-3 md:space-y-4">
                {tasks.map((task) => (
                    <Task
                        key={task.id}
                        task={task}
                        onToggle={onToggle}
                        onEdit={handleEditTask}
                        onDelete={onDelete}
                        isEditing={editingTask?.id === task.id}
                        editingTitle={editingTask?.title}
                        onEditChange={(title) => setEditingTask({ ...editingTask, title })}
                        onSave={handleUpdateTask}
                        onCancel={() => setEditingTask(null)}
                        showOptions={showOptions === task.id}
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