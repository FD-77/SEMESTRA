import React, { useEffect, useState } from "react";
import ClassCard from "./ClassCard";
import ClassModal from "./ClassForm";

const Classes = () => {
    const [classes, setClasses] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingClass, setEditingClass] = useState(null);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:3000/api/classes', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setClasses(data);
                }
            } catch (error) {
                console.error('Error fetching classes:', error);
            }
        };
        fetchClasses();
    }, []);

    const handleDeleteClass = async (id) => {
        if (window.confirm("Are you sure you want to delete this class?")) {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:3000/api/classes/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    setClasses(classes.filter(cls => cls._id !== id));
                }
            } catch (error) {
                console.error('Error deleting class:', error);
            }
        }
    };

    const handleEditClass = async (classData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/api/classes/${classData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(classData)
            });
            const updatedClass = await response.json();
            if (response.ok) {
                setClasses(classes.map(cls => 
                    cls._id === updatedClass._id ? updatedClass : cls
                ));
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error('Error updating class:', error);
        }
    };

    const handleAddClass = async (classData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/api/classes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(classData)
            });
            const newClass = await response.json();
            if (response.ok) {
                setClasses([...classes, newClass]);
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error('Error adding class:', error);
        }
    };

    const openModal = (classData = null) => {
        setEditingClass(classData);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setEditingClass(null);
        setIsModalOpen(false);
    };

    const handleModalSubmit = (classData) => {
        if (editingClass) {
            handleEditClass(classData);
        } else {
            handleAddClass(classData);
        }
    };

    return (
        <main>
            <div className="max-w-7xl mx-auto my-10">
                <h1 className="text-5xl pb-10">Classes</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-3">
                    {classes.map((item) => (
                        <ClassCard
                            key={item._id} // Changed from item.id
                            classData={item}
                            onEditClass={openModal}
                            onDeleteClass={handleDeleteClass}
                        />
                    ))}
                </div>

                <button
                    className="bg-blue-400 hover:bg-blue-500 text-white rounded-full px-6 py-4 text-2xl my-10"
                    onClick={() => openModal()}
                >
                    Add Class
                </button>
            </div>

            <ClassModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSubmit={handleModalSubmit}
                editData={editingClass}
            />
        </main>
    );
};

export default Classes;
