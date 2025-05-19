import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GradeCard from "./GradeCard";
import DetailsCard from "./DetailsCard";
import TaskList from "./TaskList";

const ClassDetail = () => {
    const { id } = useParams();
    const [classData, setClassData] = useState(null);
    const [tasks, setTasks] = useState([]);

    const formatTime = (time) => {
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const standardHour = hour % 12 || 12;
        return `${standardHour}:${minutes} ${ampm}`;
    };

    useEffect(() => {
        const fetchClassData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:3000/api/classes/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
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
                }
            } catch (error) {
                console.error('Error fetching class:', error);
            }
        };

        fetchClassData();
        
        // Load tasks for this class
        const storedTasks = JSON.parse(localStorage.getItem(`tasks_${id}`) || '[]');
        setTasks(storedTasks);
    }, [id]);

    const handleToggleTask = (taskId) => {
        const updatedTasks = tasks.map((task) =>
            task.id === taskId
                ? { ...task, completed: !task.completed }
                : task
        );
        setTasks(updatedTasks);
        localStorage.setItem(`tasks_${id}`, JSON.stringify(updatedTasks));
    };

    const handleUpdateTasks = (updatedTasks) => {
        setTasks(updatedTasks);
        localStorage.setItem(`tasks_${id}`, JSON.stringify(updatedTasks));
    };

    const handleDeleteTask = (taskId) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
        localStorage.setItem(`tasks_${id}`, JSON.stringify(updatedTasks));
    };

    if (!classData) return <div>Loading...</div>;

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8">
            <h1 className="text-2xl md:text-4xl mb-4 md:mb-8">
                {classData.classNo} - {classData.className}
            </h1>

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
                    />
                </div>
            </div>
        </div>
    );
};

export default ClassDetail;
