import React, { useEffect, useState } from "react";
import ClassCard from "./ClassCard";
import ClassModal from "./ClassForm";

const Classes = () => {
    const [classes, setClasses] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingClass, setEditingClass] = useState(null);

    useEffect(() => {
        fetch("classes.json")
            .then((res) => res.json())
            .then((data) => setClasses(data));
    }, []);

    const handleDeleteClass = (id) => {
        if (window.confirm("Are you sure you want to delete this class?")) {
            setClasses(classes.filter((item) => item.id !== id));
        }
    };

    const handleEditClass = (classData) => {};

    const handleAddClass = (classData) => {};

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
            handleEditClass({ ...classData, id: editingClass.id });
        } else {
            handleAddClass(classData);
        }
    };

    return (
        <main>
            <div className="max-w-full mx-auto my-10">
                <h1 className="text-5xl pb-10">Classes</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {classes.map((item) => (
                        <ClassCard
                            key={item.id}
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
