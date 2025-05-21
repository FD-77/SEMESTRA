import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GradeCard from "./GradeCard";
import DetailsCard from "./DetailsCard";
import TaskList from "./TaskList";

const ClassDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [classData, setClassData] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState("");

    const formatTime = (time) => {
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const standardHour = hour % 12 || 12;
        return `${standardHour}:${minutes} ${ampm}`;
    };

    // Fetch class details
    useEffect(() => {
        const fetchClassData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/class-detail/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    // We don't need to convert grade since it's already a letter grade in the database
                    const formattedClass = {
                        ...data,
                        classTimes: data.schedule?.map(slot => {
                            const days = slot.days.map(d => d.charAt(0).toUpperCase() + d.slice(1)).join(", ");
                            const formattedStart = formatTime(slot.startTime);
                            const formattedEnd = formatTime(slot.endTime);
                            return `${days}: ${formattedStart} to ${formattedEnd}`;
                        }).join(" | ")
                    };
                    setClassData(formattedClass);
                    setClassData(data);
                } else {
                    setError("Failed to load class details");
                }
            } catch (error) {
                setError("Error loading class details");
                console.error('Error fetching class:', error);
            }
        };

        fetchClassData();
    }, [id]);

    // Fetch tasks
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/class/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setTasks(data);
                } else {
                    setError("Failed to load tasks");
                }
            } catch (error) {
                setError("Error loading tasks");
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, [id]);

    const handleToggleTask = async (taskId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${taskId}/toggle`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const updatedTask = await response.json();
                setTasks(prevTasks => prevTasks.map(task => 
                    task._id === taskId ? updatedTask : task
                ));
                setError("");
            } else {
                setError("Failed to update task");
            }
        } catch (error) {
            setError("Error updating task");
            console.error('Error updating task:', error);
        }
    };

    const handleUpdateTasks = async (updatedTask) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${updatedTask._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedTask)
            });

            if (response.ok) {
                const updatedTaskData = await response.json();
                setTasks(prevTasks => {
                    const taskExists = prevTasks.some(task => task._id === updatedTaskData._id);
                    if (taskExists) {
                        return prevTasks.map(task => 
                            task._id === updatedTaskData._id ? updatedTaskData : task
                        );
                    } else {
                        return [...prevTasks, updatedTaskData];
                    }
                });
                setError("");
            } else {
                setError("Failed to update task");
            }
        } catch (error) {
            setError("Error updating task");
            console.error('Error updating task:', error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setTasks(tasks.filter(task => task._id !== taskId));
            } else {
                setError("Failed to delete task");
            }
        } catch (error) {
            setError("Error deleting task");
            console.error('Error deleting task:', error);
        }
    };

    if (!classData) return <div>Loading...</div>;

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8">
            <div className="flex justify-between items-center mb-4 md:mb-8">
                <h1 className="text-2xl md:text-4xl">
                    {classData.classNo} - {classData.className}
                </h1>
            </div>

            {error && (
                <div className="text-red-500 mb-4">{error}</div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8">
                {/* Left Column */}
                <div className="lg:col-span-4 space-y-4 md:space-y-6">
                    <GradeCard grade={classData.grade} />
                    <DetailsCard details={classData} />
                </div>

                {/* Right Column - Tasks */}
                <div className="lg:col-span-8">
                    <TaskList
                        tasks={tasks}
                        onToggle={handleToggleTask}
                        onUpdate={handleUpdateTasks}
                        onDelete={handleDeleteTask}
                        classId={id}
                    />
                </div>
            </div>
        </div>
    );
};

export default ClassDetail;
