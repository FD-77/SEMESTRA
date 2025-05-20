import React, { useState, useEffect, useCallback } from "react";  // Added useEffect
import { IoMdAdd } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import "./GPACalculator.css";
import CustomSelect from "../../components/CustomSelect";

const gradeOptions = [
    { id: '4.0', name: 'A' },
    { id: '3.7', name: 'A-' },
    { id: '3.3', name: 'B+' },
    { id: '3.0', name: 'B' },
    { id: '2.7', name: 'B-' },
    { id: '2.3', name: 'C+' },
    { id: '2.0', name: 'C' },
    { id: '1.7', name: 'C-' },
    { id: '1.3', name: 'D+' },
    { id: '1.0', name: 'D' },
    { id: '0.0', name: 'F' }
];

const GPACalculator = () => {
    const [activeTab, setActiveTab] = useState("class");
    const [classes, setClasses] = useState([]);
    const [activeClassId, setActiveClassId] = useState("");
    const [semesterClasses, setSemesterClasses] = useState([
        { id: 1, name: "", credits: "", grade: "" }
    ]);
    const [isAddingClass, setIsAddingClass] = useState(false);
    const [newClassName, setNewClassName] = useState("");
    const [categories, setCategories] = useState([]);
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: '', weight: '' });

    const [classGPA, setClassGPA] = useState(0);
    const [semesterGPA, setSemesterGPA] = useState(0);

    // Fetch classes from the database
    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:3000/api/classes', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    // Transform the data to match the expected format
                    const formattedClasses = data.map(cls => ({
                        id: cls._id,
                        name: `${cls.classNo} - ${cls.className}`,
                        components: []
                    }));
                    setClasses(formattedClasses);
                }
            } catch (error) {
                console.error('Error fetching classes:', error);
            }
        };

        fetchClasses();
    }, []);

    // Load GPA data when class is selected
    useEffect(() => {
        const loadGPAData = async () => {
            if (!activeClassId) return;
            
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:3000/api/classes/${activeClassId}/gpa-data`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                if (response.ok) {
                    const data = await response.json();
                    setCategories(data.categories || []);
                    
                    // Update class components with assignments
                    setClasses(classes.map(cls => 
                        cls.id === activeClassId ? {
                            ...cls,
                            components: data.assignments.map(assignment => ({
                                id: assignment.id,
                                name: assignment.name,
                                category: assignment.category,
                                grade: assignment.grade
                            }))
                        } : cls
                    ));
                }
            } catch (error) {
                console.error('Error loading GPA data:', error);
            }
        };

        loadGPAData();
    }, [activeClassId]);

    const handleAddClass = () => {
        if (!isAddingClass) {
            setIsAddingClass(true);
            return;
        }

        if (newClassName.trim()) {
            const newClass = {
                id: Date.now(), // Use timestamp for unique ID
                name: newClassName,
                components: [] // Initialize empty components array
            };

            // First add the class to state
            setClasses(prevClasses => [...prevClasses, newClass]);
            
            // Then save the new class to backend
            const saveNewClass = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const response = await fetch('http://localhost:3000/api/classes', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            classNo: newClassName.split(' - ')[0],
                            className: newClassName.split(' - ')[1] || newClassName,
                            components: [],
                            categories: []
                        })
                    });

                    if (response.ok) {
                        const savedClass = await response.json();
                        // Update the class in state with the proper ID from database
                        setClasses(prevClasses => 
                            prevClasses.map(cls => 
                                cls.name === newClassName 
                                    ? { ...cls, id: savedClass._id }
                                    : cls
                            )
                        );
                        setActiveClassId(savedClass._id);
                    }
                } catch (error) {
                    console.error('Error saving new class:', error);
                }
            };

            saveNewClass();
            setIsAddingClass(false);
            setNewClassName("");
        }
    };

    const handleAddComponent = () => {
        if (activeTab === "class") {
            setClasses(classes.map(cls => {
                if (cls.id === activeClassId) {
                    const newComponent = {
                        id: Date.now(), // Use timestamp for unique ID
                        name: "",
                        grade: "",
                        weight: ""
                    };
                    return {
                        ...cls,
                        components: [...cls.components, newComponent]
                    };
                }
                return cls;
            }));
        } else {
            const newClass = {
                id: Date.now(), // Use timestamp for unique ID here too
                name: "",
                credits: "",
                grade: ""
            };
            setSemesterClasses([...semesterClasses, newClass]);
        }
    };

    const handleClassChange = (componentId, field, value) => {
        setClasses(classes.map(cls => {
            if (cls.id === activeClassId) {
                return {
                    ...cls,
                    components: cls.components.map(comp =>
                        comp.id === componentId 
                            ? { 
                                ...comp, 
                                [field]: value,
                                // Auto-set weight when category is selected
                                weight: field === 'category' 
                                    ? categories.find(cat => cat.id === value)?.weight 
                                    : comp.weight
                            } 
                            : comp
                    )
                };
            }
            return cls;
        }));
    };

    const handleSemesterChange = (id, field, value) => {
        setSemesterClasses(semesterClasses.map(cls => 
            cls.id === id ? { ...cls, [field]: value } : cls
        ));
    };

    const handleSave = () => {
        if (activeTab === "class") {
            console.log("Saving class components:", classes);
        } else {
            console.log("Saving semester classes:", semesterClasses);
        }
    };

    const handleRemoveComponent = (componentId) => {
        setClasses(classes.map(cls => {
            if (cls.id === activeClassId) {
                return {
                    ...cls,
                    components: cls.components.filter(comp => comp.id !== componentId)
                };
            }
            return cls;
        }));
    };

    // Add useEffect to validate total weight whenever categories change
    useEffect(() => {
        const totalWeight = categories.reduce((sum, cat) => sum + (parseInt(cat.weight) || 0), 0);
        if (totalWeight > 100) {
            alert('Total category weights cannot exceed 100%');
        }
    }, [categories]);

    const handleAddCategory = () => {
        if (newCategory.name && newCategory.weight) {
            const totalWeight = categories.reduce((sum, cat) => sum + (parseInt(cat.weight) || 0), 0);
            const newWeight = parseInt(newCategory.weight);
            
            if (totalWeight + newWeight > 100) {
                alert('Total category weights cannot exceed 100%');
                return;
            }

            const categoryId = newCategory.name.toLowerCase().replace(/\s+/g, '_');
            setCategories([
                ...categories,
                {
                    id: categoryId,
                    name: newCategory.name,
                    weight: parseInt(newCategory.weight)
                }
            ]);
            setIsAddingCategory(false);
            setNewCategory({ name: '', weight: '' });
        }
    };

    const handleRemoveCategory = (categoryId) => {
        setCategories(categories.filter(cat => cat.id !== categoryId));
        // Update components that use this category
        setClasses(classes.map(cls => ({
            ...cls,
            components: cls.components.map(comp => 
                comp.category === categoryId ? { ...comp, category: '' } : comp
            )
        })));
    };

    const activeClass = classes.find(cls => cls.id === activeClassId);

    // Add this calculation effect
    useEffect(() => {
        if (activeClass?.components.length > 0) {
            // Group assignments by category
            const categoryGroups = {};
            activeClass.components.forEach(comp => {
                if (comp.category && comp.grade) {
                    if (!categoryGroups[comp.category]) {
                        categoryGroups[comp.category] = [];
                    }
                    categoryGroups[comp.category].push(parseFloat(comp.grade));
                }
            });

            // Calculate weighted average
            let totalWeightedGrade = 0;
            let totalWeight = 0;

            categories.forEach(category => {
                const grades = categoryGroups[category.id];
                if (grades && grades.length > 0) {
                    const categoryAverage = grades.reduce((a, b) => a + b) / grades.length;
                    totalWeightedGrade += (categoryAverage * category.weight);
                    totalWeight += category.weight;
                }
            });

            const finalGrade = totalWeight > 0 ? (totalWeightedGrade / totalWeight).toFixed(2) : 0;
            setClassGPA(finalGrade);
        }
    }, [activeClass?.components, categories]);

    // Save GPA data when changes are made
    const saveGPAData = async () => {
        if (!activeClassId) return;

        try {
            const token = localStorage.getItem('token');
            const activeClass = classes.find(c => c.id === activeClassId);
            
            // Log the current data
            console.log('Current Class:', activeClass);
            console.log('Current GPA:', classGPA);

            const assignments = activeClass?.components.map(comp => ({
                id: comp.id,
                name: comp.name,
                category: comp.category,
                grade: parseFloat(comp.grade) || 0
            })) || [];

            // Calculate letter grade
            const letterGrade = classGPA >= 93 ? 'A' :
                              classGPA >= 90 ? 'A-' :
                              classGPA >= 87 ? 'B+' :
                              classGPA >= 83 ? 'B' :
                              classGPA >= 80 ? 'B-' :
                              classGPA >= 77 ? 'C+' :
                              classGPA >= 73 ? 'C' :
                              classGPA >= 70 ? 'C-' :
                              classGPA >= 67 ? 'D+' :
                              classGPA >= 60 ? 'D' : 'F';

            console.log('Calculated Letter Grade:', letterGrade);

            // First save categories and assignments
            const gpaDataResponse = await fetch(`http://localhost:3000/api/classes/${activeClassId}/gpa-data`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    categories,
                    assignments
                })
            });

            console.log('GPA Data Update Response:', await gpaDataResponse.json());

            // Then update the class grade
            const gradeUpdateResponse = await fetch(`http://localhost:3000/api/classes/${activeClassId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    grade: letterGrade
                })
            });

            const gradeUpdateResult = await gradeUpdateResponse.json();
            console.log('Grade Update Response:', gradeUpdateResult);

            if (!gradeUpdateResponse.ok) {
                throw new Error('Failed to update grade: ' + gradeUpdateResult.message);
            }

        } catch (error) {
            console.error('Error saving GPA data:', error);
        }
    };

    // Update the effect to include classGPA in dependencies
    useEffect(() => {
        if (activeClassId && classGPA) {  // Only save if we have both an active class and a GPA
            saveGPAData();
        }
    }, [categories, activeClass?.components, classGPA]);  // Add classGPA to dependencies

    // Add this useEffect to fetch all classes with their grades
    useEffect(() => {
        const fetchClassesWithGrades = async () => {
            if (activeTab === "semester") {
                try {
                    const token = localStorage.getItem('token');
                    const response = await fetch('http://localhost:3000/api/classes', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (response.ok) {
                        const data = await response.json();
                        const classesWithGrades = data.map(cls => ({
                            id: cls._id,
                            name: `${cls.classNo} - ${cls.className}`,
                            credits: cls.credits,
                            grade: cls.grade || 'N/A'
                        }));
                        setSemesterClasses(classesWithGrades);
                    }
                } catch (error) {
                    console.error('Error fetching classes with grades:', error);
                }
            }
        };

        fetchClassesWithGrades();
    }, [activeTab]);

    // Add this function to calculate semester GPA
    const calculateSemesterGPA = useCallback(() => {
        let totalQualityPoints = 0;
        let totalCredits = 0;

        semesterClasses.forEach(cls => {
            // Skip if no grade or credits
            if (!cls.grade || !cls.credits) return;

            const credits = parseFloat(cls.credits);
            // Convert letter grade to grade points
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

            // Only include in calculation if we have valid grade points
            if (gradePoints !== null) {
                // Calculate quality points (grade points × credits)
                const qualityPoints = gradePoints * credits;
                totalQualityPoints += qualityPoints;
                totalCredits += credits;
            }
        });

        // Calculate GPA (total quality points ÷ total credits)
        const semesterGPA = totalCredits > 0 ? 
            (totalQualityPoints / totalCredits).toFixed(2) : 
            0;

        setSemesterGPA(semesterGPA);
    }, [semesterClasses]);

    // Add useEffect to trigger calculation when semester classes change
    useEffect(() => {
        if (activeTab === "semester") {
            calculateSemesterGPA();
        }
    }, [semesterClasses, activeTab, calculateSemesterGPA]);

    return (
        <div className="gpa-calculator">
            <h1 className="gpa-calculator__title">GPA Calculator</h1>
            
            <div className="gpa-calculator__tabs">
                <button 
                    className={`gpa-calculator__tab ${activeTab === "class" ? 'gpa-calculator__tab--active' : 'gpa-calculator__tab--inactive'}`}
                    onClick={() => setActiveTab("class")}
                >
                    Class GPA
                </button>
                <button 
                    className={`gpa-calculator__tab ${activeTab === "semester" ? 'gpa-calculator__tab--active' : 'gpa-calculator__tab--inactive'}`}
                    onClick={() => setActiveTab("semester")}
                >
                    Semester GPA
                </button>
            </div>
            
            <div className="gpa-calculator__content">
                {activeTab === "class" && (
                    <div className="flex items-center gap-4 mb-6">
                        <div className="gpa-calculator__class-selector flex-1">
                            <CustomSelect
                                options={classes}
                                value={activeClassId}
                                onChange={(value) => setActiveClassId(value)}
                                placeholder="Select Class"
                            />
                        </div>
                        
                        {/* Category Management - Only show if a class is selected */}
                        {activeClassId && (
                            <button
                                onClick={() => setIsAddingCategory(true)}
                                className="gpa-calculator__button gpa-calculator__button--add whitespace-nowrap"
                            >
                                <IoMdAdd className="gpa-calculator__icon" />
                                Add Category
                            </button>
                        )}
                    </div>
                )}

                {/* Category Modal */}
                {isAddingCategory && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative">
                            <button
                                onClick={() => setIsAddingCategory(false)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                            >
                                <IoClose className="size-6" />
                            </button>
                            
                            <h2 className="text-xl font-semibold mb-4">Add Category</h2>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Category Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Category Name"
                                        value={newCategory.name}
                                        onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                                        className="gpa-calculator__input gpa-calculator__input--name w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Weight (%)
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Weight %"
                                        value={newCategory.weight}
                                        onChange={(e) => setNewCategory(prev => ({ ...prev, weight: e.target.value }))}
                                        className="gpa-calculator__input gpa-calculator__input--weight w-full"
                                    />
                                </div>
                                <div className="flex justify-end gap-2 mt-6">
                                    <button
                                        onClick={handleAddCategory}
                                        className="gpa-calculator__button gpa-calculator__button--save"
                                    >
                                        Add
                                    </button>
                                    <button
                                        onClick={() => setIsAddingCategory(false)}
                                        className="gpa-calculator__button gpa-calculator__button--remove"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Display current categories */}
                {activeTab === "class" && activeClassId && (
                    <div className="mb-6 flex flex-wrap gap-2">
                        {categories.map(category => (
                            <div 
                                key={category.id}
                                className="bg-gray-100 rounded-full px-4 py-2 flex items-center gap-2"
                            >
                                <span>{category.name} ({category.weight}%)</span>
                                <button
                                    onClick={() => handleRemoveCategory(category.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <IoClose className="size-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === "class" && activeClassId ? (
                    <>
                        {/* Header labels */}
                        <div className="flex gap-4 mb-2">
                            <div className="flex gap-1 flex-1">
                                <div className="flex-1">
                                    <div className="text-xl font-semibold text-black">Category</div>
                                </div>
                                <div className="flex-1">
                                    <div className="text-xl font-semibold text-black">Assignment Name</div>
                                </div>
                            </div>
                            <div className="w-48">
                                <div className="text-xl font-semibold text-black text-center">Grade (%)</div>
                            </div>
                            <div className="w-32">
                                <div className="text-xl font-semibold text-black text-center">Weight (%)</div>
                            </div>
                            <div className="w-8"></div>
                        </div>

                        {/* Component rows */}
                        {activeClass?.components.map((component) => (
                            <div key={component.id} className="gpa-calculator__row flex gap-4 mb-4">
                                <div className="flex gap-1 flex-1">
                                    <div className="flex-1">
                                        <CustomSelect
                                            options={categories}
                                            value={component.category || ''}
                                            onChange={(value) => handleClassChange(component.id, "category", value)}
                                            placeholder="Select Category"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            className="gpa-calculator__input gpa-calculator__input--name w-full"
                                            placeholder="Enter Assignment Name"
                                            value={component.name}
                                            onChange={(e) => handleClassChange(component.id, "name", e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="w-48">
                                    <input
                                        type="number"
                                        className="gpa-calculator__input gpa-calculator__input--grade w-full"
                                        placeholder="Enter Grade"
                                        value={component.grade}
                                        onChange={(e) => handleClassChange(component.id, "grade", e.target.value)}
                                    />
                                </div>
                                <div className="w-32">
                                    <div className="gpa-calculator__weight-display">
                                        {component.category ? 
                                            categories.find(cat => cat.id === component.category)?.weight + '%' 
                                            : '-'}
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleRemoveComponent(component.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <IoClose className="size-5" />
                                </button>
                            </div>
                        ))}
                        
                        {/* Always show the Add Assignment button when a class is selected */}
                        <div className="mt-8 flex items-center justify-between">
                            <button
                                onClick={handleAddComponent}
                                className="gpa-calculator__button gpa-calculator__button--add"
                            >
                                <IoMdAdd className="gpa-calculator__icon" />
                                Add Assignment
                            </button>
                            
                            {activeClass?.components.length > 0 && (
                                <div className="text-2xl font-bold text-center flex items-center gap-4">
                                    <span>Your Current Grade: {classGPA}%</span>
                                    <span className="bg-purple-200 rounded-full px-6 py-2">
                                        {classGPA >= 93 ? 'A' :
                                         classGPA >= 90 ? 'A-' :
                                         classGPA >= 87 ? 'B+' :
                                         classGPA >= 83 ? 'B' :
                                         classGPA >= 80 ? 'B-' :
                                         classGPA >= 77 ? 'C+' :
                                         classGPA >= 73 ? 'C' :
                                         classGPA >= 70 ? 'C-' :
                                         classGPA >= 67 ? 'D+' :
                                         classGPA >= 60 ? 'D' : 'F'}
                                    </span>
                                </div>
                            )}
                        </div>
                    </>
                ) : null}

                {activeTab === "semester" ? (
                    <>
                        <div className="flex gap-4 mb-2">
                            <div className="flex-1">
                                <div className="text-xl font-semibold text-black text-center">Class Name</div>
                            </div>
                            <div className="w-32">
                                <div className="text-xl font-semibold text-black text-center">Credits</div>
                            </div>
                            <div className="w-32">
                                <div className="text-xl font-semibold text-black text-center">Grade</div>
                            </div>
                        </div>

                        {semesterClasses.map((cls) => (
                            <div key={cls.id} className="gpa-calculator__row flex gap-4 mb-4">
                                <div className="flex-1">
                                    <div className="gpa-calculator__semester-field">
                                        {cls.name}
                                    </div>
                                </div>
                                <div className="w-32">
                                    <div className="gpa-calculator__semester-credits">
                                        {cls.credits}
                                    </div>
                                </div>
                                <div className="w-32">
                                    <div className="gpa-calculator__semester-grade">
                                        {cls.grade || 'N/A'}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {semesterClasses.length > 0 && (
                            <div className="mt-8">
                                <div className="text-2xl font-bold text-center flex items-center justify-center gap-4">
                                    <span>Semester GPA:</span>
                                    <span className="bg-purple-200 rounded-full px-6 py-2">
                                        {semesterGPA}
                                    </span>
                                </div>
                            </div>
                        )}
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default GPACalculator;
