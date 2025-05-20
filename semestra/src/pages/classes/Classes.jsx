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
            const user = JSON.parse(localStorage.getItem('user'));
            
            // Get the old class data before updating
            const oldClass = classes.find(c => c._id === classData._id);
            
            // Add userId to edit
            const classWithUserId = {
                ...classData,
                userId: user.id
            };

            const response = await fetch(`http://localhost:3000/api/classes/${classData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(classWithUserId)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update class');
            }

            const updatedClass = await response.json();
            setClasses(classes.map(cls => 
                cls._id === updatedClass._id ? updatedClass : cls
            ));

            // If term changed, calculate GPAs for both old and new terms
            if (oldClass.term !== updatedClass.term) {
                // Parse old term
                const [oldYear, oldSeason] = oldClass.term.split(' ');
                
                // Parse new term
                const [newYear, newSeason] = updatedClass.term.split(' ');

                // Calculate GPA for old semester
                await calculateAndSaveSemesterGPA(oldYear, oldSeason.toLowerCase());

                // Calculate GPA for new semester
                await calculateAndSaveSemesterGPA(newYear, newSeason.toLowerCase());
            }

            setIsModalOpen(false);
        } catch (error) {
            console.error('Error updating class:', error);
            alert(error.message || 'Error updating class');
        }
    };

    // Add this new helper function
    const calculateAndSaveSemesterGPA = async (year, season) => {
        try {
            const token = localStorage.getItem('token');
            
            // Get all classes for this semester
            const response = await fetch('http://localhost:3000/api/classes', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const allClasses = await response.json();
                const termToMatch = `${year} ${season.charAt(0).toUpperCase() + season.slice(1)} Term`;
                const semesterClasses = allClasses.filter(cls => cls.term === termToMatch);

                // Calculate GPA
                let totalQualityPoints = 0;
                let totalCredits = 0;

                semesterClasses.forEach(cls => {
                    if (cls.grade && cls.credits) {
                        const credits = parseFloat(cls.credits);
                        const gradePoints = 
                            cls.grade === 'A' ? 4.0 :
                            cls.grade === 'A-' ? 3.7 :
                            cls.grade === 'B+' ? 3.3 :
                            cls.grade === 'B' ? 3.0 :
                            cls.grade === 'B-' ? 2.7 :
                            cls.grade === 'C+' ? 2.3 :
                            cls.grade === 'C' ? 2.0 :
                            cls.grade === 'C-' ? 1.7 :
                            cls.grade === 'D+' ? 1.3 :
                            cls.grade === 'D' ? 1.0 :
                            cls.grade === 'F' ? 0.0 : null;

                        if (gradePoints !== null) {
                            totalQualityPoints += credits * gradePoints;
                            totalCredits += credits;
                        }
                    }
                });

                const gpa = totalCredits > 0 ? (totalQualityPoints / totalCredits).toFixed(2) : 'N/A';

                // Save semester GPA
                await fetch('http://localhost:3000/api/semesters', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        year,
                        season,
                        semesterGPA: gpa !== 'N/A' ? parseFloat(gpa) : null
                    })
                });
            }
        } catch (error) {
            console.error('Error calculating semester GPA:', error);
        }
    };

    const handleAddClass = async (classData) => {
        try {
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user'));
            
            // Add userId to the class data
            const classWithUserId = {
                ...classData,
                userId: user.id
            };

            const response = await fetch('http://localhost:3000/api/classes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(classWithUserId)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response:', errorData);
                throw new Error(errorData.message || 'Failed to add class');
            }

            const newClass = await response.json();
            setClasses([...classes, newClass]);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error adding class:', error);
            alert(error.message || 'Error adding class');
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
                    className="bg-blue-400 hover:bg-blue-500 text-white cursor-pointer rounded-full px-6 py-4 text-2xl my-10"
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
