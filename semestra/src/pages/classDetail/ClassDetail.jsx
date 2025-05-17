import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GradeCard from "./GradeCard";
import DetailsCard from "./DetailsCard";
import TaskList from "./TaskList";

const ClassDetail = () => {
    const { classId } = useParams();
    const [classData, setClassData] = useState({
        id: 1,
        classNo: "CSC 47300",
        className: "Web Site Design",
        term: "2025 Spring Term",
        grade: 4.0,
        professor: "Prof. Baffour",
        classTimes: "Tue: 6:30 PM to 9:00 PM",
        room: "NAC 7/306",
        bgColor: "bg-red-200",
    });

    const [tasks, setTasks] = useState([
        { id: 1, title: "Do Homework", completed: true, classId: 1 },
        { id: 2, title: "Do Homework", completed: true, classId: 1 },
        { id: 3, title: "Do Homework", completed: true, classId: 1 },
        { id: 4, title: "Do Homework", completed: false, classId: 1 },
        { id: 5, title: "Do Homework", completed: false, classId: 1 },
        { id: 6, title: "Do Homework", completed: false, classId: 1 },
    ]);

    useEffect(() => {}, [classId]);

    const handleToggleTask = (taskId) => {
        setTasks(
            tasks.map((task) =>
                task.id === taskId
                    ? { ...task, completed: !task.completed }
                    : task
            )
        );
    };

    const handleUpdateTasks = (updatedTasks) => {
        setTasks(updatedTasks);
    };

    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
    };

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
